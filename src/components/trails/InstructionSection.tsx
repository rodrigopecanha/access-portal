import { cn } from '@/lib/utils';
import { Target, ClipboardList, Lightbulb, FolderOpen, CheckCircle2, AlertCircle, Building2, Handshake } from 'lucide-react';

interface InstructionSectionProps {
  instructions: string;
  className?: string;
}

interface ParsedSection {
  type: 'objective' | 'requirements' | 'tips' | 'delivery' | 'scenario' | 'general';
  title: string;
  icon: string;
  content: ParsedContent[];
}

interface PartyInfo {
  client?: string;
  counterparty?: string;
}

interface ParsedContent {
  type: 'text' | 'list' | 'subsection' | 'parties';
  title?: string;
  items?: string[];
  text?: string;
  parties?: PartyInfo;
}

function parseInstructions(raw: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  
  // Split by ## headers
  const headerPattern = /^##\s+(.+)$/gm;
  const parts = raw.split(headerPattern);
  
  // First part is before any ## header
  if (parts[0]?.trim()) {
    sections.push({
      type: 'general',
      title: 'Contexto',
      icon: '📝',
      content: parseContent(parts[0].trim())
    });
  }
  
  // Process pairs of (header, content)
  for (let i = 1; i < parts.length; i += 2) {
    const headerText = parts[i]?.trim() || '';
    const content = parts[i + 1]?.trim() || '';
    
    // Remove emoji from header to determine type
    const cleanHeader = headerText.replace(/[🎯📋💡📁📝✅⚠️🏢]/g, '').trim();
    const sectionType = getSectionType(cleanHeader);
    
    sections.push({
      type: sectionType,
      title: cleanHeader,
      icon: getIconFromHeader(headerText),
      content: parseContent(content)
    });
  }
  
  return sections;
}

function getSectionType(header: string): ParsedSection['type'] {
  const lower = header.toLowerCase();
  if (lower.includes('objetivo')) return 'objective';
  if (lower.includes('cenário') || lower.includes('scenario')) return 'scenario';
  if (lower.includes('requisito') || lower.includes('requirements')) return 'requirements';
  if (lower.includes('dica') || lower.includes('tip')) return 'tips';
  if (lower.includes('entrega') || lower.includes('delivery')) return 'delivery';
  return 'general';
}

function getIconFromHeader(header: string): string {
  if (header.includes('🎯')) return '🎯';
  if (header.includes('📋')) return '📋';
  if (header.includes('💡')) return '💡';
  if (header.includes('📁')) return '📁';
  if (header.includes('✅')) return '✅';
  return '📝';
}

function parseContent(content: string): ParsedContent[] {
  const result: ParsedContent[] = [];
  const lines = content.split('\n');
  
  let currentSubsection: { title: string; items: string[] } | null = null;
  let currentList: string[] = [];
  let currentText = '';
  
  // Check for Cliente/Contraparte pattern at the beginning
  const clientMatch = content.match(/\*\*Cliente:\*\*\s*([^\n*]+)/);
  const counterpartyMatch = content.match(/\*\*Contraparte:\*\*\s*([^\n*]+)/);
  
  if (clientMatch || counterpartyMatch) {
    result.push({
      type: 'parties',
      parties: {
        client: clientMatch?.[1]?.trim(),
        counterparty: counterpartyMatch?.[1]?.trim()
      }
    });
  }
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip Cliente/Contraparte lines as they're already handled
    if (trimmed.startsWith('**Cliente:**') || trimmed.startsWith('**Contraparte:**')) {
      continue;
    }
    
    // Check for ### subsection
    if (trimmed.startsWith('###')) {
      // Save previous content
      if (currentText) {
        result.push({ type: 'text', text: currentText.trim() });
        currentText = '';
      }
      if (currentList.length > 0) {
        result.push({ type: 'list', items: currentList });
        currentList = [];
      }
      if (currentSubsection) {
        result.push({ type: 'subsection', title: currentSubsection.title, items: currentSubsection.items });
      }
      
      currentSubsection = { title: trimmed.replace(/^###\s*\d*\.?\s*/, '').trim(), items: [] };
    }
    // Check for list item
    else if (trimmed.startsWith('-') || trimmed.match(/^\d+\./)) {
      if (currentText) {
        result.push({ type: 'text', text: currentText.trim() });
        currentText = '';
      }
      
      const itemText = trimmed.replace(/^[-\d.]+\s*/, '').trim();
      
      if (currentSubsection) {
        currentSubsection.items.push(itemText);
      } else {
        currentList.push(itemText);
      }
    }
    // Regular text
    else if (trimmed) {
      if (currentList.length > 0 && !currentSubsection) {
        result.push({ type: 'list', items: currentList });
        currentList = [];
      }
      currentText += (currentText ? ' ' : '') + trimmed;
    }
  }
  
  // Save remaining content
  if (currentText) {
    result.push({ type: 'text', text: currentText.trim() });
  }
  if (currentList.length > 0) {
    result.push({ type: 'list', items: currentList });
  }
  if (currentSubsection && currentSubsection.items.length > 0) {
    result.push({ type: 'subsection', title: currentSubsection.title, items: currentSubsection.items });
  }
  
  return result;
}

const sectionIcons = {
  objective: Target,
  scenario: Target,
  requirements: ClipboardList,
  tips: Lightbulb,
  delivery: FolderOpen,
  general: AlertCircle,
};

const sectionColors = {
  objective: 'border-l-primary bg-primary/5',
  scenario: 'border-l-primary bg-primary/5',
  requirements: 'border-l-warning bg-warning/5',
  tips: 'border-l-xp-gold bg-xp-gold/5',
  delivery: 'border-l-success bg-success/5',
  general: 'border-l-muted-foreground bg-muted/30',
};

const sectionHeaderColors = {
  objective: 'text-primary',
  scenario: 'text-primary',
  requirements: 'text-warning',
  tips: 'text-xp-gold',
  delivery: 'text-success',
  general: 'text-muted-foreground',
};

export function InstructionSection({ instructions, className }: InstructionSectionProps) {
  const sections = parseInstructions(instructions);
  
  return (
    <div className={cn('space-y-4', className)}>
      {sections.map((section, sectionIdx) => {
        const IconComponent = sectionIcons[section.type];
        
        return (
          <div 
            key={sectionIdx}
            className={cn(
              'rounded-lg border-l-4 p-4',
              sectionColors[section.type]
            )}
          >
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-3">
              <IconComponent className={cn('w-5 h-5', sectionHeaderColors[section.type])} />
              <h4 className={cn('font-semibold text-base', sectionHeaderColors[section.type])}>
                {section.title}
              </h4>
            </div>
            
            {/* Section Content */}
            <div className="space-y-3 text-foreground">
              {section.content.map((content, contentIdx) => {
                if (content.type === 'parties' && content.parties) {
                  return (
                    <div key={contentIdx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                      {/* Client Card */}
                      {content.parties.client && (
                        <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Building2 className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">
                              Cliente
                            </span>
                          </div>
                          <p className="text-lg font-semibold text-foreground">
                            {content.parties.client}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Origina o contrato
                          </p>
                        </div>
                      )}
                      
                      {/* Counterparty Card */}
                      {content.parties.counterparty && (
                        <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                              <Handshake className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Contraparte
                            </span>
                          </div>
                          <p className="text-lg font-semibold text-foreground">
                            {content.parties.counterparty}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Parte externa
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
                
                if (content.type === 'text') {
                  return (
                    <p key={contentIdx} className="text-sm leading-relaxed">
                      {content.text}
                    </p>
                  );
                }
                
                if (content.type === 'list') {
                  const useCheckIcon = section.type === 'requirements' || section.type === 'delivery';
                  return (
                    <ul key={contentIdx} className="space-y-2">
                      {content.items?.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-sm">
                          {useCheckIcon ? (
                            <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                          )}
                          <span className="leading-relaxed">{formatListItem(item)}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                
                if (content.type === 'subsection') {
                  return (
                    <div key={contentIdx} className="ml-1 mt-3">
                      <h5 className="font-medium text-sm text-foreground mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {content.title}
                      </h5>
                      <ul className="space-y-1.5 ml-4">
                        {content.items?.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-muted-foreground/60">•</span>
                            <span className="leading-relaxed">{formatListItem(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                
                return null;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Format list items - make bold text stand out
function formatListItem(text: string): React.ReactNode {
  // Match **text** pattern for bold
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  
  if (parts.length === 1) {
    return text;
  }
  
  return parts.map((part, idx) => {
    // Odd indices are the bold parts (inside **)
    if (idx % 2 === 1) {
      return <strong key={idx} className="font-semibold text-foreground">{part}</strong>;
    }
    return part;
  });
}
