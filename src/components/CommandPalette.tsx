import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, FlaskConical, Briefcase, Mail, ArrowRight, Terminal, FolderOpen } from 'lucide-react';
import { projects } from '../data/portfolio';

type CommandItem = {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (module: string) => void;
};

export function CommandPalette({ open, onClose, onNavigate }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = (id: string) => {
    onNavigate(id);
    onClose();
    setQuery('');
    setSelected(0);
  };

  const allItems: CommandItem[] = [
    { id: 'nav-about',      label: 'About',      category: 'Open',    icon: <LayoutDashboard size={14} />, action: () => navigate('about') },
    { id: 'nav-terminal',   label: 'Terminal',   category: 'Open',    icon: <Terminal size={14} />,        action: () => navigate('terminal') },
    { id: 'nav-projects',   label: 'Projects',   category: 'Open',    icon: <FlaskConical size={14} />,    action: () => navigate('projects') },
    { id: 'nav-experience', label: 'Experience', category: 'Open',    icon: <Briefcase size={14} />,       action: () => navigate('experience') },
    { id: 'nav-contact',    label: 'Contact',    category: 'Open',    icon: <Mail size={14} />,            action: () => navigate('contact') },
    { id: 'nav-finder',     label: 'Finder',     category: 'Open',    icon: <FolderOpen size={14} />,      action: () => navigate('finder') },
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      category: 'Projects',
      icon: <ArrowRight size={14} />,
      action: () => navigate('projects'),
    })),
  ];

  const filtered = query.trim()
    ? allItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === 'Enter') {
        filtered[selected]?.action();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selected, onClose]);

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] ?? [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="palette-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="palette-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
              <Search size={15} className="shrink-0 text-zinc-600" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or navigate..."
                className="flex-1 bg-transparent font-mono text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
              />
              <span className="shrink-0 font-mono text-[0.58rem] text-zinc-700 border border-line px-1.5 py-0.5">
                ESC
              </span>
            </div>

            {/* Results */}
            <div className="max-h-[340px] overflow-y-auto py-1">
              {Object.entries(grouped).length === 0 && (
                <p className="px-4 py-6 text-center font-mono text-xs text-zinc-600">
                  No results for "{query}"
                </p>
              )}
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 pt-3 pb-1">
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.2em] text-zinc-700">
                      {category}
                    </span>
                  </div>
                  {items.map((item) => {
                    const globalIndex = filtered.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        onMouseEnter={() => setSelected(globalIndex)}
                        onClick={item.action}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75 ${
                          selected === globalIndex
                            ? 'bg-white/[0.05] text-white'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <span className="shrink-0 text-zinc-600">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                        {selected === globalIndex && (
                          <ArrowRight size={13} className="ml-auto text-signal" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 border-t border-line px-4 py-2">
              <span className="font-mono text-[0.55rem] text-zinc-700 flex items-center gap-1">
                <span className="border border-line px-1">↑↓</span> navigate
              </span>
              <span className="font-mono text-[0.55rem] text-zinc-700 flex items-center gap-1">
                <span className="border border-line px-1">↵</span> select
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
