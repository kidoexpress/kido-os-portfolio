import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/portfolio';

const LINKS = [
  { label: 'Email', value: 'hello@joaokido.com', href: profile.email, icon: <Mail size={15} />, color: 'rgba(34,211,238,0.15)' },
  { label: 'GitHub', value: 'github.com/joaokido', href: profile.github, icon: <Github size={15} />, color: 'rgba(255,255,255,0.08)' },
  { label: 'LinkedIn', value: 'linkedin.com/in/joaokido', href: profile.linkedin, icon: <Linkedin size={15} />, color: 'rgba(59,130,246,0.15)' },
];

export function ContactApp() {
  return (
    <div className="app-scroll space-y-5 p-5">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-[0.9rem] font-semibold text-white leading-snug">
          Want to build something together?
        </p>
        <p className="mt-1.5 text-[0.77rem] leading-6 text-white/45">
          Open to ambitious projects in AI, product, policy, and education.
          Based in Berkeley — remote-friendly.
        </p>
      </motion.div>

      <div className="space-y-2">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 + i * 0.07, duration: 0.25 }}
            className="group flex items-center gap-3.5 rounded-xl p-3.5 transition-all duration-150"
            style={{
              background: link.color,
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <span className="shrink-0 text-white/50 group-hover:text-white transition-colors">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[0.8rem] font-medium text-white/80 group-hover:text-white transition-colors">{link.label}</p>
              <p className="font-mono text-[0.62rem] text-white/30 truncate">{link.value}</p>
            </div>
            <ArrowUpRight size={13} className="shrink-0 text-white/20 group-hover:text-white/60 transition-colors" />
          </motion.a>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="border-t border-white/[0.06] pt-4 text-[0.72rem] leading-5 text-white/25"
      >
        I respond to thoughtful, specific messages about interesting work.
      </motion.p>
    </div>
  );
}
