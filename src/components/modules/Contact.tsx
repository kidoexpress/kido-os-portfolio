import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { profile } from '../../data/portfolio';

const LINKS = [
  {
    label: 'Email',
    value: 'joaokido@berkeley.edu',
    href: profile.email,
    icon: <Mail size={16} />,
    desc: 'Best for project proposals and longer conversations.',
  },
  {
    label: 'GitHub',
    value: 'github.com/kidoexpress',
    href: profile.github,
    icon: <Github size={16} />,
    desc: 'See what I\'m building.',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/joao-guilherme-kido-carvalho',
    href: profile.linkedin,
    icon: <Linkedin size={16} />,
    desc: 'Professional background and connections.',
  },
];

export function Contact(_: { onNavigate: (id: string) => void }) {
  return (
    <div className="p-8 space-y-10 max-w-xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-4"
      >
        <p className="section-eyebrow">Contact</p>
        <h2 className="text-2xl font-semibold text-white leading-tight">
          Want to build something together?
        </h2>
        <p className="text-sm leading-7 text-zinc-400 max-w-md">
          I'm interested in ambitious projects that combine technical depth, thoughtful product design,
          and real-world usefulness. Based in Berkeley — open to remote collaboration.
        </p>
      </motion.div>

      {/* Contact links */}
      <div className="space-y-2">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.35, ease: 'easeOut' }}
            className="group flex items-start gap-4 border border-line bg-white/[0.02] p-4 transition-all duration-200 hover:border-line-bright hover:bg-white/[0.04]"
          >
            <span className="mt-0.5 shrink-0 text-zinc-600 group-hover:text-signal transition-colors duration-150">
              {link.icon}
            </span>
            <div className="flex-1 min-w-0 space-y-0.5">
              <p className="text-sm font-medium text-white">{link.label}</p>
              <p className="font-mono text-[0.65rem] text-zinc-500 truncate">{link.value}</p>
              <p className="text-[0.78rem] text-zinc-600">{link.desc}</p>
            </div>
            <ArrowUpRight
              size={14}
              className="mt-0.5 shrink-0 text-zinc-700 group-hover:text-signal transition-colors duration-150"
            />
          </motion.a>
        ))}
      </div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="border-t border-line pt-6"
      >
        <p className="text-[0.78rem] leading-6 text-zinc-600">
          I read everything and respond to messages that are thoughtful and specific.
          If you're working on something interesting — in AI, product, policy, or education —
          I'd love to hear from you.
        </p>
      </motion.div>
    </div>
  );
}
