import { motion } from 'framer-motion';
import { experiences, skills } from '../../data/portfolio';

export function Experience(_: { onNavigate: (id: string) => void }) {
  return (
    <div className="p-8 space-y-10 max-w-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-1"
      >
        <p className="section-eyebrow">Experience</p>
        <h2 className="text-2xl font-semibold text-white">
          Work shaped by product judgment and research discipline.
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="space-y-0 relative">
        {/* Timeline line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-line" />

        {experiences.map((item, i) => (
          <motion.div
            key={`${item.title}-${item.organization}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
            className="relative pl-8 pb-8 last:pb-0"
          >
            {/* Dot */}
            <div className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border border-signal/30 bg-signal/20" />

            <div className="space-y-2">
              {/* Meta */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-zinc-600">
                  {item.period}
                </span>
                <span className="h-3 w-px bg-line" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-signal/70">
                  {item.organization}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-white leading-tight">{item.title}</h3>

              {/* Description */}
              <p className="text-sm leading-7 text-zinc-400">{item.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.tags.map((tag) => (
                  <span key={tag} className="tech-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="pt-4 border-t border-line space-y-6"
      >
        <div>
          <p className="section-eyebrow mb-5">Technical skills</p>
          <div className="space-y-4">
            {Object.entries(skills).map(([group, items], i) => (
              <motion.div
                key={group}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
                className="grid grid-cols-[140px_1fr] gap-4 items-start"
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-zinc-600 pt-1">
                  {group}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span key={skill} className="tech-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
