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
} from "@/types/learning";

// Current user mock - includes completed assessments and boss challenges
export const currentUser: User & {
  completedAssessments: string[];
  completedBossChallenges: string[];
  assessmentScores: Record<string, number>;
} = {
  id: "user-1",
  name: "Rodrigo Pecanha",
  email: "carolina.santos@empresa.com",
  role: "sc",
  level: "Builder",
  xp: 1850,
  xpToNextLevel: 3000,
  badges: ["badge-1", "badge-2", "badge-3"],
  completedChallenges: ["lc-iam-nav-1", "lc-iam-nav-2", "lc-iam-nav-3"],
  completedLessons: [],
  completedModules: ["mod-iam-nav-1"],
  completedTrails: [],
  completedAssessments: ["assess-iam-nav-1"],
  completedBossChallenges: ["boss-iam-nav-1"],
  assessmentScores: { "assess-iam-nav-1": 85 },
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
    name: "Pedro Oliveira",
    email: "pedro.oliveira@empresa.com",
    role: "sc",
    level: "Explorer",
    xp: 450,
    xpToNextLevel: 1000,
    badges: ["badge-1"],
    completedChallenges: ["lc-iam-nav-1"],
    completedLessons: [],
    completedModules: [],
    completedTrails: [],
    completedAssessments: [],
    completedBossChallenges: [],
    currentStreak: 3,
    longestStreak: 5,
    joinedAt: "2024-02-01",
  },
  {
    id: "user-3",
    name: "Mariana Costa",
    email: "mariana.costa@empresa.com",
    role: "sc",
    level: "Architect",
    xp: 4200,
    xpToNextLevel: 7000,
    badges: ["badge-1", "badge-2", "badge-3", "badge-4", "badge-5"],
    completedChallenges: ["lc-iam-nav-1", "lc-iam-nav-2", "lc-esig-basic-1", "lc-esig-basic-2"],
    completedLessons: [],
    completedModules: ["mod-iam-nav-1", "mod-esig-basic-1"],
    completedTrails: [],
    completedAssessments: ["assess-iam-nav-1", "assess-esig-basic-1"],
    completedBossChallenges: ["boss-iam-nav-1", "boss-esig-basic-1"],
    currentStreak: 21,
    longestStreak: 21,
    joinedAt: "2023-11-10",
  },
  {
    id: "user-4",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@empresa.com",
    role: "sc",
    level: "Builder",
    xp: 2100,
    xpToNextLevel: 3000,
    badges: ["badge-1", "badge-2", "badge-3", "badge-4"],
    completedChallenges: ["lc-iam-nav-1", "lc-iam-nav-2", "lc-iam-maestro-1"],
    completedLessons: [],
    completedModules: ["mod-iam-nav-1"],
    completedTrails: [],
    completedAssessments: ["assess-iam-nav-1"],
    completedBossChallenges: ["boss-iam-nav-1"],
    currentStreak: 0,
    longestStreak: 12,
    joinedAt: "2024-01-20",
  },
  {
    id: "user-5",
    name: "Ana Beatriz Lima",
    email: "ana.lima@empresa.com",
    role: "manager",
    level: "Master",
    xp: 8500,
    xpToNextLevel: 15000,
    badges: ["badge-1", "badge-2", "badge-3", "badge-4", "badge-5", "badge-6"],
    completedChallenges: [],
    completedLessons: [],
    completedModules: [],
    completedTrails: ["trail-iam"],
    completedAssessments: [],
    completedBossChallenges: [],
    currentStreak: 45,
    longestStreak: 45,
    joinedAt: "2023-06-01",
  },
];

// Badges
export const badges: Badge[] = [
  {
    id: "badge-1",
    name: "Primeiro Passo",
    description: "Complete seu primeiro desafio",
    icon: "🚀",
    category: "achievement",
    xpReward: 50,
  },
  {
    id: "badge-2",
    name: "IAM Expert",
    description: "Complete a trilha IAM",
    icon: "🔐",
    category: "completion",
    xpReward: 200,
  },
  {
    id: "badge-3",
    name: "eSignature Pro",
    description: "Complete a trilha eSignature",
    icon: "✍️",
    category: "completion",
    xpReward: 250,
  },
  {
    id: "badge-4",
    name: "Navigator Master",
    description: "Domine o Navigator completamente",
    icon: "🧭",
    category: "skill",
    xpReward: 150,
  },
  {
    id: "badge-5",
    name: "Streak Master",
    description: "Mantenha uma sequência de 14 dias",
    icon: "🔥",
    category: "achievement",
    xpReward: 100,
  },
  {
    id: "badge-6",
    name: "SC Elite",
    description: "Alcance o nível Master",
    icon: "👑",
    category: "special",
    xpReward: 500,
  },
  {
    id: "badge-7",
    name: "Boss Slayer",
    description: "Complete 5 Boss Challenges",
    icon: "⚔️",
    category: "achievement",
    xpReward: 300,
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
  title: string,
  description: string,
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
  title: string,
  description: string,
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

const createPracticalChallenge = (
  id: string,
  title: string,
  description: string,
  instructions: string,
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

const createMedal = (id: string, icon: string, name: string, description?: string): ChallengeMedal => ({
  id,
  icon,
  name,
  description,
});

const createOptionalLearning = (
  id: string,
  title: string,
  description: string,
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

const createSubTrack = (id: string, title: string, description: string, icon: string, modules: Module[]): SubTrack => ({
  id,
  title,
  description,
  icon,
  modules,
  xpReward: modules.reduce((sum, m) => sum + m.xpReward, 0),
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

// IAM Trail Modules
const iamSubTracks: SubTrack[] = [
  createSubTrack("subtrack-iam-navigator", "Navigator", "Domine o Navigator para gestão de identidades", "Compass", [
    createModule(
      "mod-iam-nav-1",
      "Introdução ao Navigator",
      "Fundamentos e interface do Navigator",
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
      "Gestão de Usuários",
      "Criação e gerenciamento de usuários",
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
  createSubTrack("subtrack-iam-maestro", "Maestro", "Orquestração avançada de identidades", "Wand2", [
    createModule(
      "mod-iam-maestro-1",
      "Automação de Provisionamento",
      "Workflows automáticos",
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
  createSubTrack("subtrack-iam-agreement", "Agreement Desk", "Gestão de termos e consentimentos", "FileCheck", [
    createModule(
      "mod-iam-agreement-1",
      "Termos de Uso",
      "Configuração de termos",
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
  createSubTrack("subtrack-iam-workspaces", "Workspaces", "Ambientes isolados e multi-tenancy", "Building2", [
    createModule(
      "mod-iam-workspaces-1",
      "Arquitetura Multi-tenant",
      "Conceitos de isolamento",
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

// eSignature Trail with new structure - Features Básicas is now challenge-based
const esigBasicChallenges: PracticalChallenge[] = [
  createPracticalChallenge(
    "prac-esig-1",
    "Crie um Modelo de envelope com multicanais e validação de identidade",
    "Configure um envelope completo com entrega multicanal, autenticação reforçada e campos interativos para os signatários.",
    "## 🎯 Objetivo\nModelo de Envelope com:\n- Entrega multicanal (Email + Whatsapp ou SMS)\n- Autenticação do signatário\n- Campos de interação\n\n## 📋 Requisitos\n\n### 1. Configuração de Entrega\n- Configure entrega por Email + SMS ou Whatsapp\n- Defina lembretes automáticos\n\n### 2. Segurança\n- Adicione pelo menos 2 camadas de autenticação\n- Configure verificação de identidade\n\n### 3. Campos Interativos\n- Inclua campos de texto editáveis\n- Adicione checkboxes ou radio buttons\n- Configure campos obrigatórios\n\n## 📁 Entrega\nExporte o template do envelope em formato JSON.",
    [
      createMedal("medal-1", "🎖️", "Código de Acesso", "Usou código de acesso para autenticação"),
      createMedal("medal-2", "🎖️", "Liveness", "Implementou verificação de liveness"),
    ],
    150,
    false,
    true, // isSubmitted - unlocks second challenge
  ),
  createPracticalChallenge(
    "prac-esig-2",
    "Prepare um Modelo que valide a formatação dos dados do signatário",
    "Crie um template com validações de formato para garantir que os dados inseridos pelo signatário estejam corretos.",
    "## 🎯 Objetivo\nConfigure validações de campo para garantir integridade dos dados.\n\n## 📋 Requisitos de Validação\n\n### Campos Obrigatórios\n1. **CPF** - Validação de formato XXX.XXX.XXX-XX\n2. **CNPJ** - Validação de formato XX.XXX.XXX/XXXX-XX\n3. **Data de nascimento** - Formato DD/MM/AAAA\n4. **Uma Marca** criada de acordo com as cores do logotipo do cliente\n\n## 💡 Dicas\n- Use expressões regulares (regex) para validações\n- Configure mensagens de erro claras\n- Teste as validações antes de exportar\n\n## 📁 Entrega\nExporte o template com as validações configuradas em formato JSON.",
    [createMedal("medal-3", "🎖️", "Regex correto", "Implementou regex personalizado funcionando"), createMedal("medal-3b", "🎖️", "Brand aplicada", "Aplicou a marca com as cores do cliente")],
    200,
  ),
  createPracticalChallenge(
    "prac-esig-final",
    "DESAFIO FINAL: Construa um modelo baseado no documento em anexo (use case de RH), onde o salário deverá mudar de acordo com o cargo",
    "Este é o desafio final do módulo. Demonstre domínio completo criando um template de RH com campos condicionais e dinâmicos.",
    "## 🏆 DESAFIO FINAL\n\n### Contexto\nVocê foi solicitado a criar um template de contrato de trabalho para o departamento de RH. O template deve ser inteligente o suficiente para adaptar o salário automaticamente baseado no cargo selecionado.\n\n## 📋 Requisitos\n\n### 1. Campos do Colaborador\n- Nome completo\n- CPF com validação\n- Data de admissão\n- Departamento\n\n### 2. Campo de Cargo (Obrigatório)\nCrie um campo dropdown com os seguintes cargos:\n- Analista Jr - R$ 4.000\n- Analista Pleno - R$ 6.500\n- Analista Sr - R$ 9.000\n- Coordenador - R$ 12.000\n- Gerente - R$ 18.000\n\n### 3. Campo de Salário Condicional\n- O valor do salário deve mudar automaticamente baseado no cargo selecionado\n- Use lógica condicional para mostrar/ocultar benefícios específicos por nível\n\n### 4. Campos Adicionais (para medalhas)\n- Campo de anexo para documentos do colaborador\n- Campo de Rúbrica posicionado automaticamente em todas as páginas\n- Campos de aprovação para RH e Gestor\n\n## 📁 Formato de Entrega\nEnvie um arquivo JSON contendo:\n- Template completo do contrato\n- Configurações de campos condicionais\n- Documentação das regras aplicadas\n\n## ✅ Critérios de Avaliação\n- Funcionamento correto da lógica condicional\n- Usabilidade do template\n- Qualidade da documentação",
    [
      createMedal("medal-4", "🎖️", "Campo Anexo", "Incluiu campo para upload de documentos"),
      createMedal("medal-5", "🎖️", "Campo Draw", "Implementou campo de desenho/rubrica"),
      createMedal("medal-6", "🎖️", "Campo Radio Button", "Usou radio buttons corretamente"),
      createMedal("medal-7", "🎖️", "Campo Condicional", "Implementou lógica condicional funcionando"),
      createMedal("medal-8", "🎖️", "Campo Aprovar", "Incluiu fluxo de aprovação"),
    ],
    350,
    true, // isFinalChallenge
  ),
];

const esigBasicOptionalLearning: OptionalLearning[] = [
  createOptionalLearning(
    "opt-esig-1",
    "Visão Geral das Features",
    "Conheça as principais funcionalidades do eSignature",
    "video",
    15,
    20,
  ),
  createOptionalLearning("opt-esig-2", "Campos e Validações", "Como funcionam os campos e validações", "video", 12, 15),
  createOptionalLearning("opt-esig-3", "Lógica Condicional", "Introdução a campos condicionais", "video", 18, 25),
];

const esignatureSubTracks: SubTrack[] = [
  createSubTrack(
    "subtrack-esig-basic",
    "Features Básicas",
    "Domine as funcionalidades essenciais através de desafios práticos",
    "PenTool",
    [
      createChallengeBasedModule(
        "mod-esig-basic-challenges",
        "Desafios Práticos de eSignature",
        "Complete os desafios para demonstrar domínio das features básicas. Submeta templates JSON para cada desafio.",
        "Target",
        esigBasicOptionalLearning,
        esigBasicChallenges,
      ),
    ],
  ),
  createSubTrack("subtrack-esig-advanced-wf", "Advanced Workflows", "Fluxos avançados de assinatura", "GitBranch", [
    createModule(
      "mod-esig-adv-wf-1",
      "Fluxos Sequenciais",
      "Múltiplos signatários em ordem",
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
  ]),
  createSubTrack("subtrack-esig-advanced-feat", "Features Avançadas", "Recursos avançados da plataforma", "Sparkles", [
    createModule(
      "mod-esig-adv-feat-1",
      "Campos Inteligentes",
      "Campos dinâmicos e condicionais",
      "FormInput",
      [
        createLearningContent("lc-esig-feat-1", "Dynamic Fields", "Campos que se adaptam", "video", 22, 50),
        createLearningContent(
          "lc-esig-feat-2",
          "Conditional Logic",
          "Lógica condicional em formulários",
          "article",
          30,
          45,
        ),
      ],
      createAssessment(
        "assess-esig-feat-1",
        "Exame: Smart Fields",
        "Teste sobre campos inteligentes",
        genericQuestions("q-feat"),
        100,
      ),
      createBossChallenge(
        "boss-esig-feat-1",
        "Smart Form",
        "Crie um formulário inteligente completo",
        "## Objetivo\nDesenvolva um formulário com campos dinâmicos e lógica condicional.\n\n## Requisitos\n1. Campos que aparecem/desaparecem\n2. Validações customizadas\n3. Cálculos automáticos\n\n## Entrega\nExporte o formulário em formato JSON.",
        220,
      ),
    ),
  ]),
  createSubTrack(
    "subtrack-esig-admin",
    "Ferramentas Administrativas",
    "Gestão e configurações administrativas",
    "Settings",
    [
      createModule(
        "mod-esig-admin-1",
        "Painel Administrativo",
        "Configurações avançadas",
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
  ),
  createSubTrack(
    "subtrack-esig-sso",
    "SSO & Organization Management",
    "Single Sign-On e gestão organizacional",
    "Shield",
    [
      createModule(
        "mod-esig-sso-1",
        "Configuração de SSO",
        "Integração com identity providers",
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
        "Organization Management",
        "Gestão de organizações",
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
  ),
];

// Trails data
export const trails: Trail[] = [
  {
    id: "trail-iam",
    title: "IAM",
    description: "Identity and Access Management - Domine a gestão de identidades, acessos e provisionamento.",
    icon: "Shield",
    color: "from-blue-500 to-indigo-600",
    prerequisites: [],
    estimatedHours: 20,
    xpReward: iamSubTracks.reduce((sum, st) => sum + st.xpReward, 0),
    subTracks: iamSubTracks,
  },
  {
    id: "trail-esignature",
    title: "eSignature",
    description: "Assinatura Eletrônica - Do básico ao avançado em workflows de assinatura digital.",
    icon: "PenTool",
    color: "from-emerald-500 to-teal-600",
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
  return user.completedBossChallenges?.includes(module.bossChallenge.id) || false;
}

export function calculateSubTrackProgress(subTrack: SubTrack, user: ExtendedUser): number {
  const totalModules = subTrack.modules.length;
  const completedModules = subTrack.modules.filter((mod) => isModuleComplete(mod, user)).length;
  return totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;
}

export function calculateTrailProgress(trail: Trail, user: ExtendedUser): number {
  const totalModules = trail.subTracks.reduce((sum, st) => sum + st.modules.length, 0);
  const completedModules = trail.subTracks.reduce(
    (sum, st) => sum + st.modules.filter((mod) => isModuleComplete(mod, user)).length,
    0,
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
