import { useParams, Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SubTrackCard } from '@/components/trails/SubTrackCard';
import { trails, currentUser, calculateTrailProgress, calculateSubTrackProgress } from '@/data/mockData';
import { ArrowLeft, Clock, Zap, CheckCircle2, Lock, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TrailDetail() {
  const { trailId } = useParams();
  const navigate = useNavigate();
  const trail = trails.find(t => t.id === trailId);
  
  if (!trail) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Trilha não encontrada</p>
          <Link to="/trails">
            <Button variant="link">Voltar às trilhas</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const progress = calculateTrailProgress(trail, currentUser);
  const isLocked = trail.prerequisites.some(p => !currentUser.completedTrails.includes(p));

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <Link to="/trails" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Voltar às trilhas
          </Link>
          
          <div className={cn(
            'rounded-2xl p-6 md:p-8 bg-gradient-to-br text-primary-foreground',
            trail.color
          )}>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{trail.title}</h1>
            <p className="text-primary-foreground/80 mb-6">{trail.description}</p>
            
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{trail.estimatedHours} horas</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>{trail.xpReward} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                <span>{trail.subTracks.filter(st => st.status !== 'coming-soon' && st.status !== 'hidden').length} sub-trilhas</span>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso Geral</span>
                <span>{progress}%</span>
              </div>
              <div className="h-3 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-foreground transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Tracks */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Sub-trilhas</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {trail.subTracks
              .filter(st => st.status !== 'coming-soon' && st.status !== 'hidden')
              .map((subTrack, idx) => {
                const subTrackProgress = calculateSubTrackProgress(subTrack, currentUser);
                
                return (
                  <div
                    key={subTrack.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <SubTrackCard
                      subTrack={subTrack}
                      progress={subTrackProgress}
                      isLocked={isLocked}
                      trailColor={trail.color}
                      onClick={() => navigate(`/trails/${trailId}/subtrack/${subTrack.id}`)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
