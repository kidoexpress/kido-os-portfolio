import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Wifi, Settings, Power } from 'lucide-react';
import { profile } from '../data/portfolio';

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [time, setTime]       = useState('');
  const [dateStr, setDateStr] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [photoOk, setPhotoOk]     = useState(true);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }));
    };
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  const handleLogin = useCallback(() => {
    if (loggingIn) return;
    setLoggingIn(true);
    // inline loading for 1.6s, then hand off to desktop
    setTimeout(() => onUnlock(), 1600);
  }, [loggingIn, onUnlock]);

  return (
    <div className="login-root">

      {/* Wallpaper — subtle zoom on login */}
      <motion.div
        className="login-wallpaper"
        animate={loggingIn ? { scale: 1.04 } : { scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />

      {/* Overlay — breathing idle, locks at full opacity on login */}
      <motion.div
        className="login-overlay"
        animate={
          loggingIn
            ? { opacity: 1 }
            : { opacity: [0.85, 1, 0.85] }
        }
        transition={
          loggingIn
            ? { duration: 0.5, ease: 'easeIn' }
            : { duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }
        }
      />

      {/* Clock — bottom left */}
      <motion.div
        className="login-clock"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6, ease: 'easeOut' }}
      >
        <div className="login-time">{time}</div>
        <div className="login-date">{dateStr}</div>
      </motion.div>

      {/*
        User area: outer div owns CSS centering (translate -50%,-50%).
        First motion.div: entrance animation.
        Second motion.div: loggingIn scale-up.
        AnimatePresence: swap controls ↔ loading inline.
      */}
      <div className="login-user">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.32, duration: 0.55, ease: [0.34, 1.1, 0.64, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.div
            animate={{ scale: loggingIn ? 1.04 : 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
          >
            {/* Avatar */}
            <div className="login-avatar">
              {photoOk ? (
                <img
                  src="/avatar.png"
                  alt={profile.name}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center 20%',
                    display: 'block',
                  }}
                  onError={() => setPhotoOk(false)}
                />
              ) : (
                profile.initials
              )}
            </div>

            {/* Name — always visible */}
            <div className="login-name">{profile.name}</div>

            {/* Controls / Loading — animated swap */}
            <AnimatePresence mode="wait">
              {!loggingIn ? (
                <motion.div
                  key="controls"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
                >
                  <button className="login-btn" onClick={handleLogin}>
                    Login
                    <ArrowRight size={13} />
                  </button>
                  <span className="login-hint">Click to log in</span>
                </motion.div>
              ) : (
                <motion.div
                  key="logging"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}
                >
                  <div className="login-spinner-ring" />
                  <span className="login-logging-text">Logging in...</span>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      </div>

      {/* System tray — bottom right */}
      <motion.div
        className="login-tray"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.44, duration: 0.6 }}
      >
        <div className="login-tray-icon" title="Network"><Wifi size={16} strokeWidth={1.8} /></div>
        <div className="login-tray-icon" title="Settings"><Settings size={16} strokeWidth={1.8} /></div>
        <div className="login-tray-icon" title="Power"><Power size={16} strokeWidth={1.8} /></div>
      </motion.div>

    </div>
  );
}
