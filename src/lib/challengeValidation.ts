export interface ValidationRequirement {
  label: string;
  passed: boolean;
}

export interface ValidationSection {
  title: string;
  requirements: ValidationRequirement[];
}

export interface ValidationResult {
  challengeId: string;
  sections: ValidationSection[];
  totalPassed: number;
  totalRequirements: number;
  isFullyValidated: boolean;
}

function deepSearchKeys(obj: unknown, targetKeys: string[]): Record<string, boolean> {
  const found: Record<string, boolean> = {};
  targetKeys.forEach(k => (found[k] = false));

  const search = (value: unknown) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach(search);
      return;
    }
    if (typeof value === 'object') {
      for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
        const lowerKey = key.toLowerCase();
        for (const target of targetKeys) {
          if (lowerKey.includes(target.toLowerCase())) {
            found[target] = true;
          }
        }
        // Check for "required": true
        if (lowerKey === 'required' && val === true) {
          found['required'] = true;
        }
        search(val);
      }
    }
    if (typeof value === 'string') {
      const lowerVal = value.toLowerCase();
      for (const target of targetKeys) {
        if (lowerVal.includes(target.toLowerCase())) {
          found[target] = true;
        }
      }
    }
  };

  search(obj);
  return found;
}

export function validatePracEsig1(jsonContent: unknown): ValidationResult {
  const allKeys = [
    'sms', 'whatsapp', 'deliveryMethod',
    'reminderEnabled', 'reminders',
    'accessCode', 'idCheck', 'identityVerification', 'authentication',
    'textTabs',
    'checkboxTabs', 'radioGroupTabs',
    'required',
  ];

  const found = deepSearchKeys(jsonContent, allKeys);

  // Delivery Configuration
  const hasMultiChannel = found['sms'] || found['whatsapp'] || found['deliveryMethod'];
  const hasReminders = found['reminderEnabled'] || found['reminders'];

  // Security — need at least 2 of 4
  const securityItems = ['accessCode', 'idCheck', 'identityVerification', 'authentication'];
  const securityCount = securityItems.filter(k => found[k]).length;
  const hasTwoSecurityLayers = securityCount >= 2;

  // Interactive Fields
  const hasTextTabs = found['textTabs'];
  const hasCheckboxOrRadio = found['checkboxTabs'] || found['radioGroupTabs'];
  const hasRequiredField = found['required'];

  const sections: ValidationSection[] = [
    {
      title: 'Delivery Configuration',
      requirements: [
        { label: 'Multi-channel delivery (SMS, WhatsApp, or deliveryMethod)', passed: hasMultiChannel },
        { label: 'Reminders enabled', passed: hasReminders },
      ],
    },
    {
      title: 'Security',
      requirements: [
        { label: `At least 2 authentication layers (${securityCount}/2 detected)`, passed: hasTwoSecurityLayers },
      ],
    },
    {
      title: 'Interactive Fields',
      requirements: [
        { label: 'Text tabs present', passed: hasTextTabs },
        { label: 'Checkbox or radio group tabs present', passed: hasCheckboxOrRadio },
        { label: 'Required fields configured', passed: hasRequiredField },
      ],
    },
  ];

  const totalRequirements = sections.reduce((sum, s) => sum + s.requirements.length, 0);
  const totalPassed = sections.reduce((sum, s) => sum + s.requirements.filter(r => r.passed).length, 0);

  return {
    challengeId: 'prac-esig-1',
    sections,
    totalPassed,
    totalRequirements,
    isFullyValidated: totalPassed === totalRequirements,
  };
}

// ── Template Field Validation Challenge ──────────────────────────

export interface TemplateValidationResult {
  success: boolean;
  score?: number;
  validations?: {
    cpfRegex: boolean;
    cnpjRegex: boolean;
    birthDateRegex: boolean;
    brandApplied: boolean;
  };
  error?: string;
}

const EXPECTED_PATTERNS: Record<string, keyof TemplateValidationResult['validations'] & string> = {};

const PATTERN_MAP: { key: 'cpfRegex' | 'cnpjRegex' | 'birthDateRegex'; pattern: string }[] = [
  { key: 'cpfRegex', pattern: String.raw`^\d{3}\.\d{3}\.\d{3}\-\d{2}$` },
  { key: 'cnpjRegex', pattern: String.raw`^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$` },
  { key: 'birthDateRegex', pattern: String.raw`^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$` },
];

function normalizePattern(p: string): string {
  return p.replace(/\s+/g, '');
}

export function validateTemplateChallenges(templateJson: unknown): TemplateValidationResult {
  try {
    if (templateJson === null || templateJson === undefined || typeof templateJson !== 'object') {
      return { success: false, error: 'Invalid JSON or unexpected structure' };
    }

    const root = templateJson as Record<string, unknown>;

    // ── Brand detection ──
    const brandApplied =
      !!root['brandId'] ||
      String(root['brandLock']).toLowerCase() === 'true';

    // ── Collect all validationPattern values from all signers / textTabs ──
    const patterns: string[] = [];

    const collectPatterns = (obj: unknown) => {
      if (Array.isArray(obj)) {
        obj.forEach(collectPatterns);
        return;
      }
      if (obj && typeof obj === 'object') {
        const rec = obj as Record<string, unknown>;
        if (typeof rec['validationPattern'] === 'string') {
          patterns.push(rec['validationPattern']);
        }
        Object.values(rec).forEach(collectPatterns);
      }
    };

    const recipients = root['recipients'];
    if (recipients && typeof recipients === 'object') {
      const signers = (recipients as Record<string, unknown>)['signers'];
      if (Array.isArray(signers)) {
        for (const signer of signers) {
          const tabs = (signer as Record<string, unknown>)?.['tabs'];
          if (tabs && typeof tabs === 'object') {
            const textTabs = (tabs as Record<string, unknown>)['textTabs'];
            if (Array.isArray(textTabs)) {
              collectPatterns(textTabs);
            }
          }
        }
      }
    }

    // ── Match patterns ──
    const validations = {
      cpfRegex: false,
      cnpjRegex: false,
      birthDateRegex: false,
      brandApplied: false,
    };

    validations.brandApplied = brandApplied;

    for (const p of patterns) {
      const norm = normalizePattern(p);
      for (const { key, pattern } of PATTERN_MAP) {
        if (norm === normalizePattern(pattern)) {
          validations[key] = true;
        }
      }
    }

    const score =
      (validations.cpfRegex ? 50 : 0) +
      (validations.cnpjRegex ? 50 : 0) +
      (validations.birthDateRegex ? 50 : 0) +
      (validations.brandApplied ? 50 : 0);

    return { success: true, score, validations };
  } catch {
    return { success: false, error: 'Invalid JSON or unexpected structure' };
  }
}

// ── Webform + Template Challenge ──────────────────────────────────

export interface WebformValidationResult {
  success: boolean;
  score?: number;
  validations?: {
    webformConfigured: boolean;
    multipleRecipients: boolean;
    dynamicSubject: boolean;
  };
  error?: string;
}

export function validateWebformTemplateChallenge(
  templateJson: unknown,
  webformJson: unknown,
): WebformValidationResult {
  // All validations initialize as false
  const validations = {
    webformConfigured: false,
    multipleRecipients: false,
    dynamicSubject: false,
  };

  try {
    if (
      !templateJson || typeof templateJson !== 'object' ||
      !webformJson || typeof webformJson !== 'object'
    ) {
      return { success: false, error: 'Invalid JSON input' };
    }

    const template = templateJson as Record<string, unknown>;
    const webform = webformJson as Record<string, unknown>;

    // ── 1. Webform Configured (strict) ──
    // Must have templateId or templateRole
    const hasTemplateRef = !!(webform['templateId'] || webform['templateRole']);

    // Must reference both name and email for a recipient
    const webformStr = JSON.stringify(webform).toLowerCase();
    const hasNameRef = webformStr.includes('name');
    const hasEmailRef = webformStr.includes('email');

    if (hasTemplateRef && hasNameRef && hasEmailRef) {
      validations.webformConfigured = true;
    }

    // ── 2. Multiple Recipients (strict) ──
    const recipients = template['recipients'];
    if (recipients && typeof recipients === 'object') {
      const signers = (recipients as Record<string, unknown>)['signers'];
      if (Array.isArray(signers) && signers.length >= 2) {
        validations.multipleRecipients = true;
      }
    }

    // ── 3. Dynamic Subject (strict) ──
    const emailSubject = template['emailSubject'];
    if (typeof emailSubject === 'string') {
      const lower = emailSubject.toLowerCase();
      const hasSigner = lower.includes('signer') || lower.includes('recipient');
      const hasName = lower.includes('name');
      if (hasSigner && hasName) {
        validations.dynamicSubject = true;
      }
    }

    const score =
      (validations.webformConfigured ? 75 : 0) +
      (validations.multipleRecipients ? 50 : 0) +
      (validations.dynamicSubject ? 50 : 0);

    return { success: true, score, validations };
  } catch {
    return { success: false, error: 'Invalid JSON input' };
  }
}

// ── Final Challenge: HR Template ─────────────────────────────────

export interface FinalChallengeValidationResult {
  success: boolean;
  score: number;
  validations: {
    attachmentField: boolean;
    initialField: boolean;
    radioButtonField: boolean;
    conditionalField: boolean;
    approveField: boolean;
    positionDropdown: boolean;
  };
  error?: string;
}

const POSITION_KEYWORDS = ['jr', 'junior', 'mid', 'pleno', 'sr', 'senior', 'coordinator', 'coordenador', 'manager', 'gerente', 'analyst', 'analista'];

export function validateFinalChallenge(templateJson: unknown): FinalChallengeValidationResult {
  const validations = {
    attachmentField: false,
    initialField: false,
    radioButtonField: false,
    conditionalField: false,
    approveField: false,
    positionDropdown: false,
  };

  try {
    if (!templateJson || typeof templateJson !== 'object') {
      return { success: false, score: 0, validations };
    }

    const root = templateJson as Record<string, unknown>;

    // Collect all tabs from all signers
    const allTabs: Record<string, unknown>[] = [];
    const recipients = root['recipients'];
    if (recipients && typeof recipients === 'object') {
      const signers = (recipients as Record<string, unknown>)['signers'];
      if (Array.isArray(signers)) {
        for (const signer of signers) {
          const tabs = (signer as Record<string, unknown>)?.['tabs'];
          if (tabs && typeof tabs === 'object') {
            allTabs.push(tabs as Record<string, unknown>);
          }
        }
      }
    }

    // 1. Attachment Field — tabs.attachmentTabs
    for (const tabs of allTabs) {
      const attachmentTabs = tabs['attachmentTabs'];
      if (Array.isArray(attachmentTabs) && attachmentTabs.length > 0) {
        validations.attachmentField = true;
        break;
      }
    }

    // 2. Initial Field — tabs.initialHereTabs
    for (const tabs of allTabs) {
      const initialHereTabs = tabs['initialHereTabs'];
      if (Array.isArray(initialHereTabs) && initialHereTabs.length > 0) {
        validations.initialField = true;
        break;
      }
    }

    // 3. Radio Button Field — tabs.radioGroupTabs
    for (const tabs of allTabs) {
      const radioGroupTabs = tabs['radioGroupTabs'];
      if (Array.isArray(radioGroupTabs) && radioGroupTabs.length > 0) {
        validations.radioButtonField = true;
        break;
      }
    }

    // 4. Conditional Field Logic — conditionalParentLabel / conditionalParentValue / conditionalRules
    const jsonStr = JSON.stringify(templateJson).toLowerCase();
    const hasConditionalParentLabel = jsonStr.includes('conditionalparentlabel');
    const hasConditionalParentValue = jsonStr.includes('conditionalparentvalue');
    const hasConditionalRules = jsonStr.includes('conditionalrules');
    if (hasConditionalParentLabel || hasConditionalParentValue || hasConditionalRules) {
      validations.conditionalField = true;
    }

    // 5. Approve Field — tabs.approveTabs
    for (const tabs of allTabs) {
      const approveTabs = tabs['approveTabs'];
      if (Array.isArray(approveTabs) && approveTabs.length > 0) {
        validations.approveField = true;
        break;
      }
    }

    // 6. Position Dropdown — tabs.listTabs with position-related options
    for (const tabs of allTabs) {
      const listTabs = tabs['listTabs'];
      if (Array.isArray(listTabs)) {
        for (const listTab of listTabs) {
          const items = (listTab as Record<string, unknown>)['listItems'];
          if (Array.isArray(items)) {
            const values = items
              .map((item) => {
                const rec = item as Record<string, unknown>;
                return String(rec['text'] || rec['value'] || '').toLowerCase();
              });
            const matchCount = values.filter(v =>
              POSITION_KEYWORDS.some(kw => v.includes(kw))
            ).length;
            if (matchCount >= 2) {
              validations.positionDropdown = true;
              break;
            }
          }
        }
        if (validations.positionDropdown) break;
      }
    }

    const score =
      (validations.attachmentField ? 50 : 0) +
      (validations.initialField ? 50 : 0) +
      (validations.radioButtonField ? 50 : 0) +
      (validations.conditionalField ? 100 : 0) +
      (validations.approveField ? 100 : 0) +
      (validations.positionDropdown ? 50 : 0);

    return { success: true, score, validations };
  } catch {
    return { success: false, score: 0, validations };
  }
}

// ── Bulk Send Challenge ──────────────────────────────────────────

export interface BulkSendValidationResult {
  success: boolean;
  score: number;
  validations: {
    bulkConfigured: boolean;
    validCSV: boolean;
    dynamicSubject: boolean;
    docGenMaster: boolean;
  };
  error?: string;
}

export function validateBulkSendChallenge(
  templateJson: unknown,
  csvContent: string,
): BulkSendValidationResult {
  const validations = {
    bulkConfigured: false,
    validCSV: false,
    dynamicSubject: false,
    docGenMaster: false,
  };

  try {
    if (!templateJson || typeof templateJson !== 'object') {
      return { success: false, score: 0, validations };
    }

    const root = templateJson as Record<string, unknown>;

    // ── 1. Bulk Configured: at least 3 textTabs besides name/email ──
    const recipients = root['recipients'];
    if (recipients && typeof recipients === 'object') {
      const signers = (recipients as Record<string, unknown>)['signers'];
      if (Array.isArray(signers)) {
        let variableCount = 0;
        for (const signer of signers) {
          const tabs = (signer as Record<string, unknown>)?.['tabs'];
          if (tabs && typeof tabs === 'object') {
            const textTabs = (tabs as Record<string, unknown>)['textTabs'];
            if (Array.isArray(textTabs)) {
              for (const tab of textTabs) {
                const rec = tab as Record<string, unknown>;
                const label = String(rec['tabLabel'] || rec['name'] || '').toLowerCase().trim();
                if (label !== 'name' && label !== 'email') {
                  variableCount++;
                }
              }
            }
          }
        }
        if (variableCount >= 3) {
          validations.bulkConfigured = true;
        }
      }
    }

    // ── 2. Valid CSV: header + at least 3 data rows ──
    if (typeof csvContent === 'string' && csvContent.trim().length > 0) {
      const rows = csvContent.trim().split('\n').filter(r => r.trim().length > 0);
      if (rows.length >= 4) {
        const header = rows[0].toLowerCase();
        const hasName = header.includes('name');
        const hasEmail = header.includes('email');
        if (hasName && hasEmail) {
          validations.validCSV = true;
        }
      }
    }

    // ── 3. Dynamic Subject ──
    const emailSubject = root['emailSubject'];
    if (typeof emailSubject === 'string') {
      const lower = emailSubject.toLowerCase();
      if (
        lower.includes('{{name}}') ||
        lower.includes('{{signer1_name}}') ||
        lower.includes('[[signer name]]')
      ) {
        validations.dynamicSubject = true;
      }
    }

    // ── 4. DocGen Master (bonus badge) ──
    const jsonStr = JSON.stringify(templateJson).toLowerCase();
    if (
      jsonStr.includes('docgen') ||
      jsonStr.includes('docgenformfields') ||
      jsonStr.includes('mergefields') ||
      jsonStr.includes('documentgeneration')
    ) {
      validations.docGenMaster = true;
    }

    const score =
      (validations.bulkConfigured ? 100 : 0) +
      (validations.validCSV ? 100 : 0);

    return { success: true, score, validations };
// ── Advanced Workflows Challenge ─────────────────────────────────

export interface AdvancedWorkflowValidationResult {
  success: boolean;
  score: number;
  validations: {
    workflowArchitect: boolean;
    commercialIntermediary: boolean;
    dynamicDirector: boolean;
  };
  error?: string;
}

export function validateAdvancedWorkflowChallenge(
  templateJson: unknown,
): AdvancedWorkflowValidationResult {
  const validations = {
    workflowArchitect: false,
    commercialIntermediary: false,
    dynamicDirector: false,
  };

  try {
    if (!templateJson || typeof templateJson !== 'object') {
      return { success: false, score: 0, validations };
    }

    const root = templateJson as Record<string, unknown>;
    const recipients = root['recipients'];

    if (!recipients || typeof recipients !== 'object') {
      return { success: false, score: 0, validations };
    }

    // ── 1. Workflow Architect: Signing Group configured ──
    const signers = (recipients as Record<string, unknown>)['signers'];
    if (Array.isArray(signers)) {
      for (const signer of signers) {
        const s = signer as Record<string, unknown>;
        if (s['signingGroupId'] || s['signingGroupName']) {
          validations.workflowArchitect = true;
          break;
        }
      }
    }

    // ── 2. Commercial Intermediary: Agent recipient ──
    // Check in recipients.agents array
    const agents = (recipients as Record<string, unknown>)['agents'];
    if (Array.isArray(agents)) {
      for (const agent of agents) {
        const a = agent as Record<string, unknown>;
        if (a['recipientType'] === 'agent') {
          validations.commercialIntermediary = true;
          break;
        }
      }
    }

    // Also check in signers
    if (Array.isArray(signers) && !validations.commercialIntermediary) {
      for (const signer of signers) {
        const s = signer as Record<string, unknown>;
        if (s['recipientType'] === 'agent') {
          validations.commercialIntermediary = true;
          break;
        }
      }
    }

    // ── 3. Dynamic Director: Signer with empty name/email ──
    if (Array.isArray(signers)) {
      for (const signer of signers) {
        const s = signer as Record<string, unknown>;
        const name = s['name'];
        const email = s['email'];
        const hasEmptyName = !name || (typeof name === 'string' && name.trim() === '');
        const hasEmptyEmail = !email || (typeof email === 'string' && email.trim() === '');
        if (hasEmptyName && hasEmptyEmail) {
          validations.dynamicDirector = true;
          break;
        }
      }
    }

    const score =
      (validations.workflowArchitect ? 125 : 0) +
      (validations.dynamicDirector ? 100 : 0);

    return { success: true, score, validations };
  } catch {
    return { success: false, score: 0, validations };
  }
}
