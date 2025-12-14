import { User, Trail, Badge, Challenge, Lesson, Module } from '@/types/learning';

// Current user mock
export const currentUser: User = {
  id: 'user-1',
  name: 'Carolina Santos',
  email: 'carolina.santos@empresa.com',
  role: 'sc',
  level: 'Builder',
  xp: 1850,
  xpToNextLevel: 3000,
  badges: ['badge-1', 'badge-2', 'badge-3'],
  completedChallenges: ['ch-1', 'ch-2', 'ch-3', 'ch-4', 'ch-5'],
  completedLessons: ['lesson-1', 'lesson-2'],
  completedModules: ['module-1'],
  completedTrails: [],
  currentStreak: 7,
  longestStreak: 14,
  joinedAt: '2024-01-15',
};

// All users for admin view
export const allUsers: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@empresa.com',
    role: 'sc',
    level: 'Explorer',
    xp: 450,
    xpToNextLevel: 1000,
    badges: ['badge-1'],
    completedChallenges: ['ch-1', 'ch-2'],
    completedLessons: ['lesson-1'],
    completedModules: [],
    completedTrails: [],
    currentStreak: 3,
    longestStreak: 5,
    joinedAt: '2024-02-01',
  },
  {
    id: 'user-3',
    name: 'Mariana Costa',
    email: 'mariana.costa@empresa.com',
    role: 'sc',
    level: 'Architect',
    xp: 4200,
    xpToNextLevel: 7000,
    badges: ['badge-1', 'badge-2', 'badge-3', 'badge-4', 'badge-5'],
    completedChallenges: ['ch-1', 'ch-2', 'ch-3', 'ch-4', 'ch-5', 'ch-6', 'ch-7'],
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4'],
    completedModules: ['module-1', 'module-2'],
    completedTrails: ['trail-1'],
    currentStreak: 21,
    longestStreak: 21,
    joinedAt: '2023-11-10',
  },
  {
    id: 'user-4',
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@empresa.com',
    role: 'sc',
    level: 'Builder',
    xp: 2100,
    xpToNextLevel: 3000,
    badges: ['badge-1', 'badge-2', 'badge-3', 'badge-4'],
    completedChallenges: ['ch-1', 'ch-2', 'ch-3', 'ch-4', 'ch-5', 'ch-6'],
    completedLessons: ['lesson-1', 'lesson-2', 'lesson-3'],
    completedModules: ['module-1'],
    completedTrails: [],
    currentStreak: 0,
    longestStreak: 12,
    joinedAt: '2024-01-20',
  },
  {
    id: 'user-5',
    name: 'Ana Beatriz Lima',
    email: 'ana.lima@empresa.com',
    role: 'manager',
    level: 'Master',
    xp: 8500,
    xpToNextLevel: 15000,
    badges: ['badge-1', 'badge-2', 'badge-3', 'badge-4', 'badge-5', 'badge-6'],
    completedChallenges: [],
    completedLessons: [],
    completedModules: [],
    completedTrails: ['trail-1', 'trail-2'],
    currentStreak: 45,
    longestStreak: 45,
    joinedAt: '2023-06-01',
  },
];

// Badges
export const badges: Badge[] = [
  {
    id: 'badge-1',
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro desafio',
    icon: '🚀',
    category: 'achievement',
    xpReward: 50,
  },
  {
    id: 'badge-2',
    name: 'Conhecedor do Produto',
    description: 'Complete a trilha Produto & Plataforma',
    icon: '💡',
    category: 'completion',
    xpReward: 200,
  },
  {
    id: 'badge-3',
    name: 'Storyteller',
    description: 'Domine a arte de contar histórias técnicas',
    icon: '📖',
    category: 'skill',
    xpReward: 150,
  },
  {
    id: 'badge-4',
    name: 'Arquiteto de Soluções',
    description: 'Complete a trilha de Integrações & Arquitetura',
    icon: '🏗️',
    category: 'completion',
    xpReward: 300,
  },
  {
    id: 'badge-5',
    name: 'Streak Master',
    description: 'Mantenha uma sequência de 14 dias',
    icon: '🔥',
    category: 'achievement',
    xpReward: 100,
  },
  {
    id: 'badge-6',
    name: 'SC Elite',
    description: 'Alcance o nível Master',
    icon: '👑',
    category: 'special',
    xpReward: 500,
  },
];

// Helper to create challenges
const createChallenge = (
  id: string,
  title: string,
  description: string,
  type: Challenge['type'],
  xp: number,
  duration: number
): Challenge => ({
  id,
  title,
  description,
  type,
  xpReward: xp,
  duration,
});

// Helper to create lessons
const createLesson = (
  id: string,
  title: string,
  description: string,
  challenges: Challenge[]
): Lesson => ({
  id,
  title,
  description,
  challenges,
  xpReward: challenges.reduce((sum, c) => sum + c.xpReward, 0),
});

// Helper to create modules
const createModule = (
  id: string,
  title: string,
  description: string,
  icon: string,
  lessons: Lesson[]
): Module => ({
  id,
  title,
  description,
  icon,
  lessons,
  xpReward: lessons.reduce((sum, l) => sum + l.xpReward, 0),
});

// Trails data
export const trails: Trail[] = [
  {
    id: 'trail-1',
    title: 'Foundations',
    description: 'Empresa, mercado, ICP e proposta de valor. A base para todo Solution Consultant.',
    icon: 'Building2',
    color: 'from-blue-500 to-blue-600',
    prerequisites: [],
    estimatedHours: 8,
    xpReward: 800,
    modules: [
      createModule('mod-1-1', 'Nossa Empresa', 'História, missão e valores', 'Building', [
        createLesson('les-1-1-1', 'História e Cultura', 'Conheça nossa jornada e cultura', [
          createChallenge('ch-1-1-1-1', 'Vídeo: Nossa História', 'Assista ao vídeo institucional', 'video', 30, 15),
          createChallenge('ch-1-1-1-2', 'Quiz: Cultura', 'Teste seus conhecimentos', 'quiz', 50, 10),
        ]),
        createLesson('les-1-1-2', 'Missão e Valores', 'Entenda o que nos move', [
          createChallenge('ch-1-1-2-1', 'Leitura: Manifesto', 'Leia nosso manifesto', 'case-study', 40, 20),
          createChallenge('ch-1-1-2-2', 'Reflexão Prática', 'Aplique os valores em cenário real', 'practical', 80, 30),
        ]),
      ]),
      createModule('mod-1-2', 'Nosso Mercado', 'Entenda o mercado B2B SaaS Enterprise', 'TrendingUp', [
        createLesson('les-1-2-1', 'Panorama do Mercado', 'Visão geral do mercado', [
          createChallenge('ch-1-2-1-1', 'Vídeo: Mercado B2B', 'Tendências e oportunidades', 'video', 40, 20),
          createChallenge('ch-1-2-1-2', 'Análise de Competidores', 'Estudo dos principais players', 'case-study', 60, 25),
        ]),
      ]),
      createModule('mod-1-3', 'ICP & Personas', 'Ideal Customer Profile e Buyer Personas', 'Users', [
        createLesson('les-1-3-1', 'Definindo o ICP', 'Como identificar clientes ideais', [
          createChallenge('ch-1-3-1-1', 'Workshop ICP', 'Exercício prático de ICP', 'practical', 100, 45),
        ]),
      ]),
    ],
  },
  {
    id: 'trail-2',
    title: 'Produto & Plataforma',
    description: 'Domine cada recurso, caso de uso e diferencial competitivo da nossa plataforma.',
    icon: 'Layers',
    color: 'from-purple-500 to-purple-600',
    prerequisites: ['trail-1'],
    estimatedHours: 12,
    xpReward: 1200,
    modules: [
      createModule('mod-2-1', 'Visão Geral', 'Arquitetura e capacidades principais', 'Layout', [
        createLesson('les-2-1-1', 'Arquitetura da Plataforma', 'Entenda como tudo funciona', [
          createChallenge('ch-2-1-1-1', 'Diagrama Interativo', 'Explore a arquitetura', 'video', 50, 25),
          createChallenge('ch-2-1-1-2', 'Quiz Técnico', 'Valide seu entendimento', 'quiz', 60, 15),
        ]),
      ]),
      createModule('mod-2-2', 'Funcionalidades Core', 'Features principais em profundidade', 'Zap', [
        createLesson('les-2-2-1', 'Feature Deep Dive', 'Cada funcionalidade explicada', [
          createChallenge('ch-2-2-1-1', 'Hands-on: Setup', 'Configure do zero', 'practical', 120, 60),
        ]),
      ]),
    ],
  },
  {
    id: 'trail-3',
    title: 'Casos de Uso & Indústrias',
    description: 'Aprenda os principais casos de uso por indústria e como posicionar soluções.',
    icon: 'Briefcase',
    color: 'from-emerald-500 to-emerald-600',
    prerequisites: ['trail-2'],
    estimatedHours: 10,
    xpReward: 1000,
    modules: [
      createModule('mod-3-1', 'Varejo & E-commerce', 'Soluções para o varejo digital', 'ShoppingCart', [
        createLesson('les-3-1-1', 'Desafios do Varejo', 'Principais dores e soluções', [
          createChallenge('ch-3-1-1-1', 'Case: Grande Varejista', 'Estudo de caso real', 'case-study', 80, 40),
        ]),
      ]),
    ],
  },
  {
    id: 'trail-4',
    title: 'Demo & Storytelling Técnico',
    description: 'A arte de apresentar soluções técnicas de forma envolvente e persuasiva.',
    icon: 'Presentation',
    color: 'from-orange-500 to-orange-600',
    prerequisites: ['trail-2'],
    estimatedHours: 8,
    xpReward: 900,
    modules: [
      createModule('mod-4-1', 'Estrutura de Demo', 'Como estruturar demos memoráveis', 'PlayCircle', [
        createLesson('les-4-1-1', 'Framework de Demo', 'Metodologia passo a passo', [
          createChallenge('ch-4-1-1-1', 'Demo ao Vivo', 'Pratique sua demo', 'practical', 150, 60),
        ]),
      ]),
    ],
  },
  {
    id: 'trail-5',
    title: 'Integrações & Arquitetura',
    description: 'APIs, integrações e arquitetura de soluções enterprise.',
    icon: 'Network',
    color: 'from-cyan-500 to-cyan-600',
    prerequisites: ['trail-2'],
    estimatedHours: 15,
    xpReward: 1500,
    modules: [
      createModule('mod-5-1', 'APIs & Webhooks', 'Domine nossas APIs', 'Code', [
        createLesson('les-5-1-1', 'API Reference', 'Documentação e exemplos', [
          createChallenge('ch-5-1-1-1', 'Hands-on: Primeira Integração', 'Crie sua primeira integração', 'practical', 100, 45),
        ]),
      ]),
    ],
  },
  {
    id: 'trail-6',
    title: 'Soft Skills para Pré-vendas',
    description: 'Comunicação, negociação e habilidades interpessoais essenciais.',
    icon: 'MessageCircle',
    color: 'from-pink-500 to-pink-600',
    prerequisites: [],
    estimatedHours: 6,
    xpReward: 600,
    modules: [
      createModule('mod-6-1', 'Comunicação Executiva', 'Como se comunicar com C-level', 'Mic', [
        createLesson('les-6-1-1', 'Linguagem Executiva', 'Adapte sua comunicação', [
          createChallenge('ch-6-1-1-1', 'Role Play: CEO Meeting', 'Simule reunião com CEO', 'practical', 120, 45),
        ]),
      ]),
    ],
  },
];

// Calculate progress for trails
export function calculateTrailProgress(trail: Trail, user: User): number {
  const totalChallenges = trail.modules.reduce(
    (sum, mod) => sum + mod.lessons.reduce((lSum, les) => lSum + les.challenges.length, 0),
    0
  );
  
  const completedChallenges = trail.modules.reduce(
    (sum, mod) =>
      sum +
      mod.lessons.reduce(
        (lSum, les) =>
          lSum + les.challenges.filter((ch) => user.completedChallenges.includes(ch.id)).length,
        0
      ),
    0
  );
  
  return totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;
}

// Get recommended challenge for user
export function getRecommendedChallenge(user: User): Challenge | null {
  for (const trail of trails) {
    if (trail.prerequisites.some(p => !user.completedTrails.includes(p))) {
      continue;
    }
    
    for (const module of trail.modules) {
      for (const lesson of module.lessons) {
        for (const challenge of lesson.challenges) {
          if (!user.completedChallenges.includes(challenge.id)) {
            return challenge;
          }
        }
      }
    }
  }
  return null;
}

// Get total XP available
export function getTotalXpAvailable(): number {
  return trails.reduce((sum, trail) => sum + trail.xpReward, 0);
}

// Get user's overall progress percentage
export function getOverallProgress(user: User): number {
  const totalXp = getTotalXpAvailable();
  return totalXp > 0 ? Math.round((user.xp / totalXp) * 100) : 0;
}
