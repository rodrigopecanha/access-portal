import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { allUsers, trails, calculateTrailProgress } from '@/data/mockData';
import { LevelBadge } from '@/components/gamification/LevelBadge';
import { useLanguage } from '@/i18n';
import { getLocalizedText } from '@/types/learning';

export default function Admin() {
  const { language } = useLanguage();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Gestão do Time</h1>
          <p className="text-muted-foreground">Acompanhe o progresso de todos os Solution Consultants</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Progresso dos Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>XP</TableHead>
                    <TableHead>Streak</TableHead>
                    {trails.slice(0, 3).map(trail => (
                      <TableHead key={trail.id} className="min-w-[120px]">{getLocalizedText(trail.title, language)}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm text-primary-foreground">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <LevelBadge xp={user.xp} size="sm" showName={false} />
                      </TableCell>
                      <TableCell className="font-medium text-xp-gold">{user.xp.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={user.currentStreak > 0 ? "default" : "secondary"}>
                          {user.currentStreak} dias
                        </Badge>
                      </TableCell>
                      {trails.slice(0, 3).map(trail => {
                        const progress = calculateTrailProgress(trail, user);
                        return (
                          <TableCell key={trail.id}>
                            <div className="flex items-center gap-2">
                              <Progress value={progress} className="h-2 w-16" />
                              <span className="text-sm text-muted-foreground">{progress}%</span>
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
