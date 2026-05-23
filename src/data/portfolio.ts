export type ProjectStatus = 'Live' | 'Research' | 'In progress' | 'Coursework' | 'Prototype';

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  impact: string;
  role: string;
  status: ProjectStatus;
  year: string;
  links: {
    github?: string;
    demo?: string;
  };
};

export type Experience = {
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
};

export const profile = {
  name: 'João Kido',
  initials: 'JK',
  role: 'CS Student · Builder · Product-Minded Researcher',
  tagline: 'I design and ship systems at the intersection of AI, product, and public impact.',
  focus: 'Currently exploring AI-assisted healthcare, economic simulation tools, and products that make complex decisions legible.',
  location: 'Berkeley, CA',
  email: 'mailto:joaokido@berkeley.edu',
  github: 'https://github.com/kidoexpress',
  linkedin: 'https://www.linkedin.com/in/joao-guilherme-kido-carvalho',
  version: '2.0',
};

export const about = {
  headline: 'I like turning messy, meaningful problems into working software.',
  body: 'My work sits at the intersection of computer science, AI, product thinking, public policy, and education. I care about tools that are rigorous enough for research, usable enough for real people, and thoughtful about the communities they affect.',
  interests: ['AI systems', 'Product experiments', 'Policy', 'Education', 'Social impact', 'Simulation', 'Data visualization'],
};

export const projects: Project[] = [
  {
    id: 'world-cup-lab',
    title: 'World Cup Performance Lab',
    subtitle: 'Sports analytics workspace',
    description:
      'An analytics workspace for comparing national team performance, player profiles, tournament momentum, and tactical indicators across major international competitions.',
    stack: ['React', 'TypeScript', 'Python', 'Data Viz', 'D3.js'],
    impact: 'Makes sports data accessible through clear interactive visuals and scenario-driven analysis — turning raw match data into insight.',
    role: 'Solo builder',
    status: 'In progress',
    year: '2025',
    links: {
      github: 'https://github.com/kidoexpress/world-cup-performance-lab',
    },
  },
  {
    id: 'what-if-sim',
    title: 'What If? Economic Simulator',
    subtitle: 'Policy simulation interface',
    description:
      'A simulation interface for testing how changes in tax policy, labor markets, spending, and inflation assumptions can alter economic trajectories over time.',
    stack: ['React', 'TypeScript', 'Modeling', 'Recharts', 'Python'],
    impact: 'Turns abstract policy tradeoffs into interactive scenarios — making economic reasoning accessible and debatable.',
    role: 'Solo builder',
    status: 'Prototype',
    year: '2025',
    links: {
      github: 'https://github.com/kidoexpress/what-if-economic-simulator',
      demo: 'https://what-if-sim.vercel.app',
    },
  },
  {
    id: 'neuro-detect',
    title: 'NeuroDetectAI',
    subtitle: 'AI-assisted neurological detection',
    description:
      'Research-oriented AI project exploring early detection support for neurological signals through structured clinical and model workflows. Focuses on responsible AI assistance in healthcare contexts.',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'ML pipelines', 'Healthcare data'],
    impact: 'Targets earlier insight into neurological risk indicators — designed to support, not replace, clinical judgment.',
    role: 'AI Research Lead',
    status: 'Research',
    year: '2024–2025',
    links: {},
  },
  {
    id: 'salvar',
    title: 'Salvar o Amanhã',
    subtitle: 'Climate education initiative',
    description:
      'A social-impact initiative connecting climate education, sustainability action, and youth participation through accessible digital storytelling and community organizing tools.',
    stack: ['Product', 'Community', 'Content strategy', 'Research'],
    impact: 'Builds civic engagement around climate and local action — especially for communities underserved by mainstream climate communication.',
    role: 'Founder',
    status: 'Live',
    year: '2023–present',
    links: {},
  },
  {
    id: 'optech',
    title: 'OpTech',
    subtitle: 'Operational coordination platform',
    description:
      'Operational technology concept for improving coordination, program visibility, and decision-making across teams and organizations. Focuses on reducing cognitive overhead in complex operations.',
    stack: ['Product strategy', 'UX design', 'Dashboards', 'Workflow design'],
    impact: 'Frames fragmented operational data as clear, actionable systems — reducing decision latency for program leads.',
    role: 'Product designer',
    status: 'Prototype',
    year: '2024',
    links: {},
  },
  {
    id: 'cs61b',
    title: 'Berkeley CS61B Projects',
    subtitle: 'Data structures & systems',
    description:
      'Coursework projects including BYOW (procedural world generation), graph algorithms, and full data structure implementations. Emphasis on testing, performance, and correct object-oriented design.',
    stack: ['Java', 'Algorithms', 'Data structures', 'JUnit', 'OOP design'],
    impact: 'Strengthened foundations in software correctness, performance analysis, and systematic testing at scale.',
    role: 'Student engineer',
    status: 'Coursework',
    year: '2024–2025',
    links: {
      github: 'https://github.com/kidoexpress',
    },
  },
];

export const skills = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'HTML/CSS'],
  Frontend: ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'D3.js'],
  Backend: ['Node.js', 'REST APIs', 'Authentication', 'PostgreSQL', 'Express'],
  'AI / ML': ['Model evaluation', 'Prompt engineering', 'Scikit-learn', 'Pandas', 'Research workflows'],
  Data: ['Visualization', 'Dashboards', 'Simulation', 'ETL', 'Statistical reasoning'],
  Tools: ['Git', 'GitHub', 'Figma', 'Notion', 'Vercel', 'Linear'],
};

export const experiences: Experience[] = [
  {
    title: 'Product Strategy',
    organization: 'Uber',
    period: '2024',
    description:
      'Explored marketplace dynamics, growth strategy, and product decision frameworks with an emphasis on user behavior, operational constraints, and measurable outcomes.',
    tags: ['Product', 'Strategy', 'Marketplace', 'Growth'],
  },
  {
    title: 'AI Research Lead',
    organization: 'NeuroDetectAI',
    period: '2024–2025',
    description:
      'Directing research framing, model architecture decisions, and evaluation methodology for AI-assisted neurological detection workflows. Focused on responsible deployment and clinical utility.',
    tags: ['AI', 'Healthcare', 'Research', 'ML'],
  },
  {
    title: 'Founder',
    organization: 'Salvar o Amanhã',
    period: '2023–present',
    description:
      'Built a social-impact initiative around climate education, youth engagement, and accessible public-interest communication. Grew community engagement through storytelling-first design.',
    tags: ['Education', 'Climate', 'Impact', 'Community'],
  },
  {
    title: 'Product Designer',
    organization: 'OpTech',
    period: '2024',
    description:
      'Designed early product concepts for operational coordination and decision-support systems — focused on reducing complexity for program managers navigating fragmented toolchains.',
    tags: ['Product', 'UX', 'Systems design', 'Operations'],
  },
  {
    title: 'CS Research & Coursework',
    organization: 'UC Berkeley',
    period: '2023–present',
    description:
      'Coursework spanning data structures, algorithms, AI/ML, and systems programming. Independent research bridging software, policy, and education access.',
    tags: ['CS', 'Research', 'Policy', 'Education'],
  },
];
