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
