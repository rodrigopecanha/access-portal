import { MainLayout } from '@/components/layout/MainLayout';
import { TrailCard } from '@/components/trails/TrailCard';
import { trails, currentUser, calculateTrailProgress } from '@/data/mockData';

export default function Trails() {
  const trailsWithProgress = trails.map(trail => ({
    ...trail,
    progress: calculateTrailProgress(trail, currentUser),
    isLocked: trail.prerequisites.some(p => !currentUser.completedTrails.includes(p))
  }));

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Trilhas de Aprendizado</h1>
          <p className="text-muted-foreground">Escolha uma trilha e evolua suas habilidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trailsWithProgress.map(trail => (
            <TrailCard 
              key={trail.id} 
              trail={trail}
              progress={trail.progress}
              isLocked={trail.isLocked}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
