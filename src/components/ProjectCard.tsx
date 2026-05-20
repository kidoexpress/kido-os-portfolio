import { ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';

const statusClass: Record<Project['status'], string> = {
  Live: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-200',
  Research: 'border-signal/30 bg-signal/10 text-cyan-100',
  'In progress': 'border-citrus/30 bg-citrus/10 text-amber-100',
  Coursework: 'border-white/15 bg-white/8 text-zinc-200',
  Prototype: 'border-ember/30 bg-ember/10 text-orange-100',
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: 'easeOut' }}
      className="group flex h-full flex-col justify-between border border-line bg-white/[0.035] p-5 shadow-glow backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
    >
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold leading-tight text-white">{project.title}</h3>
          <span
            className={`shrink-0 border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] ${statusClass[project.status]}`}
          >
            {project.status}
          </span>
        </div>
        <p className="text-sm leading-7 text-zinc-300">{project.description}</p>
        <p className="mt-5 border-l border-signal/40 pl-4 text-sm leading-6 text-mist">
          {project.impact}
        </p>
      </div>

      <div className="mt-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-[0.72rem] text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {project.links.github ? (
            <a className="icon-link" href={project.links.github} aria-label={`${project.title} GitHub`}>
              <Github size={16} />
            </a>
          ) : null}
          {project.links.demo ? (
            <a className="text-link" href={project.links.demo}>
              View <ArrowUpRight size={15} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
