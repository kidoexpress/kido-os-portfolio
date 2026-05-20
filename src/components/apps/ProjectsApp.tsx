import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Github, ExternalLink } from 'lucide-react';
import type { Project, ProjectStatus } from '../../data/portfolio';
import { projects } from '../../data/portfolio';

const STATUS: Record<ProjectStatus, { dot: string; label: string; bg: string }> = {
  Live:           { dot: 'bg-emerald-400', label: 'Live',        bg: 'rgba(52,211,153,0.12)' },
  Research:       { dot: 'bg-violet-400',  label: 'Research',    bg: 'rgba(167,139,250,0.12)' },
  'In progress':  { dot: 'bg-amber-400 animate-pulse', label: 'Active', bg: 'rgba(251,191,36,0.1)' },
  Prototype:      { dot: 'bg-orange-400',  label: 'Prototype',   bg: 'rgba(249,115,22,0.1)' },
  Coursework:     { dot: 'bg-zinc-500',    label: 'Coursework',  bg: 'rgba(113,113,122,0.1)' },
};

export function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="app-scroll space-y-4 p-5"
          >
            {/* Back / header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS[selected.status].dot}`} />
                  <span className="text-[0.6rem] text-white/35 uppercase tracking-[0.14em] font-mono">
                    {STATUS[selected.status].label}
                  </span>
                </div>
                <h3 className="text-[0.92rem] font-semibold text-white">{selected.title}</h3>
                <p className="text-[0.62rem] text-white/30 mt-0.5">{selected.subtitle} · {selected.year}</p>
              </div>
              <button onClick={() => setSelected(null)} className="os-btn-icon shrink-0"><X size={12} /></button>
            </div>

            <div className="space-y-4 pt-1 border-t border-white/[0.07]">
              <div>
                <p className="app-eyebrow mb-1.5">Overview</p>
                <p className="text-[0.78rem] leading-6 text-white/60">{selected.description}</p>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <p className="app-eyebrow mb-1.5">Impact</p>
                <p className="text-[0.78rem] leading-5 text-white/65">{selected.impact}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><p className="app-eyebrow mb-1">Role</p><p className="text-[0.77rem] text-white/60">{selected.role}</p></div>
                <div><p className="app-eyebrow mb-1">Year</p><p className="text-[0.77rem] text-white/60">{selected.year}</p></div>
              </div>
              <div>
                <p className="app-eyebrow mb-2">Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.stack.map((s) => <span key={s} className="os-tag">{s}</span>)}
                </div>
              </div>
              {(selected.links.github || selected.links.demo) && (
                <div className="flex gap-2 pt-1">
                  {selected.links.github && (
                    <a href={selected.links.github} target="_blank" rel="noopener noreferrer" className="os-btn-ghost text-[0.72rem] gap-1.5">
                      <Github size={12} /> GitHub
                    </a>
                  )}
                  {selected.links.demo && (
                    <a href={selected.links.demo} target="_blank" rel="noopener noreferrer" className="os-btn-primary text-[0.72rem] gap-1.5">
                      <ExternalLink size={12} /> Demo
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="app-scroll p-3 space-y-1"
          >
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.045, duration: 0.22 }}
                onClick={() => setSelected(p)}
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150"
                style={{ border: '1px solid transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)', e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '', e.currentTarget.style.border = '1px solid transparent')}
              >
                <span className={`shrink-0 h-1.5 w-1.5 rounded-full ${STATUS[p.status].dot}`} />
                <span className="flex-1 text-[0.8rem] text-white/70 group-hover:text-white transition-colors">{p.title}</span>
                <span className="shrink-0 text-[0.58rem] text-white/25 font-mono uppercase tracking-[0.1em]">{STATUS[p.status].label}</span>
                <ArrowUpRight size={11} className="shrink-0 text-white/20 group-hover:text-white/50 transition-colors" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
