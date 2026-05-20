import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight, X, ExternalLink } from 'lucide-react';
import type { Project, ProjectStatus } from '../../data/portfolio';
import { projects } from '../../data/portfolio';

const STATUS_CONFIG: Record<
  ProjectStatus,
  { dot: string; chip: string; label: string }
> = {
  Live:        { dot: 'bg-moss animate-pulse-dot',    chip: 'chip chip-live',       label: 'Live' },
  Research:    { dot: 'bg-violet',                    chip: 'chip chip-research',    label: 'Research' },
  'In progress':{ dot: 'bg-citrus animate-pulse-dot', chip: 'chip chip-progress',   label: 'In progress' },
  Prototype:   { dot: 'bg-ember',                     chip: 'chip chip-prototype',   label: 'Prototype' },
  Coursework:  { dot: 'bg-zinc-600',                  chip: 'chip chip-coursework',  label: 'Coursework' },
};

const FILTERS: Array<{ label: string; value: ProjectStatus | 'All' }> = [
  { label: 'All', value: 'All' },
  { label: 'Live', value: 'Live' },
  { label: 'In progress', value: 'In progress' },
  { label: 'Research', value: 'Research' },
  { label: 'Prototype', value: 'Prototype' },
  { label: 'Coursework', value: 'Coursework' },
];

function ProjectCard({
  project,
  index,
  onExpand,
}: {
  project: Project;
  index: number;
  onExpand: (p: Project) => void;
}) {
  const cfg = STATUS_CONFIG[project.status];
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      className="panel-hover group flex flex-col gap-4 p-5 cursor-pointer"
      onClick={() => onExpand(project)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`status-dot shrink-0 ${cfg.dot}`} />
          <h3 className="text-sm font-semibold text-white leading-tight truncate group-hover:text-signal transition-colors duration-150">
            {project.title}
          </h3>
        </div>
        <span className={cfg.chip}>{cfg.label}</span>
      </div>

      {/* Subtitle */}
      <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-zinc-600">
        {project.subtitle}
      </p>

      {/* Description */}
      <p className="text-[0.82rem] leading-6 text-zinc-400 flex-1">{project.description}</p>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="tech-tag">
            {s}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="tech-tag">+{project.stack.length - 4}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-line">
        <span className="font-mono text-[0.6rem] text-zinc-700">{project.year}</span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-zinc-700 group-hover:text-signal transition-colors duration-150 flex items-center gap-1">
          Details <ArrowUpRight size={10} />
        </span>
      </div>
    </motion.article>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const cfg = STATUS_CONFIG[project.status];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="w-full max-w-xl border border-line-bright bg-[#080b12] shadow-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between border-b border-line p-5 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`status-dot ${cfg.dot}`} />
              <span className={cfg.chip}>{cfg.label}</span>
            </div>
            <h2 className="text-lg font-semibold text-white">{project.title}</h2>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-zinc-600">
              {project.subtitle} · {project.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn-icon shrink-0"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[60vh] overflow-y-auto">
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-zinc-700 mb-2">
              Overview
            </p>
            <p className="text-sm leading-7 text-zinc-300">{project.description}</p>
          </div>

          <div className="panel p-4">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-zinc-700 mb-2">
              Impact
            </p>
            <p className="text-sm leading-6 text-zinc-300">{project.impact}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-zinc-700 mb-2">
                Role
              </p>
              <p className="text-sm text-zinc-300">{project.role}</p>
            </div>
            <div>
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-zinc-700 mb-2">
                Status
              </p>
              <p className="text-sm text-zinc-300">{project.status}</p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-zinc-700 mb-2">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="tech-tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Links */}
        {(project.links.github || project.links.demo) && (
          <div className="flex items-center gap-2 border-t border-line p-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs gap-1.5"
              >
                <Github size={13} /> GitHub
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs gap-1.5"
              >
                <ExternalLink size={13} /> Live demo
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectStatus | 'All'>('All');
  const [expanded, setExpanded] = useState<Project | null>(null);

  const filtered =
    filter === 'All' ? projects : projects.filter((p) => p.status === filter);

  return (
    <>
      <div className="p-8 space-y-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-1"
        >
          <p className="section-eyebrow">Projects</p>
          <h2 className="text-2xl font-semibold text-white">
            Experiments, systems, and shipped work.
          </h2>
          <p className="text-sm text-zinc-500 max-w-lg">
            Click any project to expand details — role, impact, stack, and links.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`font-mono text-[0.62rem] uppercase tracking-[0.12em] px-3 py-1.5 border transition-all duration-150 ${
                filter === f.value
                  ? 'border-signal/40 bg-signal/10 text-signal'
                  : 'border-line text-zinc-600 hover:border-line-bright hover:text-zinc-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onExpand={setExpanded}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {expanded && (
          <ProjectDetail project={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
