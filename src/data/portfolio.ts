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
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'SQL', 'HTML/CSS', 'C', 'C++', 'Bash', 'R', 'Swift', 'Scheme', 'Prisma Schema', 'LaTeX', 'Postgres'],
  Frontend:  ['React', 'Vite', 'TailwindCSS', 'Framer Motion', 'D3.js', 'Next.js'],
  Backend:   ['Node.js', 'REST APIs', 'Authentication', 'PostgreSQL', 'Express', 'Prisma'],
  'AI / ML': ['Model evaluation', 'Prompt engineering', 'Scikit-learn', 'Pandas', 'Research workflows', 'Computer vision', 'CNNs', 'Data pipelines'],
  Data:      ['Visualization', 'Dashboards', 'Simulation', 'ETL', 'Statistical reasoning', 'Data analysis', 'Forecast modeling'],
  Tools:     ['Git', 'GitHub', 'Figma', 'Notion', 'Vercel', 'Linear', 'Docker', 'Postman'],
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

/* ── Coursework & Certificates ──────────────────────────────── */

export type CourseStatus = 'Completed' | 'Current' | 'Research' | 'Audited';

export type Course = {
  id: string;
  code?: string;
  name: string;
  institution: string;
  category: string;
  status: CourseStatus;
  description?: string;
  tags?: string[];       /* hover-reveal topic chips */
  external?: boolean;    /* drives "External Programs" visual treatment */
};

export type Certificate = {
  id: string;
  title: string;
  org: string;
  date: string;
  link?: string;
};

export const coursework: Course[] = [
  /* ── Computer Science ─────────────────────────────── */
  {
    id: 'cs61a', code: 'CS 61A',
    name: 'Structure & Interpretation of Computer Programs',
    institution: 'UC Berkeley', category: 'Computer Science', status: 'Completed',
    description: 'Functional, procedural, and OOP paradigms; recursion, abstraction, interpreters',
  },
  {
    id: 'cs61b', code: 'CS 61B',
    name: 'Data Structures',
    institution: 'UC Berkeley', category: 'Computer Science', status: 'Completed',
    description: 'Algorithms, data structures, and object-oriented design in Java',
  },
  {
    id: 'cs61c', code: 'CS 61C',
    name: 'Machine Structures',
    institution: 'UC Berkeley', category: 'Computer Science', status: 'Completed',
    description: 'C programming, RISC-V assembly, computer organization and architecture',
  },
  {
    id: 'cs36', code: 'CS 36',
    name: 'Technology, Society & the Future of Industry',
    institution: 'UC Berkeley', category: 'Computer Science', status: 'Current',
    description: 'Seminar exploring AI, automation, startups, technological shifts, and the future direction of the tech industry',
  },
  {
    id: 'cs50', code: 'CS50',
    name: 'Introduction to Computer Science',
    institution: 'Harvard', category: 'Computer Science', status: 'Completed',
    description: 'C, Python, SQL, HTML/CSS/JS — Harvard\'s foundational CS breadth course',
  },
  {
    id: 'eneres172', code: 'ENERES 172',
    name: 'Techno-Optimism & Ecomodernism',
    institution: 'UC Berkeley', category: 'Computer Science', status: 'Current',
    description: 'Technology, automation, energy systems, industrial development, and the future of civilization — examining techno-optimism and ecomodernist frameworks',
  },
  /* ── Systems & Low Level ─────────────────────────── */
  {
    id: 'cs447', code: 'CS 0447',
    name: 'Computer Organization and Assembly Language',
    institution: 'University of Pittsburgh', category: 'Systems', status: 'Completed',
    description: 'Assembly, memory layout, CPU execution, low-level systems thinking, computer architecture fundamentals',
  },
  {
    id: 'cs449', code: 'CS 0449',
    name: 'Introduction to Systems Software',
    institution: 'University of Pittsburgh', category: 'Systems', status: 'Completed',
    description: 'C programming, debugging, linking/loading, Unix tooling, memory management, systems-level development',
  },
  {
    id: 'cs1550', code: 'CS 1550',
    name: 'Introduction to Operating Systems',
    institution: 'University of Pittsburgh', category: 'Systems', status: 'Completed',
    description: 'Processes, threads, synchronization, virtual memory, scheduling, file systems, concurrency',
  },
  /* ── Mathematics ──────────────────────────────────── */
  {
    id: 'math51', code: 'MATH 51',
    name: 'Linear Algebra & Differential Calculus',
    institution: 'UC Berkeley', category: 'Mathematics', status: 'Completed',
    description: 'Vectors, matrices, linear transformations, multivariable derivatives',
  },
  {
    id: 'math52', code: 'MATH 52',
    name: 'Integral Calculus of Several Variables',
    institution: 'UC Berkeley', category: 'Mathematics', status: 'Completed',
    description: 'Double and triple integrals, line integrals, Green\'s theorem',
  },
  {
    id: 'math53', code: 'MATH 53',
    name: 'Multivariable Calculus',
    institution: 'UC Berkeley', category: 'Mathematics', status: 'Current',
    description: 'Gradient, divergence, curl, Stokes\' and divergence theorems',
  },
  /* ── Statistics ──────────────────────────────────── */
  {
    id: 'stat20', code: 'STAT 20',
    name: 'Introduction to Probability and Statistics',
    institution: 'UC Berkeley', category: 'Statistics', status: 'Completed',
    description: 'Statistical reasoning, probability distributions, inference, data interpretation, uncertainty modeling',
  },
  /* ── Economics ────────────────────────────────────── */
  {
    id: 'econ1', code: 'ECON 1',
    name: 'Principles of Economics',
    institution: 'UC Berkeley', category: 'Economics', status: 'Completed',
    description: 'Micro and macroeconomic foundations, markets, fiscal and monetary policy',
  },

  /* ── External Programs ───────────────────────────── */
  {
    id: 'cs231n', code: 'CS231n',
    name: 'Convolutional Neural Networks for Visual Recognition',
    institution: 'Stanford University', category: 'External Programs', status: 'Completed',
    description: 'Deep learning for computer vision, CNN architectures, image recognition, object detection, segmentation, and neural network optimization.',
    tags: ['AI', 'Computer Vision', 'Deep Learning'],
    external: true,
  },
  {
    id: 'cs50w', code: 'CS50W',
    name: "CS50's Web Programming with Python and JavaScript",
    institution: 'Harvard', category: 'External Programs', status: 'Completed',
    description: 'Full-stack web development with Python, Flask, JavaScript, APIs, SQL, authentication, and frontend/backend integration.',
    tags: ['Web Development', 'Full Stack', 'APIs'],
    external: true,
  },
  {
    id: 'cs50cy', code: 'CS50CY',
    name: "CS50's Introduction to Cybersecurity",
    institution: 'Harvard', category: 'External Programs', status: 'Completed',
    description: 'Cybersecurity fundamentals, encryption, authentication, digital privacy, networking security, vulnerabilities, and secure systems design.',
    tags: ['Security', 'Systems', 'Networking'],
    external: true,
  },
];

export const certificates: Certificate[] = [
  { id: 'google-da',  title: 'Google Data Analytics',        org: 'Google',      date: '2024' },
  { id: 'bloomberg',  title: 'Bloomberg Market Concepts',    org: 'Bloomberg',   date: '2024' },
  { id: 'berkeley-r', title: 'Berkeley Research Program',    org: 'UC Berkeley', date: '2024–2025' },
  { id: 'aiml',       title: 'AI / ML Certification',        org: 'Coursera',    date: '2024' },
];
