import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/portfolio';

const LINKS = [
  { label: 'LinkedIn', value: 'linkedin.com/in/joao-guilherme-kido-carvalho', href: profile.linkedin, icon: <Linkedin size={15} /> },
  { label: 'GitHub', value: 'github.com/kidoexpress', href: profile.github, icon: <Github size={15} /> },
  { label: 'Email', value: 'joaokido@berkeley.edu', href: profile.email, icon: <Mail size={15} /> },
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
            className="contact-link-card group"
          >
            <span className="contact-link-icon">{link.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="contact-link-label">{link.label}</p>
              <p className="contact-link-value truncate">{link.value}</p>
            </div>
            <ArrowUpRight size={13} className="contact-link-arrow" />
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
