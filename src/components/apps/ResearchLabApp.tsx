import { useState } from 'react';

const tabs = ['AI', 'Computer Vision', 'Economics Simulations', 'Experiments', 'Product Systems'];

export function ResearchLabApp() {
  const [active, setActive] = useState(tabs[0]);
  return (
    <div className="lab-app app-scroll">
      <div className="lab-terminal-title">/research_lab/private_logs</div>
      <div className="lab-tabs">
        {tabs.map((tab) => (
          <button key={tab} className={active === tab ? 'active' : ''} onClick={() => setActive(tab)}>
            {tab}
          </button>
        ))}
      </div>
      <div className="lab-grid">
        <div className="lab-card">
          <span>LOG_0{tabs.indexOf(active) + 1}</span>
          <h3>{active}</h3>
          <p>
            Hypothesis: useful systems live somewhere between rigorous models,
            humane interfaces, and an unreasonable number of sticky notes.
          </p>
        </div>
        <div className="lab-diagram" aria-label="research signal diagram">
          <i />
          <i />
          <i />
          <span />
        </div>
      </div>
      <div className="lab-console">
        <p>$ run experiment --mode=careful --ship_when_ready</p>
        <p className="ok">status: collecting strange but promising signals</p>
      </div>
    </div>
  );
}
