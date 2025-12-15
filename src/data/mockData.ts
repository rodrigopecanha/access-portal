import { User, Trail, Badge, SubTrack, LearningContent, Assessment, BossChallenge, QuizQuestion, Module } from '@/types/learning';

// Current user mock - includes completed assessments and boss challenges
export const currentUser: User & { 
  completedAssessments: string[]; 
  completedBossChallenges: string[];
  assessmentScores: Record<string, number>;
} = {
  id: 'user-1',
  name: 'Carolina Santos',
  email: 'carolina.santos@empresa.com',
  role: 'sc',
  level: 'Builder',
  xp: 1850,
  xpToNextLevel: 3000,
  badges: ['badge-1', 'badge-2', 'badge-3'],
  completedChallenges: ['lc-iam-nav-1', 'lc-iam-nav-2', 'lc-iam-nav-3'],
  completedLessons: [],
  completedModules: ['mod-iam-nav-1'],
  completedTrails: [],
  completedAssessments: ['assess-iam-nav-1'],
  completedBossChallenges: ['boss-iam-nav-1'],
  assessmentScores: { 'assess-iam-nav-1': 85 },
  currentStreak: 7,
  longestStreak: 14,
  joinedAt: '2024-01-15',
};

// All users for admin view
export const allUsers: (User & { completedAssessments?: string[]; completedBossChallenges?: string[]; assessmentScores?: Record<string, number> })[] = [
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
    completedChallenges: ['lc-iam-nav-1'],
    completedLessons: [],
    completedModules: [],
    completedTrails: [],
    completedAssessments: [],
    completedBossChallenges: [],
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
    completedChallenges: ['lc-iam-nav-1', 'lc-iam-nav-2', 'lc-esig-basic-1', 'lc-esig-basic-2'],
    completedLessons: [],
    completedModules: ['mod-iam-nav-1', 'mod-esig-basic-1'],
    completedTrails: [],
    completedAssessments: ['assess-iam-nav-1', 'assess-esig-basic-1'],
    completedBossChallenges: ['boss-iam-nav-1', 'boss-esig-basic-1'],
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
    completedChallenges: ['lc-iam-nav-1', 'lc-iam-nav-2', 'lc-iam-maestro-1'],
    completedLessons: [],
    completedModules: ['mod-iam-nav-1'],
    completedTrails: [],
    completedAssessments: ['assess-iam-nav-1'],
    completedBossChallenges: ['boss-iam-nav-1'],
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
    completedAssessments: [],
    completedBossChallenges: [],
    currentStreak: 45,
    longestStreak: 45,
    joinedAt: '2023-06-01',
  },
];

// Badges
export const badges: Badge[] = [
  { id: 'badge-1', name: 'Primeiro Passo', description: 'Complete seu primeiro desafio', icon: '🚀', category: 'achievement', xpReward: 50 },
  { id: 'badge-2', name: 'IAM Expert', description: 'Complete a trilha IAM', icon: '🔐', category: 'completion', xpReward: 200 },
  { id: 'badge-3', name: 'eSignature Pro', description: 'Complete a trilha eSignature', icon: '✍️', category: 'completion', xpReward: 250 },
  { id: 'badge-4', name: 'Navigator Master', description: 'Domine o Navigator completamente', icon: '🧭', category: 'skill', xpReward: 150 },
  { id: 'badge-5', name: 'Streak Master', description: 'Mantenha uma sequência de 14 dias', icon: '🔥', category: 'achievement', xpReward: 100 },
  { id: 'badge-6', name: 'SC Elite', description: 'Alcance o nível Master', icon: '👑', category: 'special', xpReward: 500 },
  { id: 'badge-7', name: 'Boss Slayer', description: 'Complete 5 Boss Challenges', icon: '⚔️', category: 'achievement', xpReward: 300 },
];

// Helper functions
const createLearningContent = (id: string, title: string, description: string, type: LearningContent['type'], duration: number, xp: number): LearningContent => ({
  id, title, description, type, duration, xpReward: xp,
});

const createQuizQuestion = (id: string, question: string, options: string[], correctAnswer: number): QuizQuestion => ({
  id, question, options, correctAnswer,
});

const createAssessment = (id: string, title: string, description: string, questions: QuizQuestion[], xp: number): Assessment => ({
  id, title, description, questions, passingScore: 70, xpReward: xp,
});

const createBossChallenge = (id: string, title: string, description: string, instructions: string, xp: number): BossChallenge => ({
  id, title, description, instructions, acceptedFormats: ['json', 'zip'], xpReward: xp,
});

const createModule = (id: string, title: string, description: string, icon: string, learningContent: LearningContent[], assessment: Assessment, bossChallenge: BossChallenge): Module => ({
  id, title, description, icon, learningContent, assessment, bossChallenge,
  xpReward: learningContent.reduce((sum, l) => sum + l.xpReward, 0) + assessment.xpReward + bossChallenge.xpReward,
});

const createSubTrack = (id: string, title: string, description: string, icon: string, modules: Module[]): SubTrack => ({
  id, title, description, icon, modules, xpReward: modules.reduce((sum, m) => sum + m.xpReward, 0),
});

// eSignature Features Básicas - 20 exam questions
const esigBasicQuestions: QuizQuestion[] = [
  createQuizQuestion('q-esig-1', 'O que é uma assinatura eletrônica?', ['Apenas uma imagem da assinatura', 'Um método legal de consentimento digital', 'Uma senha de acesso', 'Um tipo de criptografia'], 1),
  createQuizQuestion('q-esig-2', 'Qual a diferença entre assinatura eletrônica e digital?', ['São a mesma coisa', 'Digital usa certificado, eletrônica é mais ampla', 'Eletrônica é mais segura', 'Digital não é válida legalmente'], 1),
  createQuizQuestion('q-esig-3', 'O que é DocGen?', ['Um gerador de documentos', 'Ferramenta de envio em massa', 'Sistema de templates', 'Todas as anteriores'], 3),
  createQuizQuestion('q-esig-4', 'Quantos signatários podem ser adicionados em um envelope?', ['Apenas 1', 'Até 5', 'Até 10', 'Ilimitado'], 3),
  createQuizQuestion('q-esig-5', 'O que é um template no eSignature?', ['Modelo reutilizável de documento', 'Tipo de assinatura', 'Formato de arquivo', 'Nenhuma das anteriores'], 0),
  createQuizQuestion('q-esig-6', 'Qual formato de arquivo é suportado para upload?', ['PDF apenas', 'PDF e Word', 'PDF, Word e imagens', 'Todos os formatos'], 2),
  createQuizQuestion('q-esig-7', 'O que acontece após o último signatário assinar?', ['O documento é deletado', 'O envelope é concluído', 'Precisa de aprovação manual', 'O documento expira'], 1),
  createQuizQuestion('q-esig-8', 'O que é Certificate of Completion?', ['Certificado de treinamento', 'Prova legal de assinatura', 'Relatório de uso', 'Badge do sistema'], 1),
  createQuizQuestion('q-esig-9', 'Como funciona a notificação aos signatários?', ['Apenas por email', 'Email e SMS', 'Email, SMS e push', 'Não há notificação'], 1),
  createQuizQuestion('q-esig-10', 'O que é um campo de assinatura?', ['Local onde o signatário assina', 'Tipo de documento', 'Formato de exportação', 'Configuração de segurança'], 0),
  createQuizQuestion('q-esig-11', 'Qual a validade legal de documentos assinados eletronicamente?', ['Não tem validade', 'Apenas para contratos simples', 'Equivalente a assinatura física', 'Depende do país'], 2),
  createQuizQuestion('q-esig-12', 'O que é envelope routing?', ['Ordem de assinatura', 'Tipo de criptografia', 'Método de envio', 'Formato de arquivo'], 0),
  createQuizQuestion('q-esig-13', 'Como adicionar campos obrigatórios em um documento?', ['Não é possível', 'Através do editor de templates', 'Apenas via API', 'Por email'], 1),
  createQuizQuestion('q-esig-14', 'O que é bulk send?', ['Envio para múltiplos destinatários', 'Envio de arquivos grandes', 'Backup de documentos', 'Sincronização'], 0),
  createQuizQuestion('q-esig-15', 'Qual é a função do audit trail?', ['Rastrear todas as ações no documento', 'Deletar documentos antigos', 'Comprimir arquivos', 'Enviar notificações'], 0),
  createQuizQuestion('q-esig-16', 'O que é uma signing group?', ['Grupo de templates', 'Grupo de signatários intercambiáveis', 'Configuração de admin', 'Tipo de relatório'], 1),
  createQuizQuestion('q-esig-17', 'Como funciona a expiração de envelopes?', ['Documentos nunca expiram', 'Configurável por envelope', 'Sempre 30 dias', 'Apenas para trials'], 1),
  createQuizQuestion('q-esig-18', 'O que é recipient authentication?', ['Verificação de identidade do signatário', 'Login do admin', 'Criptografia de arquivo', 'Backup de dados'], 0),
  createQuizQuestion('q-esig-19', 'Qual a função de campos de texto em templates?', ['Coletar informações adicionais', 'Apenas decoração', 'Assinatura alternativa', 'Nenhuma'], 0),
  createQuizQuestion('q-esig-20', 'O que acontece com documentos completados?', ['São deletados', 'Ficam disponíveis para download', 'Precisam ser aprovados', 'Expiram em 24h'], 1),
];

// Generic questions for other modules
const genericQuestions = (prefix: string) => [
  createQuizQuestion(`${prefix}-1`, 'Qual o principal objetivo desta ferramenta?', ['Automatizar processos', 'Criar documentos', 'Enviar emails', 'Fazer backup'], 0),
  createQuizQuestion(`${prefix}-2`, 'Qual a melhor prática ao configurar o sistema?', ['Seguir a documentação oficial', 'Usar configurações padrão', 'Ignorar avisos', 'Desativar logs'], 0),
];

// IAM Trail Modules
const iamSubTracks: SubTrack[] = [
  createSubTrack('subtrack-iam-navigator', 'Navigator', 'Domine o Navigator para gestão de identidades', 'Compass', [
    createModule('mod-iam-nav-1', 'Introdução ao Navigator', 'Fundamentos e interface do Navigator', 'Layout',
      [
        createLearningContent('lc-iam-nav-1', 'Tour pelo Navigator', 'Conheça a interface completa', 'video', 15, 40),
        createLearningContent('lc-iam-nav-2', 'Conceitos Fundamentais', 'Entenda os conceitos base', 'article', 20, 30),
        createLearningContent('lc-iam-nav-3', 'Arquitetura do Sistema', 'Slides sobre a arquitetura', 'slides', 10, 25),
      ],
      createAssessment('assess-iam-nav-1', 'Exame: Introdução ao Navigator', 'Teste seus conhecimentos sobre o Navigator', genericQuestions('q-nav'), 100),
      createBossChallenge('boss-iam-nav-1', 'Configure um Ambiente Navigator', 'Crie e configure um ambiente Navigator completo do zero', 
        '## Objetivo\nConfigure um ambiente Navigator funcional seguindo as melhores práticas.\n\n## Requisitos\n1. Crie a estrutura de usuários\n2. Configure as permissões básicas\n3. Documente as configurações\n\n## Entrega\nExporte a configuração em formato JSON ou ZIP contendo os arquivos de configuração.', 150)
    ),
    createModule('mod-iam-nav-2', 'Gestão de Usuários', 'Criação e gerenciamento de usuários', 'Users',
      [
        createLearningContent('lc-iam-nav-4', 'CRUD de Usuários', 'Operações básicas com usuários', 'video', 25, 50),
        createLearningContent('lc-iam-nav-5', 'Bulk Import Guide', 'Como importar usuários em massa', 'article', 15, 35),
      ],
      createAssessment('assess-iam-nav-2', 'Exame: Gestão de Usuários', 'Teste sobre operações de usuários', genericQuestions('q-nav-user'), 80),
      createBossChallenge('boss-iam-nav-2', 'Onboarding em Massa', 'Realize o onboarding de 100 usuários fictícios',
        '## Objetivo\nCrie um processo de onboarding automatizado para 100 usuários.\n\n## Requisitos\n1. Prepare um arquivo CSV com os dados\n2. Execute o import\n3. Valide os resultados\n\n## Entrega\nEnvie o arquivo CSV utilizado e o relatório de importação.', 200)
    ),
  ]),
  createSubTrack('subtrack-iam-maestro', 'Maestro', 'Orquestração avançada de identidades', 'Wand2', [
    createModule('mod-iam-maestro-1', 'Automação de Provisionamento', 'Workflows automáticos', 'Workflow',
      [
        createLearningContent('lc-iam-maestro-1', 'Introdução ao Maestro', 'Conceitos fundamentais de orquestração', 'video', 20, 50),
        createLearningContent('lc-iam-maestro-2', 'Criando Workflows', 'Passo a passo para criar workflows', 'article', 25, 40),
      ],
      createAssessment('assess-iam-maestro-1', 'Exame: Automação', 'Teste sobre workflows', genericQuestions('q-maestro'), 90),
      createBossChallenge('boss-iam-maestro-1', 'Workflow de Provisionamento', 'Crie um workflow completo de provisionamento',
        '## Objetivo\nDesenvolva um workflow que automatize o provisionamento de novos colaboradores.\n\n## Requisitos\n1. Defina os triggers\n2. Configure as ações\n3. Teste o fluxo\n\n## Entrega\nExporte o workflow em formato JSON.', 180)
    ),
  ]),
  createSubTrack('subtrack-iam-agreement', 'Agreement Desk', 'Gestão de termos e consentimentos', 'FileCheck', [
    createModule('mod-iam-agreement-1', 'Termos de Uso', 'Configuração de termos', 'FileText',
      [
        createLearningContent('lc-iam-agreement-1', 'Agreement Desk Overview', 'Visão geral da ferramenta', 'video', 15, 35),
        createLearningContent('lc-iam-agreement-2', 'Compliance e LGPD', 'Conformidade com regulamentos', 'article', 20, 40),
      ],
      createAssessment('assess-iam-agreement-1', 'Exame: Compliance', 'Teste de conformidade', genericQuestions('q-agreement'), 70),
      createBossChallenge('boss-iam-agreement-1', 'Termo LGPD Compliant', 'Crie um termo de uso em conformidade com LGPD',
        '## Objetivo\nCrie um termo de uso que atenda aos requisitos da LGPD.\n\n## Requisitos\n1. Inclua todas as cláusulas obrigatórias\n2. Configure o fluxo de aceite\n3. Documente o processo\n\n## Entrega\nEnvie o termo configurado em formato JSON ou PDF.', 120)
    ),
  ]),
  createSubTrack('subtrack-iam-workspaces', 'Workspaces', 'Ambientes isolados e multi-tenancy', 'Building2', [
    createModule('mod-iam-workspaces-1', 'Arquitetura Multi-tenant', 'Conceitos de isolamento', 'Layers',
      [
        createLearningContent('lc-iam-workspaces-1', 'Multi-tenancy Explained', 'Conceitos avançados de isolamento', 'video', 20, 45),
        createLearningContent('lc-iam-workspaces-2', 'Enterprise Setup Guide', 'Guia de configuração enterprise', 'slides', 25, 50),
      ],
      createAssessment('assess-iam-workspaces-1', 'Exame: Multi-tenancy', 'Teste sobre arquitetura', genericQuestions('q-workspaces'), 85),
      createBossChallenge('boss-iam-workspaces-1', 'Enterprise Workspace', 'Configure um ambiente enterprise multi-tenant',
        '## Objetivo\nConfigure um workspace enterprise com isolamento completo.\n\n## Requisitos\n1. Crie a estrutura de tenants\n2. Configure o isolamento\n3. Valide a segregação\n\n## Entrega\nExporte a configuração em formato JSON ou ZIP.', 200)
    ),
  ]),
];

// eSignature Trail with new structure
const esignatureSubTracks: SubTrack[] = [
  createSubTrack('subtrack-esig-basic', 'Features Básicas', 'Funcionalidades essenciais de assinatura', 'PenTool', [
    createModule('mod-esig-basic-1', 'Assinatura Simples', 'Fluxo básico de assinatura eletrônica', 'Edit3',
      [
        createLearningContent('lc-esig-basic-1', 'Quick Start eSignature', 'Início rápido com eSignature', 'video', 12, 30),
        createLearningContent('lc-esig-basic-2', 'Enviando seu Primeiro Documento', 'Passo a passo do envio', 'article', 15, 25),
        createLearningContent('lc-esig-basic-3', 'Interface do Editor', 'Conhecendo o editor de documentos', 'video', 18, 35),
      ],
      createAssessment('assess-esig-basic-1', 'Exame Final: Features Básicas', 'Teste seus conhecimentos sobre eSignature com 20 questões', esigBasicQuestions, 250),
      createBossChallenge('boss-esig-basic-1', 'Crie um envio em massa utilizando DocGen', 'Demonstre domínio do DocGen criando um envio em massa completo',
        '## 🎯 Objetivo\nCrie um envio em massa utilizando o DocGen para demonstrar domínio das funcionalidades básicas do eSignature.\n\n## 📋 Requisitos\n\n### 1. Preparação do Template\n- Crie um template de contrato com pelo menos 3 campos dinâmicos\n- Inclua campos de assinatura, data e texto\n- Configure as tags de merge corretamente\n\n### 2. Dados para Envio em Massa\n- Prepare um arquivo CSV com no mínimo 10 destinatários\n- Inclua dados variáveis que serão mesclados no template\n- Valide o formato dos dados\n\n### 3. Configuração do Envio\n- Configure as opções de notificação\n- Defina a ordem de assinatura (se aplicável)\n- Configure expiração e lembretes\n\n### 4. Execução e Documentação\n- Execute o envio em massa\n- Documente os passos realizados\n- Capture evidências do processo\n\n## 📁 Formato de Entrega\nEnvie um arquivo ZIP contendo:\n- Template utilizado (JSON ou PDF)\n- Arquivo CSV com os dados\n- Screenshots ou relatório do envio\n- README com explicação do processo\n\n## ✅ Critérios de Avaliação\n- Correta configuração do template\n- Qualidade dos dados preparados\n- Uso adequado das funcionalidades do DocGen\n- Documentação clara do processo', 300)
    ),
    createModule('mod-esig-basic-2', 'Templates', 'Criação e uso de templates', 'FileCode',
      [
        createLearningContent('lc-esig-basic-4', 'Power of Templates', 'Por que usar templates', 'video', 18, 40),
        createLearningContent('lc-esig-basic-5', 'Template Design Best Practices', 'Melhores práticas de design', 'article', 20, 35),
        createLearningContent('lc-esig-basic-6', 'Advanced Template Features', 'Recursos avançados', 'slides', 15, 30),
      ],
      createAssessment('assess-esig-basic-2', 'Exame: Templates', 'Teste sobre criação de templates', genericQuestions('q-template'), 100),
      createBossChallenge('boss-esig-basic-2', 'Template Library', 'Crie uma biblioteca de templates profissionais',
        '## Objetivo\nCrie 3 templates profissionais reutilizáveis.\n\n## Requisitos\n1. Template de contrato de trabalho\n2. Template de NDA\n3. Template de proposta comercial\n\n## Entrega\nEnvie os templates em formato JSON ou ZIP.', 180)
    ),
  ]),
  createSubTrack('subtrack-esig-advanced-wf', 'Advanced Workflows', 'Fluxos avançados de assinatura', 'GitBranch', [
    createModule('mod-esig-adv-wf-1', 'Fluxos Sequenciais', 'Múltiplos signatários em ordem', 'ListOrdered',
      [
        createLearningContent('lc-esig-adv-1', 'Sequential Signing', 'Fluxos em cadeia explicados', 'video', 20, 45),
        createLearningContent('lc-esig-adv-2', 'Routing Strategies', 'Estratégias de roteamento', 'article', 25, 40),
      ],
      createAssessment('assess-esig-adv-1', 'Exame: Workflows', 'Teste sobre fluxos avançados', genericQuestions('q-adv'), 90),
      createBossChallenge('boss-esig-adv-1', 'Approval Hierarchy', 'Configure um fluxo de aprovação hierárquica',
        '## Objetivo\nCrie um fluxo de aprovação com múltiplos níveis hierárquicos.\n\n## Requisitos\n1. 3 níveis de aprovação\n2. Regras condicionais\n3. Notificações personalizadas\n\n## Entrega\nExporte a configuração em formato JSON.', 200)
    ),
  ]),
  createSubTrack('subtrack-esig-advanced-feat', 'Features Avançadas', 'Recursos avançados da plataforma', 'Sparkles', [
    createModule('mod-esig-adv-feat-1', 'Campos Inteligentes', 'Campos dinâmicos e condicionais', 'FormInput',
      [
        createLearningContent('lc-esig-feat-1', 'Dynamic Fields', 'Campos que se adaptam', 'video', 22, 50),
        createLearningContent('lc-esig-feat-2', 'Conditional Logic', 'Lógica condicional em formulários', 'article', 30, 45),
      ],
      createAssessment('assess-esig-feat-1', 'Exame: Smart Fields', 'Teste sobre campos inteligentes', genericQuestions('q-feat'), 100),
      createBossChallenge('boss-esig-feat-1', 'Smart Form', 'Crie um formulário inteligente completo',
        '## Objetivo\nDesenvolva um formulário com campos dinâmicos e lógica condicional.\n\n## Requisitos\n1. Campos que aparecem/desaparecem\n2. Validações customizadas\n3. Cálculos automáticos\n\n## Entrega\nExporte o formulário em formato JSON.', 220)
    ),
  ]),
  createSubTrack('subtrack-esig-admin', 'Ferramentas Administrativas', 'Gestão e configurações administrativas', 'Settings', [
    createModule('mod-esig-admin-1', 'Painel Administrativo', 'Configurações avançadas', 'SlidersHorizontal',
      [
        createLearningContent('lc-esig-admin-1', 'Admin Console Overview', 'Tour pelo painel administrativo', 'video', 18, 40),
        createLearningContent('lc-esig-admin-2', 'Best Practices Guide', 'Boas práticas de administração', 'article', 25, 35),
      ],
      createAssessment('assess-esig-admin-1', 'Exame: Administração', 'Teste de boas práticas', genericQuestions('q-admin'), 80),
      createBossChallenge('boss-esig-admin-1', 'Admin Setup', 'Configure um ambiente administrativo completo',
        '## Objetivo\nConfigure todas as opções administrativas de um ambiente.\n\n## Requisitos\n1. Políticas de segurança\n2. Configurações de branding\n3. Integrações\n\n## Entrega\nExporte as configurações em formato JSON.', 150)
    ),
  ]),
  createSubTrack('subtrack-esig-sso', 'SSO & Organization Management', 'Single Sign-On e gestão organizacional', 'Shield', [
    createModule('mod-esig-sso-1', 'Configuração de SSO', 'Integração com identity providers', 'Key',
      [
        createLearningContent('lc-esig-sso-1', 'SSO Deep Dive', 'Entenda SSO completamente', 'video', 25, 55),
        createLearningContent('lc-esig-sso-2', 'SAML vs OIDC', 'Comparação de protocolos', 'article', 20, 40),
      ],
      createAssessment('assess-esig-sso-1', 'Exame: SSO', 'Teste sobre autenticação', genericQuestions('q-sso'), 100),
      createBossChallenge('boss-esig-sso-1', 'SSO Integration', 'Configure integração SSO com um IdP',
        '## Objetivo\nConfigure a integração SSO com um Identity Provider.\n\n## Requisitos\n1. Configure SAML ou OIDC\n2. Teste o fluxo de login\n3. Documente a configuração\n\n## Entrega\nEnvie a configuração e documentação em formato ZIP.', 250)
    ),
    createModule('mod-esig-sso-2', 'Organization Management', 'Gestão de organizações', 'Building',
      [
        createLearningContent('lc-esig-org-1', 'Organizational Hierarchy', 'Estrutura de organizações', 'video', 22, 50),
        createLearningContent('lc-esig-org-2', 'Enterprise Rollout Guide', 'Guia de implantação', 'slides', 30, 45),
      ],
      createAssessment('assess-esig-org-1', 'Exame: Organizations', 'Teste sobre gestão organizacional', genericQuestions('q-org'), 90),
      createBossChallenge('boss-esig-org-1', 'Enterprise Rollout', 'Planeje e execute um rollout enterprise',
        '## Objetivo\nCrie um plano de rollout para uma organização enterprise.\n\n## Requisitos\n1. Plano de migração\n2. Estrutura organizacional\n3. Cronograma de implantação\n\n## Entrega\nEnvie o plano em formato JSON ou PDF.', 200)
    ),
  ]),
];

// Trails data
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

// Progress calculation helpers - use User type with optional extended properties
type ExtendedUser = User & { 
  completedAssessments?: string[]; 
  completedBossChallenges?: string[];
  assessmentScores?: Record<string, number>;
};

export function calculateModuleProgress(module: Module, user: ExtendedUser): { learning: number; assessment: boolean; boss: boolean } {
  const learningCompleted = module.learningContent.filter(lc => user.completedChallenges.includes(lc.id)).length;
  const learningTotal = module.learningContent.length;
  
  return {
    learning: learningTotal > 0 ? Math.round((learningCompleted / learningTotal) * 100) : 0,
    assessment: user.completedAssessments?.includes(module.assessment.id) || false,
    boss: user.completedBossChallenges?.includes(module.bossChallenge.id) || false,
  };
}

export function isLearningComplete(module: Module, user: ExtendedUser): boolean {
  return module.learningContent.every(lc => user.completedChallenges.includes(lc.id));
}

export function isAssessmentUnlocked(module: Module, user: ExtendedUser): boolean {
  return isLearningComplete(module, user);
}

export function isBossChallengeUnlocked(module: Module, user: ExtendedUser): boolean {
  return user.completedAssessments?.includes(module.assessment.id) || false;
}

export function isModuleComplete(module: Module, user: ExtendedUser): boolean {
  return user.completedBossChallenges?.includes(module.bossChallenge.id) || false;
}

export function calculateSubTrackProgress(subTrack: SubTrack, user: ExtendedUser): number {
  const totalModules = subTrack.modules.length;
  const completedModules = subTrack.modules.filter(mod => isModuleComplete(mod, user)).length;
  return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
}

export function calculateTrailProgress(trail: Trail, user: ExtendedUser): number {
  const totalModules = trail.subTracks.reduce((sum, st) => sum + st.modules.length, 0);
  const completedModules = trail.subTracks.reduce(
    (sum, st) => sum + st.modules.filter(mod => isModuleComplete(mod, user)).length,
    0
  );
  return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
}

export function getRecommendedChallenge(user: ExtendedUser): LearningContent | null {
  for (const trail of trails) {
    for (const subTrack of trail.subTracks) {
      for (const module of subTrack.modules) {
        for (const content of module.learningContent) {
          if (!user.completedChallenges.includes(content.id)) {
            return content;
          }
        }
      }
    }
  }
  return null;
}

export function getTotalXpAvailable(): number {
  return trails.reduce((sum, trail) => sum + trail.xpReward, 0);
}

export function getOverallProgress(user: ExtendedUser): number {
  const totalXp = getTotalXpAvailable();
  return totalXp > 0 ? Math.round((user.xp / totalXp) * 100) : 0;
}

// Export the ExtendedUser type for use in other files
export type { ExtendedUser };
