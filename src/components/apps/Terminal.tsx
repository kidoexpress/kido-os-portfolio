import { useEffect, useRef, useState } from 'react';
import { projects, experiences, skills, profile } from '../../data/portfolio';

type Line = { id: number; type: 'prompt' | 'output' | 'error' | 'success' | 'dim' | 'blank' | 'heading'; text: string };

let lineId = 0;
const L = (type: Line['type'], text: string): Line => ({ id: lineId++, type, text });

const PROMPT_STR = `C:\\Users\\kido>`;

/* ── Help (ASCII table) ─────────────────────────────── */
const HELP: Line[] = [
  L('blank',   ''),
  L('dim',     '  ┌──────────────────────────────────────────────┐'),
  L('output',  '  │ AVAILABLE COMMANDS                           │'),
  L('dim',     '  ├──────────────────────────────────────────────┤'),
  L('output',  '  │ help        show this help message           │'),
  L('output',  '  │ about       learn about me                   │'),
  L('output',  '  │ projects    browse my projects               │'),
  L('output',  '  │ experience  view experience                  │'),
  L('output',  '  │ research    view research                    │'),
  L('output',  '  │ contact     get contact information          │'),
  L('output',  '  │ clear       clear the terminal               │'),
  L('dim',     '  └──────────────────────────────────────────────┘'),
  L('blank',   ''),
];

/* ── About ──────────────────────────────────────────── */
const ABOUT: Line[] = [
  L('blank',   ''),
  L('success', `  ${profile.name}  ·  ${profile.location}`),
  L('blank',   ''),
  L('output',  `  ${profile.role}`),
  L('blank',   ''),
  L('dim',     `  ${profile.tagline}`),
  L('blank',   ''),
];

/* ── Research ───────────────────────────────────────── */
const RESEARCH: Line[] = [
  L('blank',   ''),
  L('output',  '  AI-assisted healthcare & neurological detection'),
  L('output',  '  Economic simulation & policy modeling'),
  L('output',  '  Civic tech & public-interest software'),
  L('output',  '  CS education & access'),
  L('output',  '  Distributed AI inference'),
  L('blank',   ''),
];

/* ── Dynamic builders ───────────────────────────────── */
const getProjects = (): Line[] => [
  L('blank', ''),
  ...projects.map((p, i) =>
    L('output', `  ${String(i + 1).padStart(2, '0')}  ${p.title.padEnd(38)} [${p.status}]`)
  ),
  L('blank', ''),
];

const getExperience = (): Line[] => [
  L('blank', ''),
  ...experiences.map((e) =>
    L('output', `  ${e.period.padEnd(14)} ${e.organization.padEnd(22)} ${e.title}`)
  ),
  L('blank', ''),
];

const getSkills = (): Line[] => [
  L('blank', ''),
  ...Object.entries(skills).map(([g, items]) =>
    L('output', `  ${g.padEnd(14)} ${items.join('  ·  ')}`)
  ),
  L('blank', ''),
];

const getContact = (): Line[] => [
  L('blank',   ''),
  L('output',  '  LinkedIn:'),
  L('output',  `  ${profile.linkedin}`),
  L('blank',   ''),
  L('output',  '  GitHub:'),
  L('output',  `  ${profile.github}`),
  L('blank',   ''),
  L('output',  '  Email:'),
  L('output',  `  [${profile.email.replace('mailto:', '')}](${profile.email})`),
  L('blank',   ''),
];

const getNeofetch = (): Line[] => {
  const now = new Date();
  return [
    L('blank',   ''),
    L('success', '    ██╗  ██╗██╗██████╗  ██████╗ '),
    L('success', '    ██║ ██╔╝██║██╔══██╗██╔═══██╗'),
    L('success', '    █████╔╝ ██║██║  ██║██║   ██║'),
    L('dim',     '    ██╔═██╗ ██║██║  ██║██║   ██║'),
    L('dim',     '    ██║  ██╗██║██████╔╝╚██████╔╝'),
    L('dim',     '    ╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝ '),
    L('blank',   ''),
    L('output',  `    OS         KidoOS v1.0`),
    L('output',  `    Shell      cmd  5.0`),
    L('output',  `    User       ${profile.name}`),
    L('output',  `    Location   ${profile.location}`),
    L('output',  `    Date       ${now.toLocaleDateString()}`),
    L('output',  `    Projects   ${projects.length} active`),
    L('blank',   ''),
  ];
};

/* ── Boot banner ────────────────────────────────────── */
const BOOT_BANNER: Line[] = [
  L('blank',   ''),
  L('success', '  Welcome to my interactive portfolio.'),
  L('blank',   ''),
  L('dim',     "  type 'help' to see available commands."),
  L('blank',   ''),
  L('heading', '  ABOUT ME'),
  L('blank',   ''),
  L("output",  "  I'm a CS & Economics student at UC Berkeley currently"),
  L('output',  '  working with AI implementation, automation systems, and'),
  L('output',  '  financial technology infrastructure in the banking industry.'),
  L('blank',   ''),
  L('output',  '  I enjoy building software across AI, simulations, data'),
  L('output',  '  visualization, and systems design.'),
  L('blank',   ''),
];

/* Per-type animation delays for cinematic pacing */
const BOOT_DELAY: Record<Line['type'], number> = {
  blank:   16,
  success: 60,
  dim:     34,
  heading: 72,
  output:  24,
  error:   24,
  prompt:  24,
};

/* ── Component ──────────────────────────────────────── */

type Props = { onOpenApp?: (app: string) => void };

export function Terminal({ onOpenApp }: Props) {
  const [history, setHistory] = useState<Line[]>([]);
  const [input, setInput]     = useState('');
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [cmdIdx, setCmdIdx]   = useState(-1);
  const inputRef  = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bootCancelled = useRef(false);

  useEffect(() => {
    let index = 0;
    const timers: number[] = [];

    const tick = () => {
      if (bootCancelled.current) return;
      const line = BOOT_BANNER[index];
      setHistory(BOOT_BANNER.slice(0, index + 1));
      index += 1;
      if (index < BOOT_BANNER.length) {
        timers.push(window.setTimeout(tick, BOOT_DELAY[line.type]));
      }
    };

    timers.push(window.setTimeout(tick, 180));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [history]);

  const run = (cmd: string) => {
    bootCancelled.current = true;
    const trimmed = cmd.trim();
    const [verb]  = trimmed.split(/\s+/);
    const lower = trimmed.toLowerCase();
    const next: Line[] = [L('prompt', `${PROMPT_STR} ${trimmed}`)];

    if (!trimmed) { setHistory((h) => [...h, ...next]); return; }
    setCmdHist((h) => [trimmed, ...h]);
    setCmdIdx(-1);

    if (lower === 'clear') { setHistory([]); return; }

    switch (lower) {
      case 'sudo hire joao':
        next.push(L('success', '  Permission granted.'));
        next.push(L('success', '  Welcome aboard.'));
        break;
      case 'spotify':
        next.push(L('success', '  Opening Spotify...'));
        onOpenApp?.('spotify');
        break;
      case 'linkedin':
        window.open(profile.linkedin, '_blank', 'noopener,noreferrer');
        next.push(L('output', `  Opening LinkedIn: ${profile.linkedin}`));
        break;
      case 'github':
        window.open(profile.github, '_blank', 'noopener,noreferrer');
        next.push(L('output', `  Opening GitHub: ${profile.github}`));
        break;
      case 'email':
        window.location.href = profile.email;
        next.push(L('output', `  Opening email: ${profile.email.replace('mailto:', '')}`));
        break;
      case 'mood':
        next.push(L('output', '  Current mood:'));
        next.push(L('success', '  [███████░░░] debugging CSS at 2am'));
        break;
      case 'origin_story':
        next.push(L('output', '  A builder from Brazil exploring AI, economics,'));
        next.push(L('output', '  product systems, education, and strange internet ideas.'));
        break;
      case 'coffee':
        next.push(L('output', '  Brewing virtual espresso...'));
        next.push(L('success', '  caffeine_level += 17'));
        next.push(L('dim', '  warning: jitters may affect pointer precision'));
        break;
      case 'matrix':
        next.push(L('success', '  Wake up, João...'));
        next.push(L('dim', '  01001010 01001111 01000001 01001111'));
        next.push(L('dim', '  portfolio.shell.inject(lore=true)'));
        break;
      case 'berkeley':
        next.push(L('output', '  Current status:'));
        next.push(L('blank', ''));
        next.push(L('output', '  * CS student surviving project deadlines'));
        next.push(L('output', '  * caffeine dependency: high'));
        next.push(L('output', '  * sleep schedule: corrupted'));
        break;
      case 'easteregg':
        next.push(L('success', '  You found a quiet corner of the OS.'));
        next.push(L('dim', '  Try the wallpaper. Some pixels are suspicious.'));
        break;
      case 'whoami':
        next.push(L('output', '  joao@kido-os'));
        next.push(L('dim', '  CS student · builder · research/product systems enjoyer'));
        break;
      default:
        switch (verb?.toLowerCase()) {
      case 'help':           next.push(...HELP); break;
      case 'about':          next.push(...ABOUT); break;
      case 'projects':       next.push(...getProjects()); break;
      case 'experience':     next.push(...getExperience()); break;
      case 'research':       next.push(...RESEARCH); break;
      case 'skills':         next.push(...getSkills()); break;
      case 'contact':        next.push(...getContact()); break;
      case 'neofetch':       next.push(...getNeofetch()); break;
      case 'date':           next.push(L('output', `  ${new Date().toLocaleString()}`)); break;
      case 'ls':
      case 'dir':
        next.push(L('dim',    '  Directory of C:\\Users\\kido'));
        next.push(L('blank',  ''));
        next.push(L('output', '  [DIR]  Documents'));
        next.push(L('output', '  [DIR]  Projects'));
        next.push(L('output', '  [DIR]  Research'));
        next.push(L('output', '  [FILE] contact.txt'));
        next.push(L('output', '  [FILE] README.md'));
        next.push(L('blank',  ''));
        break;
      case 'ver':
        next.push(L('output', '  KidoOS Terminal [Version 1.0.0]'));
        break;
      case 'exit':
        next.push(L('dim', '  This terminal cannot be closed from within.'));
        break;
      default:
        next.push(L('error', `  '${verb}' is not recognized as an internal or external command.`));
        next.push(L('dim',   '  Type "help" to see available commands.'));
        }
    }

    next.push(L('blank', ''));
    setHistory((h) => [...h, ...next]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      run(input);
      setInput('');
      setTimeout(() => inputRef.current?.focus(), 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(cmdIdx + 1, cmdHist.length - 1);
      setCmdIdx(idx); setInput(cmdHist[idx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(cmdIdx - 1, -1);
      setCmdIdx(idx); setInput(idx === -1 ? '' : (cmdHist[idx] ?? ''));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cmds = ['help','about','projects','experience','research','skills','contact','linkedin','github','email','neofetch','ls','dir','clear','date','ver','sudo hire joao','spotify','mood','origin_story','coffee','matrix','berkeley','whoami','easteregg'];
      const match = cmds.find((c) => c.startsWith(input) && c !== input);
      if (match) setInput(match);
    }
  };

  const COLOR: Record<Line['type'], string> = {
    prompt:  'terminal-prompt',
    output:  'terminal-output',
    error:   'terminal-error',
    success: 'terminal-success',
    dim:     'terminal-dim',
    blank:   '',
    heading: 'terminal-heading',
  };

  return (
    <div className="win-terminal" onClick={() => inputRef.current?.focus()}>
      {/* Output */}
      <div ref={scrollRef} className="win-terminal-output">
        {history.map((l) => (
          <div key={l.id} className={`whitespace-pre-wrap ${COLOR[l.type]}`}>
            {l.type === 'blank' ? ' ' : l.text}
          </div>
        ))}
      </div>

      {/* Input row */}
      <div className="win-terminal-input-row">
        <span className="terminal-path">{PROMPT_STR}&nbsp;</span>
        <span className="terminal-cursor-wrap">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: 0,
              margin: 0,
              color: '#cccccc',
              caretColor: 'transparent',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              letterSpacing: 'inherit',
              width: `${input.length}ch`,
              minWidth: '1ch',
              display: 'inline',
            }}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <span className="terminal-caret" />
        </span>
      </div>

      {/* Status bar */}
      <div className="win-terminal-bottom">
        <span>Type 'help' for commands</span>
        <span>↕ History&nbsp;&nbsp;·&nbsp;&nbsp;Tab Autocomplete</span>
      </div>
    </div>
  );
}
