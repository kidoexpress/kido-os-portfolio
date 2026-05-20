import { AlertTriangle } from 'lucide-react';

export function ChaosApp({ onChaos }: { onChaos?: () => void }) {
  return (
    <div className="chaos-app">
      <AlertTriangle size={34} />
      <h2>DO_NOT_OPEN.exe</h2>
      <p>This file looks important in exactly the wrong way.</p>
      <button onClick={onChaos}>Open anyway</button>
    </div>
  );
}
