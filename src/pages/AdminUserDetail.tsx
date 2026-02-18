import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { allUsers, trails } from '@/data/mockData';
import { getLocalizedText, type SupportedLocale } from '@/types/learning';
import { useLanguage } from '@/i18n';
import { ArrowLeft, Download, Mail, Zap, Trophy, CheckCircle2 } from 'lucide-react';

interface CompletedItem {
  id: string;
  title: string;
  subTrackTitle: string;
  trailTitle: string;
  xpReward: number;
  type: 'learning' | 'assessment' | 'boss' | 'practical';
  completedAt: string;
}

function getCompletedItems(userId: string, language: SupportedLocale): CompletedItem[] {
  const user = allUsers.find(u => u.id === userId);
  if (!user) return [];

  const items: CompletedItem[] = [];
  const mockDates = [
    "2025-12-03", "2025-12-07", "2025-12-12", "2025-12-18",
    "2026-01-05", "2026-01-10", "2026-01-15", "2026-01-22",
    "2026-02-01", "2026-02-05", "2026-02-08", "2026-02-12",
    "2026-02-14", "2026-02-16", "2026-02-17", "2026-02-18",
  ];
  let dateIdx = 0;

  for (const trail of trails) {
    for (const subTrack of trail.subTracks) {
      for (const mod of subTrack.modules) {
        // Learning content
        for (const lc of mod.learningContent) {
          if (user.completedChallenges.includes(lc.id)) {
            items.push({
              id: lc.id,
              title: lc.title,
              subTrackTitle: getLocalizedText(subTrack.title, language),
              trailTitle: getLocalizedText(trail.title, language),
              xpReward: lc.xpReward,
              type: 'learning',
              completedAt: mockDates[dateIdx++ % mockDates.length],
            });
          }
        }

        // Assessments
        if (user.completedAssessments?.includes(mod.assessment.id) && mod.assessment.id) {
          items.push({
            id: mod.assessment.id,
            title: mod.assessment.title,
            subTrackTitle: getLocalizedText(subTrack.title, language),
            trailTitle: getLocalizedText(trail.title, language),
            xpReward: mod.assessment.xpReward,
            type: 'assessment',
            completedAt: mockDates[dateIdx++ % mockDates.length],
          });
        }

        // Boss challenges
        if (user.completedBossChallenges?.includes(mod.bossChallenge.id) && mod.bossChallenge.id) {
          items.push({
            id: mod.bossChallenge.id,
            title: mod.bossChallenge.title,
            subTrackTitle: getLocalizedText(subTrack.title, language),
            trailTitle: getLocalizedText(trail.title, language),
            xpReward: mod.bossChallenge.xpReward,
            type: 'boss',
            completedAt: mockDates[dateIdx++ % mockDates.length],
          });
        }

        // Practical challenges
        if (mod.isChallengeBased && mod.practicalChallenges) {
          for (const pc of mod.practicalChallenges) {
            if (user.completedChallenges.includes(pc.id) || pc.isSubmitted || pc.isCompleted) {
              items.push({
                id: pc.id,
                title: getLocalizedText(pc.title, language),
                subTrackTitle: getLocalizedText(subTrack.title, language),
                trailTitle: getLocalizedText(trail.title, language),
                xpReward: pc.xpReward,
                type: 'practical',
                completedAt: mockDates[dateIdx++ % mockDates.length],
              });
            }
          }
        }
      }
    }
  }

  return items;
}

function generateMockSubmission(item: CompletedItem) {
  const submission = {
    submissionId: `sub-${item.id}-${Date.now()}`,
    challengeId: item.id,
    challengeTitle: item.title,
    track: item.trailTitle,
    subTrack: item.subTrackTitle,
    submittedAt: `${item.completedAt}T14:32:00.000Z`,
    status: "approved",
    xpAwarded: item.xpReward,
    evaluator: "system-auto",
    data: {
      format: "json",
      version: "1.0",
      content: {
        templateId: `tmpl-${Math.random().toString(36).substring(2, 8)}`,
        configuration: {
          recipients: [
            { role: "signer", name: "John Doe", email: "john.doe@example.com" },
            { role: "approver", name: "Jane Smith", email: "jane.smith@example.com" },
          ],
          fields: [
            { type: "signature", page: 1, x: 200, y: 500 },
            { type: "date", page: 1, x: 200, y: 550 },
          ],
          settings: {
            reminders: true,
            expirationDays: 30,
            authentication: "email",
          },
        },
      },
    },
  };

  const blob = new Blob([JSON.stringify(submission, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `submission-${item.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

const typeLabels: Record<string, string> = {
  learning: 'Content',
  assessment: 'Assessment',
  boss: 'Boss Challenge',
  practical: 'Practical Challenge',
};

const typeColors: Record<string, string> = {
  learning: 'secondary',
  assessment: 'default',
  boss: 'destructive',
  practical: 'default',
};

export default function AdminUserDetail() {
  const { userId } = useParams();
  const { language } = useLanguage();
  const user = allUsers.find(u => u.id === userId);

  if (!user) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">User not found</p>
          <Link to="/admin">
            <Button variant="link">Back to Management</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const completedItems = getCompletedItems(user.id, language);
  const totalXpEarned = completedItems.reduce((sum, item) => sum + item.xpReward, 0);

  return (
    <MainLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back link */}
        <Link to="/admin" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Management
        </Link>

        {/* User Info Card */}
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-xl text-primary-foreground font-bold shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </p>
              </div>
              <LevelBadge xp={user.xp} size="md" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{user.xp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Zap className="w-3 h-3" /> Total XP</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{completedItems.length}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{user.currentStreak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{user.badges.length}</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Trophy className="w-3 h-3" /> Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completed Challenges */}
        <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-lg">Completed Challenges</CardTitle>
            <CardDescription>
              {completedItems.length} items completed · {totalXpEarned.toLocaleString()} XP earned
            </CardDescription>
          </CardHeader>
          <CardContent>
            {completedItems.length === 0 ? (
              <p className="text-muted-foreground text-sm py-8 text-center">No completed challenges yet.</p>
            ) : (
              <div className="space-y-3">
                {completedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.trailTitle} › {item.subTrackTitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={typeColors[item.type] as any}>{typeLabels[item.type]}</Badge>
                      <span className="text-xs font-medium text-xp-gold whitespace-nowrap">+{item.xpReward} XP</span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{item.completedAt}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 ml-1"
                        onClick={() => generateMockSubmission(item)}
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">JSON</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
