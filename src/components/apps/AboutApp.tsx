import { motion } from 'framer-motion';
import { profile, about, experiences, skills } from '../../data/portfolio';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.32 } },
});

export function AboutApp() {
  return (
    <div className="app-scroll space-y-5 p-5">
      {/* Identity */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-3.5 pb-4 border-b border-white/[0.08]">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-mono text-sm font-semibold text-white"
          style={{ background: 'linear-gradient(135deg,#4c1d95,#7c3aed)', boxShadow: '0 2px 12px rgba(124,58,237,0.4)' }}>
          {profile.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{profile.name}</p>
          <p className="text-[0.65rem] text-white/40 tracking-[0.08em]">{profile.location}</p>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p {...fadeUp(0.06)} className="text-[0.8rem] leading-6 text-white/65">
        {profile.tagline}
      </motion.p>

      {/* Current focus */}
      <motion.div {...fadeUp(0.1)} className="rounded-lg p-3.5" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)' }}>
        <p className="app-eyebrow mb-1">Current Focus</p>
        <p className="text-[0.77rem] leading-5 text-white/60">{profile.focus}</p>
      </motion.div>

      {/* Experience highlights */}
      <motion.div {...fadeUp(0.14)}>
        <p className="app-eyebrow mb-2.5">Experience</p>
        <div className="space-y-2">
          {experiences.slice(0, 4).map((e) => (
            <div key={e.title} className="flex items-baseline justify-between gap-2">
              <span className="text-[0.78rem] text-white/75 font-medium">{e.title}</span>
              <span className="shrink-0 text-[0.65rem] text-white/35">{e.organization}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div {...fadeUp(0.18)}>
        <p className="app-eyebrow mb-2.5">Skills</p>
        <div className="space-y-2">
          {Object.entries(skills).slice(0, 4).map(([group, items]) => (
            <div key={group} className="flex gap-2.5">
              <span className="w-16 shrink-0 text-[0.62rem] text-white/30 pt-0.5">{group}</span>
              <div className="flex flex-wrap gap-1">
                {items.slice(0, 4).map((s) => (
                  <span key={s} className="os-tag">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Interests */}
      <motion.div {...fadeUp(0.22)}>
        <p className="app-eyebrow mb-2">Research Interests</p>
        <div className="flex flex-wrap gap-1.5">
          {about.interests.map((i) => (
            <span key={i} className="os-tag">{i}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
