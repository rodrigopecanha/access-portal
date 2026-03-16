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
  const validations = {
    reminderEnabled: false,
    whatsappDelivery: false,
    identityVerification: false,
    formFieldsConfigured: false,
    accessCode: false,
    liveness: false,
  };

  if (!jsonContent || typeof jsonContent !== 'object') {
    return buildFailedResult('prac-esig-1', validations);
  }

  const tmpl = jsonContent as Record<string, unknown>;

  // Validation 1 — Reminder Enabled (notification → reminders → reminderEnabled)
  const notification = tmpl['notification'] as Record<string, unknown> | undefined;
  if (notification && typeof notification === 'object') {
    const reminders = notification['reminders'] as Record<string, unknown> | undefined;
    if (reminders && typeof reminders === 'object') {
      if (reminders['reminderEnabled'] === 'true' || reminders['reminderEnabled'] === true) {
        validations.reminderEnabled = true;
      }
    }
  }

  // Validation 2 — WhatsApp Secondary Delivery
  const recipients = tmpl['recipients'] as Record<string, unknown> | undefined;
  if (recipients && typeof recipients === 'object') {
    const signers = recipients['signers'] as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(signers)) {
      for (const signer of signers) {
        if (signer['secondaryDeliveryMethod'] === 'WhatsApp') {
          validations.whatsappDelivery = true;
          break;
        }
        const addNotif = signer['additionalNotifications'] as Array<Record<string, unknown>> | undefined;
        if (Array.isArray(addNotif)) {
          for (const n of addNotif) {
            if (n['secondaryDeliveryMethod'] === 'WhatsApp') {
              validations.whatsappDelivery = true;
              break;
            }
          }
        }
      }
    }
  }

  // Validation 3 — Identity Verification
  if (recipients && typeof recipients === 'object') {
    const signers = recipients['signers'] as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(signers)) {
      for (const signer of signers) {
        if (signer['identityVerification'] || signer['idCheckConfigurationName']) {
          validations.identityVerification = true;
          break;
        }
      }
    }
  }

  // Validation 4 — Form Fields Configured (checkboxTabs/radioGroupTabs AND textTabs)
  if (recipients && typeof recipients === 'object') {
    const signers = recipients['signers'] as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(signers)) {
      let hasCheckboxOrRadio = false;
      let hasText = false;
      for (const signer of signers) {
        const tabs = signer['tabs'] as Record<string, unknown> | undefined;
        if (tabs && typeof tabs === 'object') {
          if (Array.isArray(tabs['checkboxTabs']) && tabs['checkboxTabs'].length > 0) {
            hasCheckboxOrRadio = true;
          }
          if (Array.isArray(tabs['radioGroupTabs']) && tabs['radioGroupTabs'].length > 0) {
            hasCheckboxOrRadio = true;
          }
          if (Array.isArray(tabs['textTabs']) && tabs['textTabs'].length > 0) {
            hasText = true;
          }
        }
      }
      if (hasCheckboxOrRadio && hasText) {
        validations.formFieldsConfigured = true;
      }
    }
  }

  // Validation 5 — Access Code
  if (recipients && typeof recipients === 'object') {
    const signers = recipients['signers'] as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(signers)) {
      for (const signer of signers) {
        const ac = signer['accessCode'];
        if (ac !== undefined && ac !== null && ac !== '') {
          validations.accessCode = true;
          break;
        }
      }
    }
  }

  // Validation 6 — Liveness
  if (recipients && typeof recipients === 'object') {
    const signers = recipients['signers'] as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(signers)) {
      for (const signer of signers) {
        const iv = signer['identityVerification'];
        if (iv !== undefined && iv !== null) {
          if (JSON.stringify(iv).toLowerCase().includes('liveness')) {
            validations.liveness = true;
            break;
          }
        }
      }
    }
  }

  const hasCheckboxOrRadioForDisplay = (() => {
    const r = tmpl['recipients'] as Record<string, unknown> | undefined;
    if (!r) return false;
    const s = r['signers'] as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(s)) return false;
    return s.some(signer => {
      const tabs = signer['tabs'] as Record<string, unknown> | undefined;
      if (!tabs) return false;
      return (Array.isArray(tabs['checkboxTabs']) && tabs['checkboxTabs'].length > 0) ||
             (Array.isArray(tabs['radioGroupTabs']) && tabs['radioGroupTabs'].length > 0);
    });
  })();

  const hasTextForDisplay = (() => {
    const r = tmpl['recipients'] as Record<string, unknown> | undefined;
    if (!r) return false;
    const s = r['signers'] as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(s)) return false;
    return s.some(signer => {
      const tabs = signer['tabs'] as Record<string, unknown> | undefined;
      if (!tabs) return false;
      return Array.isArray(tabs['textTabs']) && tabs['textTabs'].length > 0;
    });
  })();

  const sections: ValidationSection[] = [
    {
      title: 'Reminder Configuration',
      requirements: [
        { label: 'Reminders enabled (reminderEnabled)', passed: validations.reminderEnabled },
      ],
    },
    {
      title: 'Multi-channel Delivery',
      requirements: [
        { label: 'WhatsApp as secondary delivery method', passed: validations.whatsappDelivery },
      ],
    },
    {
      title: 'Identity Verification',
      requirements: [
        { label: 'Identity verification configured for signer', passed: validations.identityVerification },
      ],
    },
    {
      title: 'Form Fields',
      requirements: [
        { label: 'Checkbox or radio group fields configured', passed: hasCheckboxOrRadioForDisplay },
        { label: 'Text fields configured', passed: hasTextForDisplay },
      ],
    },
    {
      title: 'Authentication Medals',
      requirements: [
        { label: 'Access Code configured', passed: validations.accessCode },
        { label: 'Liveness verification configured', passed: validations.liveness },
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

function buildFailedResult(challengeId: string, validations: Record<string, boolean>): ValidationResult {
  const sections: ValidationSection[] = Object.entries(validations).map(([key, _]) => ({
    title: key,
    requirements: [{ label: key, passed: false }],
  }));
  const totalRequirements = sections.length;
  return { challengeId, sections, totalPassed: 0, totalRequirements, isFullyValidated: false };
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
  } catch {
    return { success: false, score: 0, validations };
  }
}

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

// ── Document Actions Challenge ───────────────────────────────────

export interface DocumentActionsValidationResult {
  success: boolean;
  score: number;
  validations: {
    multipleRecipients: boolean;
    documentVisibility: boolean;
    attachmentMaster: boolean;
  };
  error?: string;
}

export function validateDocumentActionsChallenge(
  templateJson: unknown,
): DocumentActionsValidationResult {
  const validations = {
    multipleRecipients: false,
    documentVisibility: false,
    attachmentMaster: false,
  };

  try {
    if (!templateJson || typeof templateJson !== 'object') {
      return { success: false, score: 0, validations };
    }

    const root = templateJson as Record<string, unknown>;

    // ── 1. Multiple Recipients: at least 2 signers ──
    const recipients = root['recipients'];
    if (recipients && typeof recipients === 'object') {
      const signers = (recipients as Record<string, unknown>)['signers'];
      if (Array.isArray(signers) && signers.length >= 2) {
        validations.multipleRecipients = true;
      }
    }

    // ── 2. Document Visibility: documentVisibility enabled and restricted ──
    const envelope = root['envelope'] as Record<string, unknown> | undefined;
    const documentVisibilityEnabled = !!(
      root['documentVisibilityEnabled'] ||
      envelope?.['documentVisibilityEnabled']
    );

    // Check for document-level visibility restrictions
    const documents = root['documents'] as unknown[] | undefined;
    let hasDocumentRecipientRestriction = false;

    if (Array.isArray(documents)) {
      for (const doc of documents) {
        const d = doc as Record<string, unknown>;
        if (
          d['visibleToSigners'] ||
          d['visibleSigners'] ||
          d['restrictedRecipients'] ||
          d['documentVisibility']
        ) {
          hasDocumentRecipientRestriction = true;
          break;
        }
      }
    }

    // Also check for documentVisibility in the JSON structure
    const jsonStr = JSON.stringify(templateJson).toLowerCase();
    const hasDocumentVisibilityConfig =
      jsonStr.includes('documentvisibility') ||
      jsonStr.includes('visibletosigner');

    if (documentVisibilityEnabled || (hasDocumentRecipientRestriction && hasDocumentVisibilityConfig)) {
      validations.documentVisibility = true;
    }

    // ── 3. Supplemental Document (Attachment Master) ──
    let hasSupplementalDoc = false;

    if (Array.isArray(documents)) {
      for (const doc of documents) {
        const d = doc as Record<string, unknown>;
        const docStr = JSON.stringify(d).toLowerCase();
        if (
          docStr.includes('supplemental') ||
          d['supplementalDocumentId'] ||
          d['supplementalOptions'] ||
          d['display'] === 'supplement' ||
          d['display'] === 'supplemental'
        ) {
          hasSupplementalDoc = true;
          break;
        }
      }
    }

    if (hasSupplementalDoc) {
      validations.attachmentMaster = true;
    }

    const score =
      (validations.documentVisibility ? 100 : 0) +
      (validations.attachmentMaster ? 100 : 0);

    return { success: true, score, validations };
  } catch {
    return { success: false, score: 0, validations };
  }
}

// ── Formula & Flags Final Challenge ──────────────────────────────

export interface FormulaFlagsValidationResult {
  success: boolean;
  score: number;
  validations: {
    formulaMaster: boolean;
    conditionalLogic: boolean;
    requiredFieldLogic: boolean;
  };
  error?: string;
}

export function validateFormulaFlagsChallenge(
  templateJson: unknown,
): FormulaFlagsValidationResult {
  const validations = {
    formulaMaster: false,
    conditionalLogic: false,
    requiredFieldLogic: false,
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

    const signers = (recipients as Record<string, unknown>)['signers'];
    if (!Array.isArray(signers)) {
      return { success: false, score: 0, validations };
    }

    // Collect all formula tab labels and all text tabs
    const formulaLabels: string[] = [];
    interface TextTabInfo {
      conditionalParentLabel?: string;
      conditionalParentValue?: string;
      required?: string | boolean;
    }
    const textTabsInfo: TextTabInfo[] = [];

    for (const signer of signers) {
      const tabs = (signer as Record<string, unknown>)?.['tabs'];
      if (!tabs || typeof tabs !== 'object') continue;
      const tabsRec = tabs as Record<string, unknown>;

      // 1. Formula Master — formulaTabs exists with at least one entry
      const formulaTabs = tabsRec['formulaTabs'];
      if (Array.isArray(formulaTabs)) {
        for (const ft of formulaTabs) {
          const rec = ft as Record<string, unknown>;
          const label = String(rec['tabLabel'] || rec['name'] || '').trim();
          if (label) formulaLabels.push(label.toLowerCase());
        }
      }

      // Collect text tabs for conditional checks
      const textTabs = tabsRec['textTabs'];
      if (Array.isArray(textTabs)) {
        for (const tt of textTabs) {
          const rec = tt as Record<string, unknown>;
          textTabsInfo.push({
            conditionalParentLabel: rec['conditionalParentLabel'] as string | undefined,
            conditionalParentValue: rec['conditionalParentValue'] as string | undefined,
            required: rec['required'] as string | boolean | undefined,
          });
        }
      }
    }

    // Validation 1 — Formula Master
    if (formulaLabels.length > 0) {
      validations.formulaMaster = true;
    }

    // Validation 2 & 3 — Conditional Logic & Required Field Logic
    for (const tab of textTabsInfo) {
      if (!tab.conditionalParentLabel) continue;
      const parentLabel = tab.conditionalParentLabel.toLowerCase().trim();

      // Check if the conditional parent references a formula tab
      const referencesFormula = formulaLabels.some(fl => fl === parentLabel);
      if (referencesFormula) {
        validations.conditionalLogic = true;

        // Validation 3 — required AND conditional referencing formula
        const isRequired = tab.required === 'true' || tab.required === true;
        if (isRequired) {
          validations.requiredFieldLogic = true;
        }
      }
    }

    const score =
      (validations.formulaMaster ? 150 : 0) +
      (validations.conditionalLogic ? 150 : 0) +
      (validations.requiredFieldLogic ? 100 : 0);

    return { success: true, score, validations };
  } catch {
    return { success: false, score: 0, validations };
  }
}
