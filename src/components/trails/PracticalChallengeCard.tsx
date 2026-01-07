import { cn } from '@/lib/utils';
import { PracticalChallenge } from '@/types/learning';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, CheckCircle2, Lock, Upload, Trophy, Swords, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface PracticalChallengeCardProps {
  challenge: PracticalChallenge;
  index: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  onSubmit?: (file: File) => void;
  className?: string;
}

export function PracticalChallengeCard({
  challenge,
  index,
  isCompleted = false,
  isLocked = false,
  onSubmit,
  className
}: PracticalChallengeCardProps) {
  const [isExpanded, setIsExpanded] = useState(!isLocked && !isCompleted);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(isCompleted);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (challenge.acceptedFormats.includes(ext || '')) {
        setSelectedFile(file);
      } else {
        alert(`Formato inválido. Formatos aceitos: ${challenge.acceptedFormats.join(', ').toUpperCase()}`);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedFile && onSubmit) {
      setIsSubmitting(true);
      // Simulate submission
      setTimeout(() => {
        onSubmit(selectedFile);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  const isFinal = challenge.isFinalChallenge;

  return (
    <Card 
      className={cn(
        'overflow-hidden transition-all duration-300',
        isLocked && 'opacity-60',
        isSubmitted && 'border-success/40 bg-success/5',
        isFinal && !isLocked && !isSubmitted && 'border-2 border-destructive/40 bg-gradient-to-br from-destructive/5 to-destructive/10',
        !isFinal && !isLocked && !isSubmitted && 'hover:shadow-md hover:border-primary/30',
        className
      )}
    >
      <Collapsible open={isExpanded} onOpenChange={() => !isLocked && setIsExpanded(!isExpanded)}>
        <CollapsibleTrigger asChild>
          <CardContent className={cn(
            'p-4 cursor-pointer transition-colors',
            isLocked && 'cursor-not-allowed'
          )}>
            <div className="flex items-start gap-4">
              {/* Challenge Number / Status Icon */}
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg',
                isSubmitted 
                  ? 'bg-success text-success-foreground'
                  : isLocked 
                    ? 'bg-muted text-muted-foreground'
                    : isFinal
                      ? 'bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground shadow-lg'
                      : 'bg-primary text-primary-foreground'
              )}>
                {isSubmitted ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : isLocked ? (
                  <Lock className="w-6 h-6" />
                ) : isFinal ? (
                  <Swords className="w-6 h-6" />
                ) : (
                  index
                )}
              </div>

              {/* Challenge Info */}
              <div className="flex-1 min-w-0">
                {isFinal && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-destructive mb-1 uppercase tracking-wide">
                    <Trophy className="w-3.5 h-3.5" />
                    Desafio Final
                  </span>
                )}
                <h3 className={cn(
                  'font-semibold text-foreground leading-tight',
                  isFinal ? 'text-lg' : 'text-base'
                )}>
                  {challenge.title}
                </h3>
                {challenge.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{challenge.description}</p>
                )}
                
                {/* Medals Preview */}
                {challenge.medals.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {challenge.medals.map((medal) => (
                      <span
                        key={medal.id}
                        className={cn(
                          'inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full',
                          medal.isEarned 
                            ? 'bg-xp-gold/20 text-xp-gold'
                            : 'bg-secondary text-muted-foreground'
                        )}
                      >
                        <span>{medal.icon}</span>
                        <span>{medal.name}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* XP & Expand */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1 text-xp-gold font-semibold">
                  <Zap className="w-4 h-4" />
                  <span>+{challenge.xpReward}</span>
                </div>
                {!isLocked && (
                  isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-4">
            <div className="border-t border-border pt-4" />
            
            {/* Instructions */}
            {challenge.instructions && (
              <div className="bg-secondary/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Instruções</h4>
                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                  {challenge.instructions}
                </div>
              </div>
            )}

            {/* Upload Section */}
            {!isSubmitted && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Upload className="w-4 h-4" />
                  <span>Formatos aceitos: {challenge.acceptedFormats.map(f => f.toUpperCase()).join(', ')}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept={challenge.acceptedFormats.map(f => `.${f}`).join(',')}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <div className={cn(
                      'flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors',
                      selectedFile 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-muted hover:border-primary/50'
                    )}>
                      <Upload className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {selectedFile ? selectedFile.name : 'Selecionar arquivo'}
                      </span>
                    </div>
                  </label>
                  
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedFile || isSubmitting}
                    className={cn(
                      'min-w-[140px]',
                      isFinal && 'bg-destructive hover:bg-destructive/90'
                    )}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solução'}
                  </Button>
                </div>
              </div>
            )}

            {/* Submitted State */}
            {isSubmitted && (
              <div className="flex items-center gap-3 p-4 bg-success/10 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <div>
                  <p className="font-medium text-success">Desafio Concluído!</p>
                  <p className="text-sm text-muted-foreground">Sua solução foi enviada com sucesso.</p>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
