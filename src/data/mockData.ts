import {
  User,
  Trail,
  Badge,
  SubTrack,
  LearningContent,
  Assessment,
  BossChallenge,
  QuizQuestion,
  Module,
  PracticalChallenge,
  OptionalLearning,
  ChallengeMedal,
  LocalizedText,
} from "@/types/learning";

// Current user mock - includes completed assessments and boss challenges
export const currentUser: User & {
  completedAssessments: string[];
  completedBossChallenges: string[];
  assessmentScores: Record<string, number>;
} = {
  id: "user-1",
  name: "Rodrigo Pecanha",
  email: "rodrigo.pecanha@docusign.com",
  role: "admin",
  level: "Legionário",
  xp: 2800,
  xpToNextLevel: 4000,
  badges: ["badge-1", "badge-2", "badge-3", "badge-4"],
  completedChallenges: ["lc-iam-nav-1", "lc-iam-nav-2", "lc-iam-nav-3", "lc-iam-nav-4", "lc-iam-nav-5", "lc-iam-maestro-1", "lc-iam-maestro-2", "prac-esig-1", "prac-esig-2", "prac-api-basic-1"],
  completedLessons: [],
  completedModules: ["mod-iam-nav-1", "mod-iam-nav-2"],
  completedTrails: [],
  completedAssessments: ["assess-iam-nav-1", "assess-iam-nav-2"],
  completedBossChallenges: ["boss-iam-nav-1", "boss-iam-nav-2"],
  assessmentScores: { "assess-iam-nav-1": 85, "assess-iam-nav-2": 92 },
  currentStreak: 7,
  longestStreak: 14,
  joinedAt: "2024-01-15",
};

// All users for admin view
export const allUsers: (User & {
  completedAssessments?: string[];
  completedBossChallenges?: string[];
  assessmentScores?: Record<string, number>;
})[] = [
  currentUser,
  {
    id: "user-2",
    name: "Grace Ifendu",
    email: "grace.ifendu@docusign.com",
    role: "sc",
    level: "Recruta",
    xp: 0,
    xpToNextLevel: 500,
    badges: [],
    completedChallenges: [],
    completedLessons: [],
    completedModules: [],
    completedTrails: [],
    completedAssessments: [],
    completedBossChallenges: [],
    currentStreak: 0,
    longestStreak: 0,
    joinedAt: "2024-02-01",
  },
  {
    id: "user-3",
    name: "Ralph Brinker",
    email: "ralph.brinker@docusign.com",
    role: "sc",
    level: "Recruta",
    xp: 0,
    xpToNextLevel: 500,
    badges: [],
    completedChallenges: [],
    completedLessons: [],
    completedModules: [],
    completedTrails: [],
    completedAssessments: [],
    completedBossChallenges: [],
    currentStreak: 0,
    longestStreak: 0,
    joinedAt: "2023-11-10",
  },
  {
    id: "user-4",
    name: "Erick Costa",
    email: "erick.costa@docusign.com",
    role: "sc",
    level: "Recruta",
    xp: 0,
    xpToNextLevel: 500,
    badges: [],
    completedChallenges: [],
    completedLessons: [],
    completedModules: [],
    completedTrails: [],
    completedAssessments: [],
    completedBossChallenges: [],
    currentStreak: 0,
    longestStreak: 0,
    joinedAt: "2024-01-20",
  },
  {
    id: "user-5",
    name: "Nathan Gardin",
    email: "nathan.gardin@docusign.com",
    role: "sc",
    level: "Centurião",
    xp: 4500,
    xpToNextLevel: 6000,
    badges: ["badge-1", "badge-2", "badge-3", "badge-4", "badge-6"],
    completedChallenges: ["lc-iam-nav-1", "lc-iam-nav-2", "lc-iam-nav-3", "lc-iam-nav-4", "lc-iam-nav-5", "lc-iam-maestro-1", "lc-iam-maestro-2", "lc-iam-agreement-1", "lc-iam-agreement-2", "prac-esig-1", "prac-esig-2", "prac-esig-3", "prac-api-basic-1"],
    completedLessons: [],
    completedModules: ["mod-iam-nav-1", "mod-iam-nav-2", "mod-iam-maestro-1"],
    completedTrails: [],
    completedAssessments: ["assess-iam-nav-1", "assess-iam-nav-2", "assess-iam-maestro-1"],
    completedBossChallenges: ["boss-iam-nav-1", "boss-iam-nav-2", "boss-iam-maestro-1"],
    currentStreak: 12,
    longestStreak: 18,
    joinedAt: "2023-06-01",
  },
];

// Badges
export const badges: Badge[] = [
  {
    id: "badge-1",
    name: "First Step",
    description: "Complete your first challenge",
    icon: "🚀",
    category: "achievement",
    xpReward: 50,
  },
  {
    id: "badge-2",
    name: "eSign",
    description: "Complete a trilha eSignature",
    icon: "✍️",
    category: "completion",
    xpReward: 250,
  },
  {
    id: "badge-3",
    name: "Maestro",
    description: "Domine o Maestro completamente",
    icon: "workflow",
    category: "skill",
    xpReward: 200,
  },
  {
    id: "badge-4",
    name: "Agreement Desk",
    description: "Complete os desafios de Agreement Desk",
    icon: "📋",
    category: "completion",
    xpReward: 200,
  },
  {
    id: "badge-5",
    name: "CLM",
    description: "Domine o Contract Lifecycle Management",
    icon: "📄",
    category: "completion",
    xpReward: 250,
  },
  {
    id: "badge-6",
    name: "API Master",
    description: "Master the API track",
    icon: "🔥",
    category: "achievement",
    xpReward: 100,
  },
  {
    id: "badge-7",
    name: "Challenge Gladiator",
    description: "Complete 10 desafios práticos",
    icon: "⚔️",
    category: "achievement",
    xpReward: 300,
  },
  {
    id: "badge-8",
    name: "SC Elite",
    description: "Alcance o nível Imperator",
    icon: "👑",
    category: "special",
    xpReward: 500,
  },
];

// Helper functions
const createLearningContent = (
  id: string,
  title: string,
  description: string,
  type: LearningContent["type"],
  duration: number,
  xp: number,
): LearningContent => ({
  id,
  title,
  description,
  type,
  duration,
  xpReward: xp,
});

const createQuizQuestion = (id: string, question: string, options: string[], correctAnswer: number): QuizQuestion => ({
  id,
  question,
  options,
  correctAnswer,
});

const createAssessment = (
  id: string,
  title: string,
  description: string,
  questions: QuizQuestion[],
  xp: number,
): Assessment => ({
  id,
  title,
  description,
  questions,
  passingScore: 70,
  xpReward: xp,
});

const createBossChallenge = (
  id: string,
  title: string,
  description: string,
  instructions: string,
  xp: number,
): BossChallenge => ({
  id,
  title,
  description,
  instructions,
  acceptedFormats: ["json", "zip"],
  xpReward: xp,
});

const createModule = (
  id: string,
  title: LocalizedText,
  description: LocalizedText,
  icon: string,
  learningContent: LearningContent[],
  assessment: Assessment,
  bossChallenge: BossChallenge,
): Module => ({
  id,
  title,
  description,
  icon,
  learningContent,
  assessment,
  bossChallenge,
  xpReward: learningContent.reduce((sum, l) => sum + l.xpReward, 0) + assessment.xpReward + bossChallenge.xpReward,
});

const createChallengeBasedModule = (
  id: string,
  title: LocalizedText,
  description: LocalizedText,
  icon: string,
  optionalLearning: OptionalLearning[],
  practicalChallenges: PracticalChallenge[],
): Module => ({
  id,
  title,
  description,
  icon,
  learningContent: [],
  assessment: { id: "", title: "", description: "", questions: [], passingScore: 0, xpReward: 0 },
  bossChallenge: { id: "", title: "", description: "", instructions: "", acceptedFormats: [], xpReward: 0 },
  isChallengeBased: true,
  optionalLearning,
  practicalChallenges,
  xpReward:
    optionalLearning.reduce((sum, l) => sum + l.xpReward, 0) +
    practicalChallenges.reduce((sum, c) => sum + c.xpReward, 0),
});

// Helper to create localized text (pt-BR required, en-US optional fallback)
const localized = (ptBR: string, enUS?: string): LocalizedText => ({
  'pt-BR': ptBR,
  'en-US': enUS,
});

const createPracticalChallenge = (
  id: string,
  title: LocalizedText,
  description: LocalizedText,
  instructions: LocalizedText,
  medals: ChallengeMedal[],
  xpReward: number,
  isFinal = false,
  isSubmitted = false,
): PracticalChallenge => ({
  id,
  title,
  description,
  instructions,
  medals,
  acceptedFormats: ["json"],
  xpReward,
  isFinalChallenge: isFinal,
  isSubmitted,
});

const createMedal = (id: string, icon: string, name: LocalizedText, description?: LocalizedText): ChallengeMedal => ({
  id,
  icon,
  name,
  description,
});

const createOptionalLearning = (
  id: string,
  title: LocalizedText,
  description: LocalizedText,
  type: OptionalLearning["type"],
  duration: number,
  xpReward: number,
): OptionalLearning => ({
  id,
  title,
  description,
  type,
  duration,
  xpReward,
});

const createSubTrack = (
  id: string,
  title: LocalizedText,
  description: LocalizedText,
  icon: string,
  modules: Module[],
  status: SubTrack['status'] = 'active',
): SubTrack => ({
  id,
  title,
  description,
  icon,
  modules,
  xpReward: modules.reduce((sum, m) => sum + m.xpReward, 0),
  status,
});

// eSignature Features Básicas - 20 exam questions
const esigBasicQuestions: QuizQuestion[] = [
  createQuizQuestion(
    "q-esig-1",
    "O que é uma assinatura eletrônica?",
    [
      "Apenas uma imagem da assinatura",
      "Um método legal de consentimento digital",
      "Uma senha de acesso",
      "Um tipo de criptografia",
    ],
    1,
  ),
  createQuizQuestion(
    "q-esig-2",
    "Qual a diferença entre assinatura eletrônica e digital?",
    [
      "São a mesma coisa",
      "Digital usa certificado, eletrônica é mais ampla",
      "Eletrônica é mais segura",
      "Digital não é válida legalmente",
    ],
    1,
  ),
  createQuizQuestion(
    "q-esig-3",
    "O que é DocGen?",
    ["Um gerador de documentos", "Ferramenta de envio em massa", "Sistema de templates", "Todas as anteriores"],
    3,
  ),
  createQuizQuestion(
    "q-esig-4",
    "Quantos signatários podem ser adicionados em um envelope?",
    ["Apenas 1", "Até 5", "Até 10", "Ilimitado"],
    3,
  ),
  createQuizQuestion(
    "q-esig-5",
    "O que é um template no eSignature?",
    ["Modelo reutilizável de documento", "Tipo de assinatura", "Formato de arquivo", "Nenhuma das anteriores"],
    0,
  ),
  createQuizQuestion(
    "q-esig-6",
    "Qual formato de arquivo é suportado para upload?",
    ["PDF apenas", "PDF e Word", "PDF, Word e imagens", "Todos os formatos"],
    2,
  ),
  createQuizQuestion(
    "q-esig-7",
    "O que acontece após o último signatário assinar?",
    ["O documento é deletado", "O envelope é concluído", "Precisa de aprovação manual", "O documento expira"],
    1,
  ),
  createQuizQuestion(
    "q-esig-8",
    "O que é Certificate of Completion?",
    ["Certificado de treinamento", "Prova legal de assinatura", "Relatório de uso", "Badge do sistema"],
    1,
  ),
  createQuizQuestion(
    "q-esig-9",
    "Como funciona a notificação aos signatários?",
    ["Apenas por email", "Email e SMS", "Email, SMS e push", "Não há notificação"],
    1,
  ),
  createQuizQuestion(
    "q-esig-10",
    "O que é um campo de assinatura?",
    ["Local onde o signatário assina", "Tipo de documento", "Formato de exportação", "Configuração de segurança"],
    0,
  ),
  createQuizQuestion(
    "q-esig-11",
    "Qual a validade legal de documentos assinados eletronicamente?",
    ["Não tem validade", "Apenas para contratos simples", "Equivalente a assinatura física", "Depende do país"],
    2,
  ),
  createQuizQuestion(
    "q-esig-12",
    "O que é envelope routing?",
    ["Ordem de assinatura", "Tipo de criptografia", "Método de envio", "Formato de arquivo"],
    0,
  ),
  createQuizQuestion(
    "q-esig-13",
    "Como adicionar campos obrigatórios em um documento?",
    ["Não é possível", "Através do editor de templates", "Apenas via API", "Por email"],
    1,
  ),
  createQuizQuestion(
    "q-esig-14",
    "O que é bulk send?",
    ["Envio para múltiplos destinatários", "Envio de arquivos grandes", "Backup de documentos", "Sincronização"],
    0,
  ),
  createQuizQuestion(
    "q-esig-15",
    "Qual é a função do audit trail?",
    ["Rastrear todas as ações no documento", "Deletar documentos antigos", "Comprimir arquivos", "Enviar notificações"],
    0,
  ),
  createQuizQuestion(
    "q-esig-16",
    "O que é uma signing group?",
    ["Grupo de templates", "Grupo de signatários intercambiáveis", "Configuração de admin", "Tipo de relatório"],
    1,
  ),
  createQuizQuestion(
    "q-esig-17",
    "Como funciona a expiração de envelopes?",
    ["Documentos nunca expiram", "Configurável por envelope", "Sempre 30 dias", "Apenas para trials"],
    1,
  ),
  createQuizQuestion(
    "q-esig-18",
    "O que é recipient authentication?",
    ["Verificação de identidade do signatário", "Login do admin", "Criptografia de arquivo", "Backup de dados"],
    0,
  ),
  createQuizQuestion(
    "q-esig-19",
    "Qual a função de campos de texto em templates?",
    ["Coletar informações adicionais", "Apenas decoração", "Assinatura alternativa", "Nenhuma"],
    0,
  ),
  createQuizQuestion(
    "q-esig-20",
    "O que acontece com documentos completados?",
    ["São deletados", "Ficam disponíveis para download", "Precisam ser aprovados", "Expiram em 24h"],
    1,
  ),
];

// Generic questions for other modules
const genericQuestions = (prefix: string) => [
  createQuizQuestion(
    `${prefix}-1`,
    "Qual o principal objetivo desta ferramenta?",
    ["Automatizar processos", "Criar documentos", "Enviar emails", "Fazer backup"],
    0,
  ),
  createQuizQuestion(
    `${prefix}-2`,
    "Qual a melhor prática ao configurar o sistema?",
    ["Seguir a documentação oficial", "Usar configurações padrão", "Ignorar avisos", "Desativar logs"],
    0,
  ),
];

// IAM optional learning for support content
const iamNavigatorOptionalLearning: OptionalLearning[] = [
  createOptionalLearning(
    "opt-iam-nav-1",
    localized("Introdução ao IAM", "Introduction to IAM"),
    localized("Conceitos fundamentais de gestão de identidades", "Fundamental identity management concepts"),
    "video",
    10,
    10,
  ),
];

const iamMaestroOptionalLearning: OptionalLearning[] = [
  createOptionalLearning(
    "opt-iam-maestro-1",
    localized("Orquestração 101", "Orchestration 101"),
    localized("Conceitos básicos de orquestração de identidades", "Basic identity orchestration concepts"),
    "video",
    12,
    10,
  ),
];

const iamAgreementOptionalLearning: OptionalLearning[] = [
  createOptionalLearning(
    "opt-iam-agree-1",
    localized("Compliance Overview", "Compliance Overview"),
    localized("Visão geral de conformidade e termos", "Overview of compliance and terms"),
    "video",
    10,
    10,
  ),
];

const iamWorkspacesOptionalLearning: OptionalLearning[] = [
  createOptionalLearning(
    "opt-iam-ws-1",
    localized("Multi-tenancy Basics", "Multi-tenancy Basics"),
    localized("Conceitos de multi-tenancy e isolamento", "Multi-tenancy and isolation concepts"),
    "video",
    10,
    10,
  ),
];

// IAM Trail Modules
const iamSubTracks: SubTrack[] = [
  createSubTrack("subtrack-iam-navigator", localized("Navigator", "Navigator"), localized("Domine o Navigator para gestão de identidades", "Master Navigator for identity management"), "Compass", [
    createModule(
      "mod-iam-nav-1",
      localized("Introdução ao Navigator", "Introduction to Navigator"),
      localized("Fundamentos e interface do Navigator", "Navigator fundamentals and interface"),
      "Layout",
      [
        createLearningContent("lc-iam-nav-1", "Tour pelo Navigator", "Conheça a interface completa", "video", 15, 40),
        createLearningContent("lc-iam-nav-2", "Conceitos Fundamentais", "Entenda os conceitos base", "article", 20, 30),
        createLearningContent("lc-iam-nav-3", "Arquitetura do Sistema", "Slides sobre a arquitetura", "slides", 10, 25),
      ],
      createAssessment(
        "assess-iam-nav-1",
        "Exame: Introdução ao Navigator",
        "Teste seus conhecimentos sobre o Navigator",
        genericQuestions("q-nav"),
        100,
      ),
      createBossChallenge(
        "boss-iam-nav-1",
        "Configure um Ambiente Navigator",
        "Crie e configure um ambiente Navigator completo do zero",
        "## Objetivo\nConfigure um ambiente Navigator funcional seguindo as melhores práticas.\n\n## Requisitos\n1. Crie a estrutura de usuários\n2. Configure as permissões básicas\n3. Documente as configurações\n\n## Entrega\nExporte a configuração em formato JSON ou ZIP contendo os arquivos de configuração.",
        150,
      ),
    ),
    createModule(
      "mod-iam-nav-2",
      localized("Gestão de Usuários", "User Management"),
      localized("Criação e gerenciamento de usuários", "User creation and management"),
      "Users",
      [
        createLearningContent(
          "lc-iam-nav-4",
          "Gerenciamento de Usuários",
          "Operações básicas com usuários",
          "video",
          25,
          50,
        ),
        createLearningContent(
          "lc-iam-nav-5",
          "Bulk Import Guide",
          "Como importar usuários em massa",
          "article",
          15,
          35,
        ),
      ],
      createAssessment(
        "assess-iam-nav-2",
        "Exame: Gestão de Usuários",
        "Teste sobre operações de usuários",
        genericQuestions("q-nav-user"),
        80,
      ),
      createBossChallenge(
        "boss-iam-nav-2",
        "Onboarding em Massa",
        "Realize o onboarding de 100 usuários fictícios",
        "## Objetivo\nCrie um processo de onboarding automatizado para 100 usuários.\n\n## Requisitos\n1. Prepare um arquivo CSV com os dados\n2. Execute o import\n3. Valide os resultados\n\n## Entrega\nEnvie o arquivo CSV utilizado e o relatório de importação.",
        200,
      ),
    ),
  ]),
  createSubTrack("subtrack-iam-maestro", localized("Maestro", "Maestro"), localized("Orquestração avançada de identidades", "Advanced identity orchestration"), "Wand2", [
    createModule(
      "mod-iam-maestro-1",
      localized("Automação de Provisionamento", "Provisioning Automation"),
      localized("Workflows automáticos", "Automated workflows"),
      "Workflow",
      [
        createLearningContent(
          "lc-iam-maestro-1",
          "Introdução ao Maestro",
          "Conceitos fundamentais de orquestração",
          "video",
          20,
          50,
        ),
        createLearningContent(
          "lc-iam-maestro-2",
          "Criando Workflows",
          "Passo a passo para criar workflows",
          "article",
          25,
          40,
        ),
      ],
      createAssessment(
        "assess-iam-maestro-1",
        "Exame: Automação",
        "Teste sobre workflows",
        genericQuestions("q-maestro"),
        90,
      ),
      createBossChallenge(
        "boss-iam-maestro-1",
        "Workflow de Provisionamento",
        "Crie um workflow completo de provisionamento",
        "## Objetivo\nDesenvolva um workflow que automatize o provisionamento de novos colaboradores.\n\n## Requisitos\n1. Defina os triggers\n2. Configure as ações\n3. Teste o fluxo\n\n## Entrega\nExporte o workflow em formato JSON.",
        180,
      ),
    ),
  ]),
  createSubTrack("subtrack-iam-agreement", localized("Agreement Desk", "Agreement Desk"), localized("Gestão de termos e consentimentos", "Terms and consent management"), "FileCheck", [
    createModule(
      "mod-iam-agreement-1",
      localized("Termos de Uso", "Terms of Use"),
      localized("Configuração de termos", "Terms configuration"),
      "FileText",
      [
        createLearningContent(
          "lc-iam-agreement-1",
          "Agreement Desk Overview",
          "Visão geral da ferramenta",
          "video",
          15,
          35,
        ),
        createLearningContent(
          "lc-iam-agreement-2",
          "Compliance e LGPD",
          "Conformidade com regulamentos",
          "article",
          20,
          40,
        ),
      ],
      createAssessment(
        "assess-iam-agreement-1",
        "Exame: Compliance",
        "Teste de conformidade",
        genericQuestions("q-agreement"),
        70,
      ),
      createBossChallenge(
        "boss-iam-agreement-1",
        "Termo LGPD Compliant",
        "Crie um termo de uso em conformidade com LGPD",
        "## Objetivo\nCrie um termo de uso que atenda aos requisitos da LGPD.\n\n## Requisitos\n1. Inclua todas as cláusulas obrigatórias\n2. Configure o fluxo de aceite\n3. Documente o processo\n\n## Entrega\nEnvie o termo configurado em formato JSON ou PDF.",
        120,
      ),
    ),
  ]),
  createSubTrack("subtrack-iam-workspaces", localized("Workspaces", "Workspaces"), localized("Ambientes isolados e multi-tenancy", "Isolated environments and multi-tenancy"), "Building2", [
    createModule(
      "mod-iam-workspaces-1",
      localized("Arquitetura Multi-tenant", "Multi-tenant Architecture"),
      localized("Conceitos de isolamento", "Isolation concepts"),
      "Layers",
      [
        createLearningContent(
          "lc-iam-workspaces-1",
          "Multi-tenancy Explained",
          "Conceitos avançados de isolamento",
          "video",
          20,
          45,
        ),
        createLearningContent(
          "lc-iam-workspaces-2",
          "Enterprise Setup Guide",
          "Guia de configuração enterprise",
          "slides",
          25,
          50,
        ),
      ],
      createAssessment(
        "assess-iam-workspaces-1",
        "Exame: Multi-tenancy",
        "Teste sobre arquitetura",
        genericQuestions("q-workspaces"),
        85,
      ),
      createBossChallenge(
        "boss-iam-workspaces-1",
        "Enterprise Workspace",
        "Configure um ambiente enterprise multi-tenant",
        "## Objetivo\nConfigure um workspace enterprise com isolamento completo.\n\n## Requisitos\n1. Crie a estrutura de tenants\n2. Configure o isolamento\n3. Valide a segregação\n\n## Entrega\nExporte a configuração em formato JSON ou ZIP.",
        200,
      ),
    ),
  ]),
];

// Attach optional learning to IAM modules for Support Content sections
iamSubTracks[0].modules[0].optionalLearning = iamNavigatorOptionalLearning;
iamSubTracks[0].modules[1].optionalLearning = iamNavigatorOptionalLearning;
iamSubTracks[1].modules[0].optionalLearning = iamMaestroOptionalLearning;
iamSubTracks[2].modules[0].optionalLearning = iamAgreementOptionalLearning;
iamSubTracks[3].modules[0].optionalLearning = iamWorkspacesOptionalLearning;

// eSignature Trail with new structure - Features Básicas is now challenge-based
const esigBasicChallenges: PracticalChallenge[] = [
  createPracticalChallenge(
    "prac-esig-1",
    localized(
      "Crie um Modelo de envelope com multicanais e validação de identidade",
      "Create an Envelope Template with multi-channel delivery and identity validation"
    ),
    localized(
      "Configure um envelope completo com entrega multicanal, autenticação reforçada e campos interativos para os signatários.",
      "Configure a complete envelope with multi-channel delivery, enhanced authentication, and interactive fields for signers."
    ),
    localized(
      "## 🎯 Objetivo\nModelo de Envelope com:\n- Entrega multicanal (Email + Whatsapp ou SMS)\n- Autenticação do signatário\n- Campos de interação\n\n## 📋 Requisitos\n\n### 1. Configuração de Entrega\n- Configure entrega por Email + SMS ou Whatsapp\n- Defina lembretes automáticos\n\n### 2. Segurança\n- Adicione pelo menos 2 camadas de autenticação\n- Configure verificação de identidade\n\n### 3. Campos Interativos\n- Inclua campos de texto editáveis\n- Adicione checkboxes ou radio buttons\n- Configure campos obrigatórios\n\n## 📁 Entrega\nExporte o template do envelope em formato JSON.",
      "## 🎯 Objective\nEnvelope Template with:\n- Multi-channel delivery (Email + WhatsApp or SMS)\n- Signer authentication\n- Interactive fields\n\n## 📋 Requirements\n\n### 1. Delivery Configuration\n- Configure delivery via Email + SMS or WhatsApp\n- Set up automatic reminders\n\n### 2. Security\n- Add at least 2 authentication layers\n- Configure identity verification\n\n### 3. Interactive Fields\n- Include editable text fields\n- Add checkboxes or radio buttons\n- Configure required fields\n\n## 📁 Delivery\nExport the envelope template in JSON format."
    ),
    [
      createMedal("medal-1", "🎖️", localized("Código de Acesso", "Access Code"), localized("Usou código de acesso para autenticação", "Used access code for authentication")),
      createMedal("medal-2", "🎖️", localized("Liveness", "Liveness"), localized("Implementou verificação de liveness", "Implemented liveness verification")),
    ],
    150,
    false,
    true, // isSubmitted - unlocks second challenge
  ),
  createPracticalChallenge(
    "prac-esig-2",
    localized(
      "Prepare um Modelo que valide a formatação dos dados do signatário",
      "Prepare a Template that validates signer data formatting"
    ),
    localized(
      "Crie um template com validações de formato para garantir que os dados inseridos pelo signatário estejam corretos.",
      "Create a template with format validations to ensure the data entered by the signer is correct."
    ),
    localized(
      "## 🎯 Objetivo\nDefina validações de campo para seu destinatário\n\n## 📋 Requisitos de Validação\n\n### Campos Obrigatórios\n1. **CPF** - Validação de formato XXX.XXX.XXX-XX\n2. **CNPJ** - Validação de formato XX.XXX.XXX/XXXX-XX\n3. **Data de nascimento** - Formato DD/MM/AAAA\n4. **Uma Marca** criada de acordo com as cores do logotipo do cliente\n\n## 💡 Dicas\n- Use expressões regulares (regex) para validações\n- Configure mensagens de erro claras\n- Teste as validações antes de exportar\n\n## 📁 Entrega\nExporte o template com as validações configuradas em formato JSON.",
      "## 🎯 Objective\nDefine field validations for your recipient\n\n## 📋 Validation Requirements\n\n### Required Fields\n1. **SSN/Tax ID** - Format validation XXX.XXX.XXX-XX\n2. **Company ID** - Format validation XX.XXX.XXX/XXXX-XX\n3. **Date of birth** - Format DD/MM/YYYY\n4. **A Brand** created according to the client's logo colors\n\n## 💡 Tips\n- Use regular expressions (regex) for validations\n- Configure clear error messages\n- Test validations before exporting\n\n## 📁 Delivery\nExport the template with configured validations in JSON format."
    ),
    [
      createMedal("medal-3", "🎖️", localized("Regex correto", "Correct Regex"), localized("Implementou regex personalizado funcionando", "Implemented working custom regex")),
      createMedal("medal-3b", "🎖️", localized("Brand aplicada", "Brand Applied"), localized("Aplicou a marca com as cores do cliente", "Applied brand with client colors"))
    ],
    200,
  ),
  createPracticalChallenge(
    "prac-esig-3",
    localized(
      "Construa um Modelo populado por Webform",
      "Build a Template populated by Webform"
    ),
    localized(
      "Crie um modelo e faça com que ele seja populado através de um formulário. Após, envie um envelope para um segundo destinatário validar os dados e assinar.",
      "Create a template and have it populated through a form. Then, send an envelope to a second recipient to validate the data and sign."
    ),
    localized(
      "## 🎯 Objetivo\nModelo precisa conter pelo menos:\n- Nome e email do destinatário\n- Mostrar no 'Assunto' do envelope o nome do primeiro destinatário\n- Utilizar mais de uma página para simplificar a experiência do destinatário\n\n## 📋 Requisitos\n\n### 1. Dados do Destinatário\n- O modelo precisa conter pelo menos nome e email do destinatário\n\n### 2. Webform\n- Webform deve popular os dados do primeiro destinatário\n- Configure no mínimo 2 destinatários no fluxo\n\n### 3. Assunto Dinâmico\n- O 'Assunto' do envelope deve conter o nome do primeiro signatário (preenchedor do Webform)\n\n## 📁 Entrega\nExporte o template e o webform em formato JSON.",
      "## 🎯 Objective\nThe template must contain at least:\n- Recipient name and email\n- Show the first recipient's name in the envelope 'Subject'\n- Use more than one page to simplify the recipient's experience\n\n## 📋 Requirements\n\n### 1. Recipient Data\n- The template must contain at least recipient name and email\n\n### 2. Webform\n- Webform must populate the first recipient's data\n- Configure at least 2 recipients in the flow\n\n### 3. Dynamic Subject\n- The envelope 'Subject' must contain the first signer's name (Webform filler)\n\n## 📁 Delivery\nExport the template and webform in JSON format."
    ),
    [
      createMedal("medal-webform-1", "🎖️", localized("Webform Configurado", "Webform Configured"), localized("Configurou o webform corretamente para popular o modelo", "Configured webform correctly to populate the template")),
      createMedal("medal-webform-2", "🎖️", localized("Assunto Dinâmico", "Dynamic Subject"), localized("O assunto do envelope mostra o nome do primeiro destinatário", "The envelope subject shows the first recipient's name")),
    ],
    175,
  ),
  createPracticalChallenge(
    "prac-esig-final",
    localized(
      "DESAFIO FINAL: Construa um modelo baseado no documento em anexo (use case de RH), onde o salário deverá mudar de acordo com o cargo",
      "FINAL CHALLENGE: Build a template based on the attached document (HR use case), where the salary should change according to the position"
    ),
    localized(
      "Este é o desafio final do módulo. Demonstre domínio completo criando um template de RH com campos condicionais e dinâmicos.",
      "This is the module's final challenge. Demonstrate complete mastery by creating an HR template with conditional and dynamic fields."
    ),
    localized(
      "## 🏆 DESAFIO FINAL\n\n### Contexto\nVocê foi solicitado a criar um template de contrato de trabalho para o departamento de RH. O template deve ser inteligente o suficiente para adaptar o salário automaticamente baseado no cargo selecionado.\n\n## 📋 Requisitos\n\n### 1. Campos do Colaborador\n- Nome completo\n- CPF com validação\n- Data de admissão\n- Departamento\n\n### 2. Campo de Cargo (Obrigatório)\nCrie um campo dropdown com os seguintes cargos:\n- Analista Jr - R$ 4.000\n- Analista Pleno - R$ 6.500\n- Analista Sr - R$ 9.000\n- Coordenador - R$ 12.000\n- Gerente - R$ 18.000\n\n### 3. Campo de Salário Condicional\n- O valor do salário deve mudar automaticamente baseado no cargo selecionado\n- Use lógica condicional para mostrar/ocultar benefícios específicos por nível\n\n### 4. Campos Adicionais (para medalhas)\n- Campo de anexo para documentos do colaborador\n- Campo de Rúbrica posicionado automaticamente em todas as páginas\n- Campos de aprovação para RH e Gestor\n\n## 📁 Formato de Entrega\nEnvie um arquivo JSON contendo:\n- Template completo do contrato\n- Configurações de campos condicionais\n- Documentação das regras aplicadas\n\n## ✅ Critérios de Avaliação\n- Funcionamento correto da lógica condicional\n- Usabilidade do template\n- Qualidade da documentação",
      "## 🏆 FINAL CHALLENGE\n\n### Context\nYou have been asked to create an employment contract template for the HR department. The template must be smart enough to automatically adapt the salary based on the selected position.\n\n## 📋 Requirements\n\n### 1. Employee Fields\n- Full name\n- Tax ID with validation\n- Start date\n- Department\n\n### 2. Position Field (Required)\nCreate a dropdown field with the following positions:\n- Jr Analyst - $4,000\n- Mid Analyst - $6,500\n- Sr Analyst - $9,000\n- Coordinator - $12,000\n- Manager - $18,000\n\n### 3. Conditional Salary Field\n- The salary value must change automatically based on the selected position\n- Use conditional logic to show/hide level-specific benefits\n\n### 4. Additional Fields (for medals)\n- Attachment field for employee documents\n- Initial field automatically positioned on all pages\n- Approval fields for HR and Manager\n\n## 📁 Delivery Format\nSubmit a JSON file containing:\n- Complete contract template\n- Conditional field configurations\n- Documentation of applied rules\n\n## ✅ Evaluation Criteria\n- Correct functioning of conditional logic\n- Template usability\n- Documentation quality"
    ),
    [
      createMedal("medal-4", "🎖️", localized("Campo Anexo", "Attachment Field"), localized("Incluiu campo para upload de documentos", "Included field for document upload")),
      createMedal("medal-5", "🎖️", localized("Rubrica", "Initial"), localized("Implementou campo de desenho/rubrica", "Implemented drawing/initial field")),
      createMedal("medal-6", "🎖️", localized("Campo Radio Button", "Radio Button Field"), localized("Usou radio buttons corretamente", "Used radio buttons correctly")),
      createMedal("medal-7", "🎖️", localized("Campo Condicional", "Conditional Field"), localized("Implementou lógica condicional funcionando", "Implemented working conditional logic")),
      createMedal("medal-8", "🎖️", localized("Campo Aprovar", "Approve Field"), localized("Incluiu fluxo de aprovação", "Included approval flow")),
    ],
    350,
    true, // isFinalChallenge
  ),
];

const esigBasicOptionalLearning: OptionalLearning[] = [
  {
    id: "opt-esig-course-1",
    title: localized("Curso DSU – Send Agreements", "DSU Course – Send Agreements"),
    description: localized("Curso oficial sobre envio de contratos na plataforma", "Official course on sending agreements on the platform"),
    type: "course",
    duration: 60,
    xpReward: 30,
    url: "https://dsucustomers.docusign.com/path/send-agreements",
  },
  createOptionalLearning(
    "opt-esig-1",
    localized("Visão Geral das Features", "Features Overview"),
    localized("Conheça as principais funcionalidades do eSignature", "Learn about the main eSignature features"),
    "video",
    15,
    20,
  ),
  createOptionalLearning(
    "opt-esig-2",
    localized("Campos e Validações", "Fields and Validations"),
    localized("Como funcionam os campos e validações", "How fields and validations work"),
    "video",
    12,
    15,
  ),
  createOptionalLearning(
    "opt-esig-3",
    localized("Lógica Condicional", "Conditional Logic"),
    localized("Introdução a campos condicionais", "Introduction to conditional fields"),
    "video",
    18,
    25,
  ),
];

const esignatureSubTracks: SubTrack[] = [
  createSubTrack(
    "subtrack-esig-basic",
    localized("Features Básicas", "Basic Features"),
    localized("Domine as funcionalidades essenciais através de desafios práticos", "Master essential features through practical challenges"),
    "PenTool",
    [
      createChallengeBasedModule(
        "mod-esig-basic-challenges",
        localized("Desafios Práticos de eSignature", "eSignature Practical Challenges"),
        localized("Complete os desafios para demonstrar domínio das features básicas. Submeta templates JSON para cada desafio.", "Complete the challenges to demonstrate mastery of basic features. Submit JSON templates for each challenge."),
        "Target",
        esigBasicOptionalLearning,
        esigBasicChallenges,
      ),
    ],
  ),
  createSubTrack(
    "subtrack-esig-advanced-wf",
    localized("Advanced Workflows", "Advanced Workflows"),
    localized("Fluxos avançados de assinatura", "Advanced signature workflows"),
    "GitBranch",
    [
      createModule(
        "mod-esig-adv-wf-1",
        localized("Fluxos Sequenciais", "Sequential Flows"),
        localized("Múltiplos signatários em ordem", "Multiple signers in order"),
        "ListOrdered",
        [
          createLearningContent("lc-esig-adv-1", "Sequential Signing", "Fluxos em cadeia explicados", "video", 20, 45),
          createLearningContent("lc-esig-adv-2", "Routing Strategies", "Estratégias de roteamento", "article", 25, 40),
        ],
        createAssessment(
          "assess-esig-adv-1",
          "Exame: Workflows",
          "Teste sobre fluxos avançados",
          genericQuestions("q-adv"),
          90,
        ),
        createBossChallenge(
          "boss-esig-adv-1",
          "Approval Hierarchy",
          "Configure um fluxo de aprovação hierárquica",
          "## Objetivo\nCrie um fluxo de aprovação com múltiplos níveis hierárquicos.\n\n## Requisitos\n1. 3 níveis de aprovação\n2. Regras condicionais\n3. Notificações personalizadas\n\n## Entrega\nExporte a configuração em formato JSON.",
          200,
        ),
      ),
    ],
    'coming-soon',
  ),
  createSubTrack(
    "subtrack-esig-advanced-feat",
    localized("Features Avançadas", "Advanced Features"),
    localized("Recursos avançados da plataforma", "Advanced platform features"),
    "Sparkles",
    [
    createChallengeBasedModule(
      "mod-esig-adv-feat-challenges",
      localized("Desafios Práticos Avançados", "Advanced Practical Challenges"),
      localized("Complete os desafios para demonstrar domínio das features avançadas do eSignature.", "Complete the challenges to demonstrate mastery of advanced eSignature features."),
      "Sparkles",
      [
        createOptionalLearning(
          "opt-esig-adv-1",
          localized("Visão Geral do Bulk Send", "Bulk Send Overview"),
          localized("Entenda como funciona o envio em massa", "Understand how bulk sending works"),
          "video",
          12,
          20,
        ),
        createOptionalLearning(
          "opt-esig-adv-2",
          localized("DocGen para eSign", "DocGen for eSign"),
          localized("Introdução ao DocGen para eSignature", "Introduction to DocGen for eSignature"),
          "video",
          15,
          25,
        ),
      ],
      [
        createPracticalChallenge(
          "prac-esig-adv-1",
          localized("Bulk Send", "Bulk Send"),
          localized(
            "Gere um modelo preparado para Envio em Massa (Bulk Send) com pelo menos 3 campos variáveis além de Nome e Email.",
            "Generate a template prepared for Bulk Send with at least 3 variable fields besides Name and Email."
          ),
          localized(
            "## 🎯 Objetivo\n- Envio em Massa configurado\n- CSV gerado e populado\n- **Bônus:** Configurar o DocGen for eSign\n\n## 📋 Requisitos\n\n### 1. Campos Variáveis\n- Ao menos 3 campos variáveis precisam ser populados\n- Popule Nome e Email de cada destinatário\n- Mostre no 'Assunto' do envelope o nome de cada destinatário\n\n### 2. CSV\n- Popule o CSV corretamente enviando para ao menos 3 destinatários\n- Ao final, anexe o CSV populado\n\n### 3. 🌟 BÔNUS – DocGen for eSign\n- Ao invés de utilizar tags de texto do eSignature, popule o documento utilizando DocGen for eSign\n\n## 📁 Entrega\n- Anexar o JSON do Template\n- Anexar o CSV devidamente populado",
            "## 🎯 Objective\n- Bulk Send configured\n- CSV generated and populated\n- **Bonus:** Configure DocGen for eSign\n\n## 📋 Requirements\n\n### 1. Variable Fields\n- At least 3 variable fields must be populated\n- Populate Name and Email for each recipient\n- Show each recipient's name in the envelope 'Subject'\n\n### 2. CSV\n- Populate the CSV correctly sending to at least 3 recipients\n- At the end, attach the populated CSV\n\n### 3. 🌟 BONUS – DocGen for eSign\n- Instead of using eSignature text tags, populate the document using DocGen for eSign\n\n## 📁 Delivery\n- Attach the Template JSON\n- Attach the properly populated CSV"
          ),
          [
            createMedal("medal-bulk-1", "🎖️", localized("Bulk Configurado", "Bulk Configured"), localized("Configurou o Bulk Send com campos variáveis", "Configured Bulk Send with variable fields")),
            createMedal("medal-bulk-2", "🎖️", localized("CSV Válido", "Valid CSV"), localized("CSV populado corretamente com 3+ destinatários", "CSV correctly populated with 3+ recipients")),
            createMedal("medal-bulk-bonus", "⭐", localized("DocGen Master", "DocGen Master"), localized("Utilizou DocGen for eSign para popular o documento", "Used DocGen for eSign to populate the document")),
          ],
          200,
        ),
        createPracticalChallenge(
          "prac-esig-adv-2",
          localized("Advanced Workflows", "Advanced Workflows"),
          localized(
            "Resolva um problema complexo do cliente usando fluxos avançados do eSign.",
            "Solve a complex client problem using advanced eSign workflows."
          ),
          localized(
            "## 🏢 Cenário\n\n**Cliente:** Fontara Services\n**Contraparte:** ACME Inc.\n\n### Descrição do Problema\n\n- A Fontara Services possui um contrato de alta complexidade que precisa ser revisado por uma pessoa do time jurídico\n- O jurídico da Fontara possui 3 pessoas; o contrato deve ser enviado para todas, mas apenas uma deve revisar o documento\n- Após a revisão, o contrato deve ser enviado para o contato Comercial da ACME\n- O contato Comercial da ACME não é a pessoa que deve assinar esse documento\n- Esse contato precisa direcionar o contrato para o Diretor responsável, cujo nome e email não são conhecidos pela Fontara\n\n## 📋 Requisitos\n\nUtilize funcionalidades do módulo Advanced Workflows para resolver o cenário descrito.\n\nEstruture o fluxo de forma que:\n- Apenas **uma pessoa** do jurídico revise o contrato, mas todas recebam o convite\n- O contato comercial da ACME atue como **intermediário**\n- O Diretor da ACME seja definido **pelo contato comercial da ACME**\n\nPrepare um Template contendo todas as funções necessárias para esse fluxo.\n\n## 📁 Entrega\n\n- Enviar o JSON do Template\n- A submissão deve atender a todos os requisitos do cenário",
            "## 🏢 Scenario\n\n**Client:** Fontara Services\n**Counterparty:** ACME Inc.\n\n### Problem Description\n\n- Fontara Services has a highly complex contract that needs to be reviewed by someone from the legal team\n- Fontara's legal team has 3 people; the contract must be sent to all of them, but only one should review the document\n- After the review, the contract must be sent to ACME's Commercial contact\n- ACME's Commercial contact is not the person who should sign this document\n- This contact needs to forward the contract to the responsible Director, whose name and email are unknown to Fontara\n\n## 📋 Requirements\n\nUse Advanced Workflows module features to solve the described scenario.\n\nStructure the flow so that:\n- Only **one person** from legal reviews the contract, but all receive the invitation\n- ACME's commercial contact acts as an **intermediary**\n- ACME's Director is defined **by ACME's commercial contact**\n\nPrepare a Template containing all the necessary functions for this flow.\n\n## 📁 Delivery\n\n- Submit the Template JSON\n- The submission must meet all scenario requirements"
          ),
          [
            createMedal("medal-adv-wf-1", "🎖️", localized("Workflow Architect", "Workflow Architect"), localized("Estruturou o fluxo avançado corretamente", "Structured the advanced workflow correctly")),
            createMedal("medal-adv-wf-2", "🎖️", localized("Roteamento Dinâmico", "Dynamic Routing"), localized("Configurou destinatário dinâmico no fluxo", "Configured dynamic recipient in the flow")),
          ],
          225,
        ),
        createPracticalChallenge(
          "prac-esig-adv-3",
          localized("Ações com Documentos", "Document Actions"),
          localized(
            "Resolva um problema complexo do cliente usando ações avançadas de documentos.",
            "Solve a complex client problem using advanced document actions."
          ),
          localized(
            "## 🏢 Cenário\n\n**Cliente:** Fontara Services\n**Contraparte:** ACME Inc.\n\n### Descrição do Problema\n\n- A Fontara Services possui um processo de Compras onde um contrato é enviado para assinatura com 2 documentos acessórios no mesmo envelope\n- Um desses documentos é uma \"Folha de Rosto\", de uso exclusivamente interno, que deve ser visualizada apenas pelo Diretor da Fontara (primeiro signatário)\n- O envelope também contém um NDA com mais de 30 páginas, que compromete a experiência de visualização\n\n## 📋 Requisitos\n\nUtilize funcionalidades presentes no módulo Advanced Workflows e ações de documentos.\n\n- O envelope deve conter ao menos 2 destinatários\n- O documento \"Folha de Rosto\" deve ser visível somente para o Diretor da Fontara (primeiro signatário)\n- O documento NDA não deve constar como documento \"aberto\" no envelope; ele deve ser configurado como complemento\n\n## 📁 Entrega\n\n- Enviar o JSON do Template\n- O template deve cumprir todas as necessidades do cliente descritas no cenário",
            "## 🏢 Scenario\n\n**Client:** Fontara Services\n**Counterparty:** ACME Inc.\n\n### Problem Description\n\n- Fontara Services has a Procurement process where a contract is sent for signature with 2 accessory documents in the same envelope\n- One of these documents is a \"Cover Page\", for internal use only, which should only be viewed by Fontara's Director (first signer)\n- The envelope also contains an NDA with more than 30 pages, which compromises the viewing experience\n\n## 📋 Requirements\n\nUse features present in the Advanced Workflows module and document actions.\n\n- The envelope must contain at least 2 recipients\n- The \"Cover Page\" document must be visible only to Fontara's Director (first signer)\n- The NDA document must not appear as an \"open\" document in the envelope; it must be configured as a supplement\n\n## 📁 Delivery\n\n- Submit the Template JSON\n- The template must meet all client needs described in the scenario"
          ),
          [
            createMedal("medal-doc-actions-1", "🎖️", localized("Document Visibility", "Document Visibility"), localized("Configurou visibilidade de documento corretamente", "Configured document visibility correctly")),
            createMedal("medal-doc-actions-2", "🎖️", localized("Attachment Master", "Attachment Master"), localized("Configurou documento como anexo/complemento", "Configured document as attachment/supplement")),
          ],
          200,
        ),
        createPracticalChallenge(
          "prac-esig-adv-final",
          localized("DESAFIO FINAL: Fórmulas e Flags", "FINAL CHALLENGE: Formulas and Flags"),
          localized(
            "Solucione uma demanda complexa utilizando Fórmulas e Condições avançadas.",
            "Solve a complex demand using Formulas and advanced Conditions."
          ),
          localized(
            "## 🏢 Cenário\n\n**Cliente:** Fontara Pharma\n\n### Descrição do Problema\n\n- A Fontara Pharma possui um formulário onde o paciente deve declarar se já sofreu de determinada condição de saúde\n- Caso a resposta seja positiva, o paciente deverá escrever em uma caixa de texto livre qual o status atual da condição e se está tomando medicações\n- Se o paciente marcar qualquer condição médica, a caixa de texto deverá aparecer como campo obrigatório\n- Se nenhuma condição for marcada, nenhuma caixa de texto deve ser exibida\n\n## 📋 Requisitos\n\nUtilize a função **Formula** para resolver o problema descrito.\n\n- A função Formula deve ser obrigatoriamente utilizada\n- Caso o paciente marque qualquer um dos checkboxes de condição médica:\n  - A caixa de texto deve ser exibida\n  - A caixa de texto deve ser configurada como **Campo Obrigatório**\n- Caso o paciente não marque nenhum checkbox:\n  - Nenhuma caixa de texto deve ser exibida\n\n## 📁 Entrega\n\n- Enviar o JSON do Template\n- O template deve cumprir integralmente as necessidades do cliente descritas no cenário",
            "## 🏢 Scenario\n\n**Client:** Fontara Pharma\n\n### Problem Description\n\n- Fontara Pharma has a form where the patient must declare whether they have suffered from a certain health condition\n- If the answer is positive, the patient must write in a free text box the current status of the condition and whether they are taking medications\n- If the patient marks any medical condition, the text box must appear as a required field\n- If no condition is marked, no text box should be displayed\n\n## 📋 Requirements\n\nUse the **Formula** function to solve the described problem.\n\n- The Formula function must be mandatorily used\n- If the patient checks any of the medical condition checkboxes:\n  - The text box must be displayed\n  - The text box must be configured as a **Required Field**\n- If the patient does not check any checkbox:\n  - No text box should be displayed\n\n## 📁 Delivery\n\n- Submit the Template JSON\n- The template must fully meet the client needs described in the scenario"
          ),
          [
            createMedal("medal-formula-1", "🏆", localized("Formula Master", "Formula Master"), localized("Utilizou a função Formula corretamente", "Used the Formula function correctly")),
            createMedal("medal-formula-2", "🏆", localized("Conditional Logic", "Conditional Logic"), localized("Implementou lógica condicional de visibilidade", "Implemented conditional visibility logic")),
            createMedal("medal-formula-3", "🏆", localized("Required Field Logic", "Required Field Logic"), localized("Configurou campo obrigatório condicionalmente", "Configured required field conditionally")),
          ],
          400,
          true, // isFinalChallenge
        ),
      ],
    ),
  ]),
  createSubTrack(
    "subtrack-esig-admin",
    localized("Ferramentas Administrativas", "Administrative Tools"),
    localized("Gestão e configurações administrativas", "Administrative settings and management"),
    "Settings",
    [
      createModule(
        "mod-esig-admin-1",
        localized("Painel Administrativo", "Admin Panel"),
        localized("Configurações avançadas", "Advanced settings"),
        "SlidersHorizontal",
        [
          createLearningContent(
            "lc-esig-admin-1",
            "Admin Console Overview",
            "Tour pelo painel administrativo",
            "video",
            18,
            40,
          ),
          createLearningContent(
            "lc-esig-admin-2",
            "Best Practices Guide",
            "Boas práticas de administração",
            "article",
            25,
            35,
          ),
        ],
        createAssessment(
          "assess-esig-admin-1",
          "Exame: Administração",
          "Teste de boas práticas",
          genericQuestions("q-admin"),
          80,
        ),
        createBossChallenge(
          "boss-esig-admin-1",
          "Admin Setup",
          "Configure um ambiente administrativo completo",
          "## Objetivo\nConfigure todas as opções administrativas de um ambiente.\n\n## Requisitos\n1. Políticas de segurança\n2. Configurações de branding\n3. Integrações\n\n## Entrega\nExporte as configurações em formato JSON.",
          150,
        ),
      ),
    ],
    'coming-soon',
  ),
  createSubTrack(
    "subtrack-esig-sso",
    localized("SSO & Organization Management", "SSO & Organization Management"),
    localized("Single Sign-On e gestão organizacional", "Single Sign-On and organizational management"),
    "Shield",
    [
      createModule(
        "mod-esig-sso-1",
        localized("Configuração de SSO", "SSO Configuration"),
        localized("Integração com identity providers", "Identity provider integration"),
        "Key",
        [
          createLearningContent("lc-esig-sso-1", "SSO Deep Dive", "Entenda SSO completamente", "video", 25, 55),
          createLearningContent("lc-esig-sso-2", "SAML vs OIDC", "Comparação de protocolos", "article", 20, 40),
        ],
        createAssessment("assess-esig-sso-1", "Exame: SSO", "Teste sobre autenticação", genericQuestions("q-sso"), 100),
        createBossChallenge(
          "boss-esig-sso-1",
          "SSO Integration",
          "Configure integração SSO com um IdP",
          "## Objetivo\nConfigure a integração SSO com um Identity Provider.\n\n## Requisitos\n1. Configure SAML ou OIDC\n2. Teste o fluxo de login\n3. Documente a configuração\n\n## Entrega\nEnvie a configuração e documentação em formato ZIP.",
          250,
        ),
      ),
      createModule(
        "mod-esig-sso-2",
        localized("Organization Management", "Organization Management"),
        localized("Gestão de organizações", "Organization management"),
        "Building",
        [
          createLearningContent(
            "lc-esig-org-1",
            "Organizational Hierarchy",
            "Estrutura de organizações",
            "video",
            22,
            50,
          ),
          createLearningContent("lc-esig-org-2", "Enterprise Rollout Guide", "Guia de implantação", "slides", 30, 45),
        ],
        createAssessment(
          "assess-esig-org-1",
          "Exame: Organizations",
          "Teste sobre gestão organizacional",
          genericQuestions("q-org"),
          90,
        ),
        createBossChallenge(
          "boss-esig-org-1",
          "Enterprise Rollout",
          "Planeje e execute um rollout enterprise",
          "## Objetivo\nCrie um plano de rollout para uma organização enterprise.\n\n## Requisitos\n1. Plano de migração\n2. Estrutura organizacional\n3. Cronograma de implantação\n\n## Entrega\nEnvie o plano em formato JSON ou PDF.",
          200,
        ),
      ),
    ],
    'coming-soon',
  ),
];

// API Track Sub-Tracks
const apiSubTracks: SubTrack[] = [
  createSubTrack(
    "subtrack-api-basic",
    localized("eSign Basic API", "eSign Basic API"),
    localized("Fundamentos da API de eSignature", "eSignature API fundamentals"),
    "Code",
    [
      createChallengeBasedModule(
        "mod-api-basic-1",
        localized("Authentication & Setup", "Authentication & Setup"),
        localized("Configure autenticação e primeiras chamadas", "Configure authentication and first API calls"),
        "Key",
        [
          createOptionalLearning(
            "opt-api-basic-1",
            localized("API Authentication 101", "API Authentication 101"),
            localized("Conceitos de autenticação OAuth e JWT", "OAuth and JWT authentication concepts"),
            "video",
            15,
            10,
          ),
          createOptionalLearning(
            "opt-api-basic-2",
            localized("REST API Fundamentals", "REST API Fundamentals"),
            localized("Princípios de APIs RESTful", "RESTful API principles"),
            "course",
            20,
            10,
          ),
        ],
        [
          createPracticalChallenge(
            "prac-api-basic-1",
            localized(
              "Configure autenticação JWT para a API",
              "Configure JWT Authentication for the API"
            ),
            localized(
              "Implemente o fluxo de autenticação JWT para acessar a API de eSignature.",
              "Implement the JWT authentication flow to access the eSignature API."
            ),
            localized(
              "## 🎯 Objective\nConfigure JWT authentication to obtain an access token.\n\n## 📋 Requirements\n\n### 1. JWT Token Generation\n- Use Integration Key, User ID, and Account ID\n- Generate a valid JWT assertion\n- Exchange for access token\n\n### 2. Token Usage\n- Include Bearer token in API calls\n- Handle token expiration\n\n## 📁 Delivery\nExport your authentication configuration in JSON format.",
              "## 🎯 Objective\nConfigure JWT authentication to obtain an access token.\n\n## 📋 Requirements\n\n### 1. JWT Token Generation\n- Use Integration Key, User ID, and Account ID\n- Generate a valid JWT assertion\n- Exchange for access token\n\n### 2. Token Usage\n- Include Bearer token in API calls\n- Handle token expiration\n\n## 📁 Delivery\nExport your authentication configuration in JSON format."
            ),
            [
              createMedal("medal-api-1", "🔑", localized("JWT Master", "JWT Master"), localized("Configurou autenticação JWT corretamente", "Correctly configured JWT authentication")),
            ],
            150,
          ),
          createPracticalChallenge(
            "prac-api-basic-2",
            localized(
              "Envie um envelope via API",
              "Send an Envelope via API"
            ),
            localized(
              "Use a API para criar e enviar um envelope com um documento e signatário.",
              "Use the API to create and send an envelope with a document and signer."
            ),
            localized(
              "## 🎯 Objective\nCreate and send an envelope using the eSignature REST API.\n\n## 📋 Requirements\n\n### 1. Envelope Creation\n- Create envelope with at least one document\n- Add one or more recipients\n- Configure signing tabs\n\n### 2. Send & Track\n- Send the envelope\n- Retrieve envelope status\n\n## 📁 Delivery\nExport the API request/response payloads in JSON format.",
              "## 🎯 Objective\nCreate and send an envelope using the eSignature REST API.\n\n## 📋 Requirements\n\n### 1. Envelope Creation\n- Create envelope with at least one document\n- Add one or more recipients\n- Configure signing tabs\n\n### 2. Send & Track\n- Send the envelope\n- Retrieve envelope status\n\n## 📁 Delivery\nExport the API request/response payloads in JSON format."
            ),
            [
              createMedal("medal-api-2", "📨", localized("First Envelope", "First Envelope"), localized("Enviou primeiro envelope via API", "Sent first envelope via API")),
            ],
            200,
            true,
          ),
        ],
      ),
    ],
  ),
  createSubTrack(
    "subtrack-api-advanced",
    localized("eSign Advanced API", "eSign Advanced API"),
    localized("Integrações avançadas e webhooks", "Advanced integrations and webhooks"),
    "Webhook",
    [
      createChallengeBasedModule(
        "mod-api-advanced-1",
        localized("Webhooks & Connect", "Webhooks & Connect"),
        localized("Eventos em tempo real e integrações Connect", "Real-time events and Connect integrations"),
        "Radio",
        [
          createOptionalLearning(
            "opt-api-adv-1",
            localized("Webhook Architecture", "Webhook Architecture"),
            localized("Padrões de arquitetura para webhooks", "Architecture patterns for webhooks"),
            "video",
            12,
            10,
          ),
        ],
        [
          createPracticalChallenge(
            "prac-api-adv-1",
            localized(
              "Configure um Webhook Listener",
              "Configure a Webhook Listener"
            ),
            localized(
              "Implemente um listener para receber eventos de envelope em tempo real.",
              "Implement a listener to receive real-time envelope events."
            ),
            localized(
              "## 🎯 Objective\nSet up a webhook listener for envelope events.\n\n## 📋 Requirements\n\n### 1. Listener Setup\n- Configure endpoint URL\n- Handle envelope-completed events\n- Parse webhook payload\n\n### 2. Event Processing\n- Log received events\n- Extract envelope data\n- Handle error scenarios\n\n## 📁 Delivery\nExport your webhook configuration and sample payloads in JSON format.",
              "## 🎯 Objective\nSet up a webhook listener for envelope events.\n\n## 📋 Requirements\n\n### 1. Listener Setup\n- Configure endpoint URL\n- Handle envelope-completed events\n- Parse webhook payload\n\n### 2. Event Processing\n- Log received events\n- Extract envelope data\n- Handle error scenarios\n\n## 📁 Delivery\nExport your webhook configuration and sample payloads in JSON format."
            ),
            [
              createMedal("medal-api-3", "📡", localized("Event Listener", "Event Listener"), localized("Configurou webhook listener funcional", "Configured functional webhook listener")),
            ],
            200,
          ),
          createPracticalChallenge(
            "prac-api-adv-2",
            localized(
              "Integração end-to-end com API",
              "End-to-End API Integration"
            ),
            localized(
              "Construa uma integração completa: autenticação, envio de envelope e recebimento de webhook.",
              "Build a complete integration: authentication, envelope sending, and webhook reception."
            ),
            localized(
              "## 🎯 Objective\nBuild a complete end-to-end integration.\n\n## 📋 Requirements\n\n### 1. Full Flow\n- Authenticate via JWT\n- Create and send envelope\n- Receive completion webhook\n\n### 2. Error Handling\n- Handle authentication failures\n- Manage API rate limits\n- Retry failed webhooks\n\n## 📁 Delivery\nExport the complete integration flow documentation in JSON format.",
              "## 🎯 Objective\nBuild a complete end-to-end integration.\n\n## 📋 Requirements\n\n### 1. Full Flow\n- Authenticate via JWT\n- Create and send envelope\n- Receive completion webhook\n\n### 2. Error Handling\n- Handle authentication failures\n- Manage API rate limits\n- Retry failed webhooks\n\n## 📁 Delivery\nExport the complete integration flow documentation in JSON format."
            ),
            [
              createMedal("medal-api-4", "🏆", localized("Full Stack API", "Full Stack API"), localized("Completou integração end-to-end", "Completed end-to-end integration")),
            ],
            300,
            true,
          ),
        ],
      ),
    ],
  ),
];

// Trails data
export const trails: Trail[] = [
  {
    id: "trail-iam",
    title: localized("IAM", "IAM"),
    description: localized(
      "Intelligent Agreement Management - Domine Maestro, Agreement Desk e Navigator",
      "Intelligent Agreement Management - Master Maestro, Agreement Desk, and Navigator"
    ),
    icon: "Shield",
    color: "from-blue-500 to-indigo-600",
    prerequisites: [],
    estimatedHours: 20,
    xpReward: iamSubTracks.reduce((sum, st) => sum + st.xpReward, 0),
    subTracks: iamSubTracks,
  },
  {
    id: "trail-esignature",
    title: localized("eSignature", "eSignature"),
    description: localized(
      "Assinatura Eletrônica - Do básico ao avançado em workflows de assinatura digital.",
      "Electronic Signature - From basics to advanced digital signature workflows."
    ),
    icon: "PenTool",
    color: "from-emerald-500 to-teal-600",
    prerequisites: [],
    estimatedHours: 18,
    xpReward: esignatureSubTracks.reduce((sum, st) => sum + st.xpReward, 0),
    subTracks: esignatureSubTracks,
  },
  {
    id: "trail-api",
    title: localized("API", "API"),
    description: localized(
      "Domine os fundamentos técnicos das integrações eSignature através de desafios práticos de API.",
      "Master the technical foundations of eSignature integrations through hands-on API challenges."
    ),
    icon: "Code",
    color: "from-orange-500 to-amber-600",
    prerequisites: [],
    estimatedHours: 12,
    xpReward: apiSubTracks.reduce((sum, st) => sum + st.xpReward, 0),
    subTracks: apiSubTracks,
  },
];

// Progress calculation helpers - use User type with optional extended properties
type ExtendedUser = User & {
  completedAssessments?: string[];
  completedBossChallenges?: string[];
  assessmentScores?: Record<string, number>;
};

export function calculateModuleProgress(
  module: Module,
  user: ExtendedUser,
): { learning: number; assessment: boolean; boss: boolean } {
  const learningCompleted = module.learningContent.filter((lc) => user.completedChallenges.includes(lc.id)).length;
  const learningTotal = module.learningContent.length;

  return {
    learning: learningTotal > 0 ? Math.round((learningCompleted / learningTotal) * 100) : 0,
    assessment: user.completedAssessments?.includes(module.assessment.id) || false,
    boss: user.completedBossChallenges?.includes(module.bossChallenge.id) || false,
  };
}

export function isLearningComplete(module: Module, user: ExtendedUser): boolean {
  return module.learningContent.every((lc) => user.completedChallenges.includes(lc.id));
}

export function isAssessmentUnlocked(module: Module, user: ExtendedUser): boolean {
  return isLearningComplete(module, user);
}

export function isBossChallengeUnlocked(module: Module, user: ExtendedUser): boolean {
  return user.completedAssessments?.includes(module.assessment.id) || false;
}

export function isModuleComplete(module: Module, user: ExtendedUser): boolean {
  if (module.isChallengeBased && module.practicalChallenges) {
    return module.practicalChallenges.every(
      (pc) => user.completedChallenges.includes(pc.id)
    );
  }
  return user.completedBossChallenges?.includes(module.bossChallenge.id) || false;
}

export function calculateSubTrackProgress(subTrack: SubTrack, user: ExtendedUser): number {
  let totalItems = 0;
  let completedItems = 0;

  for (const mod of subTrack.modules) {
    if (mod.isChallengeBased && mod.practicalChallenges) {
      totalItems += mod.practicalChallenges.length;
      completedItems += mod.practicalChallenges.filter(
        (pc) => user.completedChallenges.includes(pc.id)
      ).length;
    } else {
      totalItems += mod.learningContent.length + 2;
      completedItems += mod.learningContent.filter((lc) => user.completedChallenges.includes(lc.id)).length;
      if (user.completedAssessments?.includes(mod.assessment.id)) completedItems++;
      if (user.completedBossChallenges?.includes(mod.bossChallenge.id)) completedItems++;
    }
  }

  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
}

export function calculateTrailProgress(trail: Trail, user: ExtendedUser): number {
  let totalItems = 0;
  let completedItems = 0;

  for (const st of trail.subTracks) {
    for (const mod of st.modules) {
      if (mod.isChallengeBased && mod.practicalChallenges) {
        totalItems += mod.practicalChallenges.length;
        completedItems += mod.practicalChallenges.filter(
          (pc) => user.completedChallenges.includes(pc.id)
        ).length;
      } else {
        // Count learning content + assessment + boss as items
        totalItems += mod.learningContent.length + 2;
        completedItems += mod.learningContent.filter((lc) => user.completedChallenges.includes(lc.id)).length;
        if (user.completedAssessments?.includes(mod.assessment.id)) completedItems++;
        if (user.completedBossChallenges?.includes(mod.bossChallenge.id)) completedItems++;
      }
    }
  }

  return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
}

export interface RecommendedContent {
  content: LearningContent | PracticalChallenge;
  trailId: string;
  subTrackId: string;
  subTrackTitle: LocalizedText;
  moduleId: string;
  moduleTitle: LocalizedText;
  isChallengeBased: boolean;
}

export function getRecommendedChallenge(user: ExtendedUser): LearningContent | null {
  const result = getRecommendedChallengeWithContext(user);
  if (!result) return null;
  if (result.isChallengeBased) {
    // Return a compatible LearningContent shape for backward compat
    const pc = result.content as PracticalChallenge;
    return {
      id: pc.id,
      title: typeof pc.title === 'string' ? pc.title : pc.title['pt-BR'],
      description: typeof pc.description === 'string' ? pc.description : pc.description['pt-BR'],
      type: 'article',
      duration: 0,
      xpReward: pc.xpReward,
    };
  }
  return result.content as LearningContent;
}

export function getRecommendedChallengeWithContext(user: ExtendedUser): RecommendedContent | null {
  // Priority order: eSignature first, then remaining tracks
  const prioritized = [...trails].sort((a, b) => {
    if (a.id === 'trail-esignature') return -1;
    if (b.id === 'trail-esignature') return 1;
    return 0;
  });

  for (const trail of prioritized) {
    for (const subTrack of trail.subTracks) {
      if (subTrack.status === 'coming-soon' || subTrack.status === 'hidden') continue;
      for (const module of subTrack.modules) {
        if (module.isChallengeBased && module.practicalChallenges) {
          for (const challenge of module.practicalChallenges) {
            if (!challenge.isCompleted && !challenge.isSubmitted) {
              return {
                content: challenge,
                trailId: trail.id,
                subTrackId: subTrack.id,
                subTrackTitle: subTrack.title,
                moduleId: module.id,
                moduleTitle: module.title,
                isChallengeBased: true,
              };
            }
          }
        } else {
          for (const content of module.learningContent) {
            if (!user.completedChallenges.includes(content.id)) {
              return {
                content,
                trailId: trail.id,
                subTrackId: subTrack.id,
                subTrackTitle: subTrack.title,
                moduleId: module.id,
                moduleTitle: module.title,
                isChallengeBased: false,
              };
            }
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
