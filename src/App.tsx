import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BootScreen } from './components/BootScreen';
import { LockScreen } from './components/LockScreen';
import { Desktop } from './components/Desktop';
import './styles.css';

type Stage = 'boot' | 'lock' | 'desktop';

export default function App() {
  const [stage, setStage] = useState<Stage>('boot');

  return (
    <div className="h-screen w-screen overflow-hidden bg-black font-sans text-white">
      <AnimatePresence mode="wait">
        {stage === 'boot' && (
          <motion.div
            key="boot"
            className="h-full w-full"
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            <BootScreen onComplete={() => setStage('lock')} />
          </motion.div>
        )}

        {stage === 'lock' && (
          <motion.div
            key="lock"
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.55 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <LockScreen onUnlock={() => setStage('desktop')} />
          </motion.div>
        )}

        {stage === 'desktop' && (
          <motion.div
            key="desktop"
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.55 } }}
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
