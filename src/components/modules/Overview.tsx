import { type Variants, motion } from 'framer-motion';
import { ArrowUpRight, Zap, BookOpen, Cpu, FlaskConical } from 'lucide-react';
import { profile, about, projects, experiences, skills } from '../../data/portfolio';

const containerVariants: Variants = {
  animate: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.4, ease: [0.0, 0.0, 0.2, 1] as const };

const STATUS_DOT: Record<string, string> = {
  Live: 'bg-moss animate-pulse-dot',
  Research: 'bg-violet',
  'In progress': 'bg-citrus animate-pulse-dot',
  Prototype: 'bg-ember',
  Coursework: 'bg-zinc-600',
};

export function Overview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const liveProjects = projects.filter((p) => p.status !== 'Coursework').length;
  const skillAreas = Object.keys(skills).length;
  const researchItems = experiences.filter((e) =>
    e.tags.some((t) => ['AI', 'Research', 'CS'].includes(t))
  ).length;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="space-y-8 p-8 max-w-3xl"
    >
      {/* Identity block */}
      <motion.div variants={itemVariants} transition={itemTransition} className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="status-dot-live" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-zinc-500">
            System online
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-white leading-tight">
            {profile.name}
          </h1>
          <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-zinc-500">
            {profile.role}
          </p>
        </div>
        <p className="max-w-lg text-[0.9rem] leading-7 text-zinc-400">{profile.tagline}</p>
      </motion.div>

      {/* System stats */}
      <motion.div variants={itemVariants} transition={itemTransition}>
        <div className="mb-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-zinc-700">
          Active systems
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Projects', value: liveProjects, icon: <FlaskConical size={14} />, accent: 'text-signal' },
            { label: 'Research', value: researchItems, icon: <BookOpen size={14} />, accent: 'text-violet' },
            { label: 'Skill areas', value: skillAreas, icon: <Cpu size={14} />, accent: 'text-moss' },
          ].map((stat) => (
            <div key={stat.label} className="panel p-4 space-y-2">
              <span className={stat.accent}>{stat.icon}</span>
              <div className="text-2xl font-semibold text-white tabular-nums">{stat.value}</div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-zinc-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Current focus */}
      <motion.div variants={itemVariants} transition={itemTransition} className="panel p-5">
        <div className="flex items-start gap-3">
          <Zap size={14} className="mt-0.5 shrink-0 text-citrus" />
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-zinc-600 mb-1.5">
              Current focus
            </p>
            <p className="text-sm leading-6 text-zinc-300">{profile.focus}</p>
          </div>
        </div>
      </motion.div>

      {/* Recent experiments */}
      <motion.div variants={itemVariants} transition={itemTransition}>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-zinc-700">
            Recent experiments
          </span>
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-zinc-600 hover:text-signal transition-colors duration-150"
          >
            View all <ArrowUpRight size={10} />
          </button>
        </div>
        <div className="space-y-1">
          {projects.slice(0, 4).map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.3, ease: 'easeOut' }}
              onClick={() => onNavigate('projects')}
              className="flex w-full items-center gap-3 border border-transparent px-3 py-2.5 text-left transition-all duration-150 hover:border-line hover:bg-white/[0.025] group"
            >
              <span className={`status-dot ${STATUS_DOT[p.status]}`} />
              <span className="flex-1 text-sm text-zinc-300 group-hover:text-white transition-colors duration-150">
                {p.title}
              </span>
              <span className="font-mono text-[0.6rem] text-zinc-600 uppercase tracking-[0.12em]">
                {p.year}
              </span>
              <ArrowUpRight
                size={12}
                className="text-zinc-700 group-hover:text-signal opacity-0 group-hover:opacity-100 transition-all duration-150"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* About */}
      <motion.div variants={itemVariants} transition={itemTransition} className="border-t border-line pt-8 pb-4">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-zinc-700 mb-3">
          Background
        </p>
        <p className="max-w-xl text-sm leading-7 text-zinc-400">{about.body}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {about.interests.map((interest) => (
            <span key={interest} className="tech-tag">
              {interest}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
