import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GridBackground } from './GridBackground';
import { StatusBar } from './StatusBar';
import { Sidebar } from './Sidebar';
import { CommandPalette } from './CommandPalette';
import { Overview } from './modules/Overview';
import { Projects } from './modules/Projects';
import { Experience } from './modules/Experience';
import { Contact } from './modules/Contact';

type Module = 'overview' | 'projects' | 'experience' | 'contact';

const MODULE_COMPONENTS: Record<Module, React.ComponentType<{ onNavigate: (id: string) => void }>> = {
  overview: Overview,
  projects: Projects,
  experience: Experience,
  contact: Contact,
};

export function Workspace() {
  const [activeModule, setActiveModule] = useState<Module>('overview');
  const [paletteOpen, setPaletteOpen] = useState(false);

  const navigate = (id: string) => {
    if (id in MODULE_COMPONENTS) {
      setActiveModule(id as Module);
    }
  };

  // Global keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const ActiveModule = MODULE_COMPONENTS[activeModule];

  return (
    <>
      <GridBackground />

      <div className="workspace" style={{ position: 'relative', zIndex: 2 }}>
        <StatusBar
          activeModule={activeModule}
          onCommandPalette={() => setPaletteOpen(true)}
        />

        <Sidebar
          activeModule={activeModule}
          onNavigate={navigate}
          onCommandPalette={() => setPaletteOpen(true)}
        />

        <main className="workspace-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <ActiveModule onNavigate={navigate} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
      />
    </>
  );
}
