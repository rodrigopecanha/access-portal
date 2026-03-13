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
  try {
    if (
      !templateJson || typeof templateJson !== 'object' ||
      !webformJson || typeof webformJson !== 'object'
    ) {
      return { success: false, error: 'Invalid JSON input' };
    }

    const template = templateJson as Record<string, unknown>;
    const webform = webformJson as Record<string, unknown>;

    // ── 1. Webform Configured ──
    // Check that webform references a template and maps name/email fields
    let webformConfigured = false;

    const hasTemplateRef = !!(
      webform['templateId'] ||
      webform['templateGuid'] ||
      webform['template'] ||
      webform['sourceTemplateId']
    );

    // Deep-search webform for name/email field mappings
    const webformStr = JSON.stringify(webform).toLowerCase();
    const hasNameField =
      webformStr.includes('name') &&
      (webformStr.includes('recipient') || webformStr.includes('signer'));
    const hasEmailField =
      webformStr.includes('email') &&
      (webformStr.includes('recipient') || webformStr.includes('signer'));

    // Also accept explicit field component arrays
    const hasFieldMappings = webformStr.includes('fieldmapping') ||
      webformStr.includes('components') ||
      webformStr.includes('fields');

    webformConfigured = hasTemplateRef && (hasNameField || hasEmailField || hasFieldMappings);

    // ── 2. Multiple Recipients ──
    let multipleRecipients = false;

    const recipients = template['recipients'];
    if (recipients && typeof recipients === 'object') {
      const signers = (recipients as Record<string, unknown>)['signers'];
      if (Array.isArray(signers) && signers.length >= 2) {
        multipleRecipients = true;
      }
    }

    // ── 3. Dynamic Subject ──
    let dynamicSubject = false;

    const emailSubject = template['emailSubject'];
    if (typeof emailSubject === 'string') {
      // Detect common placeholder patterns: {{...}}, [[...]], <<...>>, {!...!}, /s\d/
      const placeholderPatterns = [
        /\{\{.*?(signer|name|recipient).*?\}\}/i,
        /\[\[.*?(signer|name|recipient).*?\]\]/i,
        /<<.*?(signer|name|recipient).*?>>/i,
        /\{!.*?(signer|name|recipient).*?!\}/i,
        /\/(s|signer)\d/i,
        /<.*?(signer|name|recipient).*?>/i,
      ];
      dynamicSubject = placeholderPatterns.some((rx) => rx.test(emailSubject));
    }

    const validations = { webformConfigured, multipleRecipients, dynamicSubject };

    const score =
      (webformConfigured ? 75 : 0) +
      (multipleRecipients ? 50 : 0) +
      (dynamicSubject ? 50 : 0);

    return { success: true, score, validations };
  } catch {
    return { success: false, error: 'Invalid JSON input' };
  }
}
