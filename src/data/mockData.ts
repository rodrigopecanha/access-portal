import { User, Trail, Badge, Challenge, Lesson, Module, SubTrack } from '@/types/learning';

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
  completedChallenges: ['ch-iam-nav-1', 'ch-iam-nav-2', 'ch-iam-maestro-1'],
  completedLessons: ['les-iam-nav-1'],
  completedModules: ['mod-iam-nav-1'],
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
    completedChallenges: ['ch-iam-nav-1'],
    completedLessons: [],
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
    completedChallenges: ['ch-iam-nav-1', 'ch-iam-nav-2', 'ch-iam-nav-3', 'ch-iam-maestro-1', 'ch-esig-basic-1', 'ch-esig-basic-2'],
    completedLessons: ['les-iam-nav-1', 'les-iam-nav-2', 'les-esig-basic-1'],
    completedModules: ['mod-iam-nav-1', 'mod-esig-basic-1'],
    completedTrails: [],
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
    completedChallenges: ['ch-iam-nav-1', 'ch-iam-nav-2', 'ch-iam-maestro-1', 'ch-iam-maestro-2'],
    completedLessons: ['les-iam-nav-1', 'les-iam-maestro-1'],
    completedModules: ['mod-iam-nav-1'],
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
    completedTrails: ['trail-iam'],
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
    name: 'IAM Expert',
    description: 'Complete a trilha IAM',
    icon: '🔐',
    category: 'completion',
    xpReward: 200,
  },
  {
    id: 'badge-3',
    name: 'eSignature Pro',
    description: 'Complete a trilha eSignature',
    icon: '✍️',
    category: 'completion',
    xpReward: 250,
  },
  {
    id: 'badge-4',
    name: 'Navigator Master',
    description: 'Domine o Navigator completamente',
    icon: '🧭',
    category: 'skill',
    xpReward: 150,
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

// Helper to create sub-tracks
const createSubTrack = (
  id: string,
  title: string,
  description: string,
  icon: string,
  modules: Module[]
): SubTrack => ({
  id,
  title,
  description,
  icon,
  modules,
  xpReward: modules.reduce((sum, m) => sum + m.xpReward, 0),
});

// IAM Trail
const iamSubTracks: SubTrack[] = [
  createSubTrack('subtrack-iam-navigator', 'Navigator', 'Domine o Navigator para gestão de identidades', 'Compass', [
    createModule('mod-iam-nav-1', 'Introdução ao Navigator', 'Fundamentos e interface', 'Layout', [
      createLesson('les-iam-nav-1', 'Visão Geral', 'Conheça a interface do Navigator', [
        createChallenge('ch-iam-nav-1', 'Vídeo: Tour pelo Navigator', 'Tour completo pela interface', 'video', 40, 15),
        createChallenge('ch-iam-nav-2', 'Quiz: Componentes', 'Teste seu conhecimento', 'quiz', 50, 10),
      ]),
      createLesson('les-iam-nav-2', 'Configuração Inicial', 'Setup e primeiros passos', [
        createChallenge('ch-iam-nav-3', 'Hands-on: Primeiro Setup', 'Configure do zero', 'practical', 80, 30),
      ]),
    ]),
    createModule('mod-iam-nav-2', 'Gestão de Usuários', 'Criação e gerenciamento de usuários', 'Users', [
      createLesson('les-iam-nav-3', 'CRUD de Usuários', 'Operações básicas de usuários', [
        createChallenge('ch-iam-nav-4', 'Case: Onboarding em Massa', 'Estudo de caso real', 'case-study', 60, 25),
        createChallenge('ch-iam-nav-5', 'Prática: Bulk Import', 'Importe 100 usuários', 'practical', 100, 45),
      ]),
    ]),
  ]),
  createSubTrack('subtrack-iam-maestro', 'Maestro', 'Orquestração avançada de identidades', 'Wand2', [
    createModule('mod-iam-maestro-1', 'Automação de Provisionamento', 'Workflows automáticos', 'Workflow', [
      createLesson('les-iam-maestro-1', 'Workflows Básicos', 'Criando sua primeira automação', [
        createChallenge('ch-iam-maestro-1', 'Vídeo: Introdução ao Maestro', 'Conceitos fundamentais', 'video', 50, 20),
        createChallenge('ch-iam-maestro-2', 'Hands-on: Primeiro Workflow', 'Crie um workflow simples', 'practical', 120, 45),
      ]),
    ]),
  ]),
  createSubTrack('subtrack-iam-agreement', 'Agreement Desk', 'Gestão de termos e consentimentos', 'FileCheck', [
    createModule('mod-iam-agreement-1', 'Termos de Uso', 'Configuração de termos', 'FileText', [
      createLesson('les-iam-agreement-1', 'Criando Termos', 'Configuração de termos customizados', [
        createChallenge('ch-iam-agreement-1', 'Vídeo: Agreement Desk', 'Visão geral da ferramenta', 'video', 35, 15),
        createChallenge('ch-iam-agreement-2', 'Quiz: Compliance', 'Teste de conformidade', 'quiz', 45, 10),
      ]),
    ]),
  ]),
  createSubTrack('subtrack-iam-workspaces', 'Workspaces', 'Ambientes isolados e multi-tenancy', 'Building2', [
    createModule('mod-iam-workspaces-1', 'Arquitetura Multi-tenant', 'Conceitos de isolamento', 'Layers', [
      createLesson('les-iam-workspaces-1', 'Fundamentos de Workspaces', 'Entenda a arquitetura', [
        createChallenge('ch-iam-workspaces-1', 'Vídeo: Multi-tenancy', 'Conceitos avançados', 'video', 45, 20),
        createChallenge('ch-iam-workspaces-2', 'Case: Enterprise Setup', 'Cenário enterprise real', 'case-study', 70, 35),
      ]),
    ]),
  ]),
];

// eSignature Trail
const esignatureSubTracks: SubTrack[] = [
  createSubTrack('subtrack-esig-basic', 'Features Básicas', 'Funcionalidades essenciais de assinatura', 'PenTool', [
    createModule('mod-esig-basic-1', 'Assinatura Simples', 'Fluxo básico de assinatura', 'Edit3', [
      createLesson('les-esig-basic-1', 'Primeiro Documento', 'Enviando para assinatura', [
        createChallenge('ch-esig-basic-1', 'Vídeo: Quick Start', 'Início rápido com eSignature', 'video', 30, 12),
        createChallenge('ch-esig-basic-2', 'Hands-on: Envie um Documento', 'Envie seu primeiro documento', 'practical', 60, 20),
      ]),
    ]),
    createModule('mod-esig-basic-2', 'Templates', 'Criação e uso de templates', 'FileCode', [
      createLesson('les-esig-basic-2', 'Criando Templates', 'Templates reutilizáveis', [
        createChallenge('ch-esig-basic-3', 'Vídeo: Power of Templates', 'Aumente produtividade', 'video', 40, 18),
        createChallenge('ch-esig-basic-4', 'Prática: Template Wizard', 'Crie 3 templates', 'practical', 90, 40),
      ]),
    ]),
  ]),
  createSubTrack('subtrack-esig-advanced-wf', 'Advanced Workflows', 'Fluxos avançados de assinatura', 'GitBranch', [
    createModule('mod-esig-adv-wf-1', 'Fluxos Sequenciais', 'Múltiplos signatários em ordem', 'ListOrdered', [
      createLesson('les-esig-adv-wf-1', 'Routing Avançado', 'Defina ordem de assinatura', [
        createChallenge('ch-esig-adv-wf-1', 'Vídeo: Sequential Signing', 'Fluxos em cadeia', 'video', 45, 20),
        createChallenge('ch-esig-adv-wf-2', 'Case: Aprovação Hierárquica', 'Cenário corporativo', 'case-study', 70, 30),
      ]),
    ]),
  ]),
  createSubTrack('subtrack-esig-advanced-feat', 'Features Avançadas', 'Recursos avançados da plataforma', 'Sparkles', [
    createModule('mod-esig-adv-feat-1', 'Campos Inteligentes', 'Campos dinâmicos e condicionais', 'FormInput', [
      createLesson('les-esig-adv-feat-1', 'Smart Fields', 'Campos que se adaptam', [
        createChallenge('ch-esig-adv-feat-1', 'Vídeo: Dynamic Fields', 'Campos condicionais', 'video', 50, 22),
        createChallenge('ch-esig-adv-feat-2', 'Hands-on: Formulário Inteligente', 'Crie um formulário dinâmico', 'practical', 110, 50),
      ]),
    ]),
  ]),
  createSubTrack('subtrack-esig-admin', 'Ferramentas Administrativas', 'Gestão e configurações administrativas', 'Settings', [
    createModule('mod-esig-admin-1', 'Painel Administrativo', 'Configurações avançadas', 'SlidersHorizontal', [
      createLesson('les-esig-admin-1', 'Admin Console', 'Configurações do sistema', [
        createChallenge('ch-esig-admin-1', 'Vídeo: Admin Overview', 'Tour pelo admin', 'video', 40, 18),
        createChallenge('ch-esig-admin-2', 'Quiz: Best Practices', 'Teste de boas práticas', 'quiz', 55, 15),
      ]),
    ]),
  ]),
  createSubTrack('subtrack-esig-sso', 'SSO & Organization Management', 'Single Sign-On e gestão organizacional', 'Shield', [
    createModule('mod-esig-sso-1', 'Configuração de SSO', 'Integração com identity providers', 'Key', [
      createLesson('les-esig-sso-1', 'SAML & OIDC', 'Protocolos de autenticação', [
        createChallenge('ch-esig-sso-1', 'Vídeo: SSO Deep Dive', 'Entenda SSO completo', 'video', 55, 25),
        createChallenge('ch-esig-sso-2', 'Hands-on: Configure Okta', 'Integre com Okta', 'practical', 130, 60),
      ]),
    ]),
    createModule('mod-esig-sso-2', 'Organization Management', 'Gestão de organizações', 'Building', [
      createLesson('les-esig-sso-2', 'Hierarquia Organizacional', 'Estrutura de organizações', [
        createChallenge('ch-esig-sso-3', 'Case: Enterprise Rollout', 'Implantação enterprise', 'case-study', 80, 40),
      ]),
    ]),
  ]),
];

// Trails data with sub-tracks
export const trails: Trail[] = [
  {
    id: 'trail-iam',
    title: 'IAM',
    description: 'Identity and Access Management - Domine a gestão de identidades, acessos e provisionamento.',
    icon: 'Shield',
    color: 'from-blue-500 to-indigo-600',
    prerequisites: [],
    estimatedHours: 20,
    xpReward: iamSubTracks.reduce((sum, st) => sum + st.xpReward, 0),
    subTracks: iamSubTracks,
  },
  {
    id: 'trail-esignature',
    title: 'eSignature',
    description: 'Assinatura Eletrônica - Do básico ao avançado em workflows de assinatura digital.',
    icon: 'PenTool',
    color: 'from-emerald-500 to-teal-600',
    prerequisites: [],
    estimatedHours: 18,
    xpReward: esignatureSubTracks.reduce((sum, st) => sum + st.xpReward, 0),
    subTracks: esignatureSubTracks,
  },
];

// Calculate progress for sub-tracks
export function calculateSubTrackProgress(subTrack: SubTrack, user: User): number {
  const totalChallenges = subTrack.modules.reduce(
    (sum, mod) => sum + mod.lessons.reduce((lSum, les) => lSum + les.challenges.length, 0),
    0
  );
  
  const completedChallenges = subTrack.modules.reduce(
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

// Calculate progress for trails (aggregates from sub-tracks)
export function calculateTrailProgress(trail: Trail, user: User): number {
  const totalChallenges = trail.subTracks.reduce(
    (sum, st) => sum + st.modules.reduce(
      (mSum, mod) => mSum + mod.lessons.reduce((lSum, les) => lSum + les.challenges.length, 0),
      0
    ),
    0
  );
  
  const completedChallenges = trail.subTracks.reduce(
    (sum, st) => sum + st.modules.reduce(
      (mSum, mod) =>
        mSum +
        mod.lessons.reduce(
          (lSum, les) =>
            lSum + les.challenges.filter((ch) => user.completedChallenges.includes(ch.id)).length,
          0
        ),
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
    
    for (const subTrack of trail.subTracks) {
      for (const module of subTrack.modules) {
        for (const lesson of module.lessons) {
          for (const challenge of lesson.challenges) {
            if (!user.completedChallenges.includes(challenge.id)) {
              return challenge;
            }
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
