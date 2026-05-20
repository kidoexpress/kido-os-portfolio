import { motion } from 'framer-motion';
import { experiences, skills } from '../../data/portfolio';

export function ExperienceApp() {
  return (
    <div className="app-content space-y-5">
      {/* Timeline */}
      <div className="space-y-0 relative">
        <div className="absolute left-[4px] top-2 bottom-0 w-px bg-white/[0.07]" />

        {experiences.map((item, i) => (
          <motion.div
            key={`${item.title}-${item.organization}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.28 }}
            className="relative pl-6 pb-5 last:pb-0"
          >
            <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full border border-cyan-400/30 bg-cyan-400/15" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-zinc-600">{item.period}</span>
                <span className="h-2.5 w-px bg-white/[0.07]" />
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-cyan-400/60">{item.organization}</span>
              </div>
              <p className="text-[0.82rem] font-medium text-white">{item.title}</p>
              <p className="text-[0.76rem] leading-5 text-zinc-500">{item.description}</p>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {item.tags.map((t) => (
                  <span key={t} className="tech-tag text-[0.6rem]">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skills */}
      <div className="border-t border-white/[0.06] pt-4 space-y-2.5">
        <p className="app-label">Technical skills</p>
        {Object.entries(skills).map(([group, items], i) => (
          <motion.div
            key={group}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.05, duration: 0.25 }}
            className="flex gap-3"
          >
            <span className="w-20 shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-zinc-600 pt-0.5">{group}</span>
            <div className="flex flex-wrap gap-1.5">
              {items.map((s) => (
                <span key={s} className="tech-tag">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
