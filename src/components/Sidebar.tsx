import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FlaskConical,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Terminal,
} from 'lucide-react';
import { profile } from '../data/portfolio';

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const NAV: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={15} /> },
  { id: 'projects', label: 'Projects', icon: <FlaskConical size={15} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={15} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={15} /> },
];

type SidebarProps = {
  activeModule: string;
  onNavigate: (id: string) => void;
  onCommandPalette: () => void;
};

export function Sidebar({ activeModule, onNavigate, onCommandPalette }: SidebarProps) {
  return (
    <aside className="workspace-sidebar flex flex-col border-r border-line bg-void/60 backdrop-blur-sm">
      {/* Profile */}
      <div className="px-4 py-5 border-b border-line">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 shrink-0 place-items-center border border-signal/30 bg-signal/10 font-mono text-[0.62rem] font-medium text-signal">
            {profile.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[0.75rem] font-medium text-white leading-tight">{profile.name}</p>
            <p className="font-mono text-[0.55rem] text-zinc-600 uppercase tracking-[0.12em] leading-tight mt-0.5">
              Berkeley, CA
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3">
        <div className="mb-2 px-4">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-zinc-700">
            Modules
          </span>
        </div>
        {NAV.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25, ease: 'easeOut' }}
            onClick={() => onNavigate(item.id)}
            className={`nav-item w-full text-left ${activeModule === item.id ? 'active' : ''}`}
          >
            <span className="shrink-0">{item.icon}</span>
            <span>{item.label}</span>
            {activeModule === item.id && (
              <motion.span
                layoutId="active-indicator"
                className="ml-auto h-1 w-1 rounded-full bg-signal"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-line px-4 py-4 space-y-3">
        <button
          onClick={onCommandPalette}
          className="flex w-full items-center gap-2.5 text-[0.7rem] text-zinc-600 hover:text-zinc-400 transition-colors duration-150 group"
        >
          <Terminal size={13} />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em]">
            Command palette
          </span>
          <span className="ml-auto font-mono text-[0.55rem] border border-line px-1 py-0.5 group-hover:border-line-bright transition-colors duration-150">
            ⌘K
          </span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="GitHub"
          >
            <Github size={13} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="LinkedIn"
          >
            <Linkedin size={13} />
          </a>
          <a
            href={profile.email}
            className="btn-icon"
            aria-label="Email"
          >
            <Mail size={13} />
          </a>
        </div>
      </div>
    </aside>
  );
}
