import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const countries = ['Brazil', 'Argentina', 'France', 'Germany', 'Japan', 'Morocco', 'USA', 'England'];

function hashMatch(a: string, b: string) {
  return [...`${a}-${b}`].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function WorldCupSimulator() {
  const [home, setHome] = useState('Brazil');
  const [away, setAway] = useState('France');
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<null | { home: number; draw: number; away: number; note: string }>(null);

  const probability = useMemo(() => {
    const seed = hashMatch(home, away);
    const h = 35 + (seed % 28);
    const d = 16 + (seed % 13);
    const a = Math.max(8, 100 - h - d);
    return { home: h, draw: d, away: a };
  }, [home, away]);

  const runSimulation = () => {
    setRunning(true);
    setResult(null);
    window.setTimeout(() => {
      setRunning(false);
      const winner = probability.home > probability.away ? home : away;
      setResult({
        ...probability,
        note: `${winner} edges it after 10,000 extremely fake Monte Carlo runs.`,
      });
    }, 1150);
  };

  return (
    <div className="sim-app app-scroll">
      <div className="sim-header">
        <span>WorldCupSim.exe</span>
        <strong>Retro analytics terminal</strong>
      </div>
      <div className="sim-selectors">
        <label>
          Team A
          <select value={home} onChange={(e) => setHome(e.target.value)}>
            {countries.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>
          Team B
          <select value={away} onChange={(e) => setAway(e.target.value)}>
            {countries.filter((c) => c !== home).map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <button className="sim-run" onClick={runSimulation} disabled={running}>
        {running ? 'Running simulation...' : 'Run Monte Carlo'}
      </button>

      <AnimatePresence>
        {running && (
          <motion.div className="sim-loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.span initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.1, ease: 'easeInOut' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {result && (
        <motion.div className="sim-result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div><span>{home}</span><strong>{result.home}%</strong></div>
          <div><span>Draw</span><strong>{result.draw}%</strong></div>
          <div><span>{away}</span><strong>{result.away}%</strong></div>
          <p>{result.note}</p>
        </motion.div>
      )}
    </div>
  );
}
