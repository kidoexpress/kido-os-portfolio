import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Folder, BookOpen, Briefcase, Mail, FlaskConical,
  ExternalLink, Github, ArrowLeft, ChevronRight,
} from 'lucide-react';
import { projects, experiences, skills, about, profile } from '../../data/portfolio';

type Section = 'home' | 'projects' | 'research' | 'experience' | 'contact';

type Props = {
  initialSection?: Section;
  onOpenApp?: (app: string) => void;
};

const NAV: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'home',       label: 'Home',       icon: <Home size={14} /> },
  { id: 'projects',   label: 'Projects',   icon: <FlaskConical size={14} /> },
  { id: 'research',   label: 'Research',   icon: <BookOpen size={14} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={14} /> },
  { id: 'contact',    label: 'Contact',    icon: <Mail size={14} /> },
];

const STATUS_COLOR: Record<string, string> = {
  'Live':        '#16c60c',
  'In progress': '#f1bc31',
  'Research':    '#a78bfa',
  'Prototype':   '#fb923c',
  'Coursework':  '#6b7280',
};

export function FileExplorer({ initialSection = 'home' }: Props) {
  const [section, setSection] = useState<Section>(initialSection);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const selected = projects.find((p) => p.id === selectedProject);

  return (
    <div className="explorer-root">
      {/* Sidebar */}
      <div className="explorer-sidebar">
        <div className="explorer-sidebar-section">Quick access</div>
        {NAV.map((item) => (
          <div
            key={item.id}
            className={`explorer-sidebar-item${section === item.id ? ' active' : ''}`}
            onClick={() => { setSection(item.id); setSelectedProject(null); }}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
        <div className="explorer-sidebar-section" style={{ marginTop: 8 }}>Devices</div>
        <div className="explorer-sidebar-item">
          <Folder size={14} />
          This PC
        </div>
        <div className="explorer-sidebar-item">
          <Folder size={14} />
          Documents
        </div>
      </div>

      {/* Main area */}
      <div className="explorer-content-layout">
        {/* Toolbar / address bar */}
        <div className="explorer-toolbar">
          <button className="explorer-toolbar-btn" onClick={() => setSelectedProject(null)}>
            <ArrowLeft size={14} />
          </button>
          <div className="explorer-address">
            <Folder size={12} style={{ opacity: 0.5 }} />
            <span>This PC</span>
            <ChevronRight size={11} style={{ opacity: 0.3 }} />
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
            {selectedProject && (
              <>
                <ChevronRight size={11} style={{ opacity: 0.3 }} />
                <span style={{ color: 'rgba(255,255,255,0.75)' }}>{selected?.title}</span>
              </>
            )}
          </div>
        </div>

        <div className="explorer-main app-scroll">
          <AnimatePresence mode="wait">
            {section === 'home' && !selectedProject && (
              <HomeSection key="home" onNavigate={setSection} />
            )}
            {section === 'projects' && !selectedProject && (
              <ProjectsSection key="projects" onSelect={setSelectedProject} />
            )}
            {section === 'projects' && selectedProject && selected && (
              <ProjectDetail key={selectedProject} project={selected} onBack={() => setSelectedProject(null)} />
            )}
            {section === 'research' && (
              <ResearchSection key="research" />
            )}
            {section === 'experience' && (
              <ExperienceSection key="experience" />
            )}
            {section === 'contact' && (
              <ContactSection key="contact" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─── Sections ─────────────────────────────────────────────── */

function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      {/* Identity */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, padding: '4px 2px' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg,#0078d4,#5c2d91)',
          display: 'grid', placeItems: 'center',
          fontSize: 18, fontWeight: 300, color: 'white',
        }}>JK</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{profile.name}</div>
          <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{profile.role}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.30)', marginTop: 2 }}>{profile.location}</div>
        </div>
      </div>

      <div style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)', marginBottom: 24, maxWidth: 520 }}>
        {about.headline}
      </div>

      <div className="explorer-section-label">Quick access</div>
      <div className="explorer-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
        {NAV.filter(n => n.id !== 'home').map((item) => (
          <div key={item.id} className="explorer-card" onClick={() => onNavigate(item.id)}>
            <div className="explorer-card-icon" style={{ background: '#0078d4', color: 'white' }}>
              {item.icon}
            </div>
            <div className="explorer-card-name">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="explorer-section-label" style={{ marginTop: 20 }}>Research interests</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {about.interests.map((i) => (
          <span key={i} className="explorer-tag">{i}</span>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectsSection({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      <div className="explorer-section-label">All Projects ({projects.length})</div>
      <div className="explorer-list">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            className="explorer-list-row"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.035, duration: 0.18 }}
            onClick={() => onSelect(p.id)}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 6,
              background: 'rgba(0,120,212,0.18)', display: 'grid', placeItems: 'center',
            }}>
              <FlaskConical size={15} style={{ color: '#0078d4' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 400 }}>{p.title}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>{p.subtitle}</div>
            </div>
            <span style={{ fontSize: 11, color: STATUS_COLOR[p.status] ?? '#6b7280' }}>● {p.status}</span>
            <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.25)', width: 36 }}>{p.year}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectDetail({ project: p, onBack }: { project: typeof projects[0]; onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }} transition={{ duration: 0.16 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
    >
      <button className="win-btn" style={{ alignSelf: 'flex-start', gap: 5, marginBottom: 4 }} onClick={onBack}>
        <ArrowLeft size={13} /> Back
      </button>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: STATUS_COLOR[p.status] ?? '#6b7280', display: 'inline-block' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.status}</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>{p.title}</div>
        <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.38)', marginTop: 3 }}>{p.subtitle} · {p.year}</div>
      </div>

      <div style={{ padding: 16, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="explorer-section-label" style={{ marginBottom: 8 }}>Overview</div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.62)' }}>{p.description}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ padding: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="explorer-section-label" style={{ marginBottom: 6 }}>Impact</div>
          <div style={{ fontSize: 12.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.55)' }}>{p.impact}</div>
        </div>
        <div style={{ padding: 14, background: 'rgba(255,255,255,0.03)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="explorer-section-label" style={{ marginBottom: 6 }}>Role</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{p.role}</div>
          <div className="explorer-section-label" style={{ marginBottom: 6, marginTop: 12 }}>Year</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{p.year}</div>
        </div>
      </div>

      <div>
        <div className="explorer-section-label" style={{ marginBottom: 8 }}>Stack</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {p.stack.map((s) => <span key={s} className="explorer-tag">{s}</span>)}
        </div>
      </div>

      {(p.links.github || p.links.demo) && (
        <div style={{ display: 'flex', gap: 8 }}>
          {p.links.github && (
            <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="win-btn">
              <Github size={13} /> GitHub
            </a>
          )}
          {p.links.demo && (
            <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="win-btn-primary">
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

function ResearchSection() {
  const items = [
    { title: 'AI-assisted Healthcare', sub: 'Early detection of neurological signals using structured clinical AI workflows.', tag: 'Active', color: '#16c60c' },
    { title: 'Economic Simulation', sub: 'Policy modeling through interactive simulation — making tradeoffs legible.', tag: '2024–', color: '#f1bc31' },
    { title: 'Civic Tech', sub: 'Public-interest software for underserved communities and government transparency.', tag: '2023–', color: '#0078d4' },
    { title: 'CS Education & Access', sub: 'Lowering barriers to computing through curriculum design and tooling.', tag: 'Ongoing', color: '#a78bfa' },
    { title: 'Distributed AI Inference', sub: 'Exploring architectures for efficient multi-agent AI at the edge.', tag: 'Exploring', color: '#fb923c' },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      <div className="explorer-section-label">Research Areas</div>
      <div className="explorer-list" style={{ gap: 2 }}>
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            className="explorer-list-row"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.18 }}
            style={{ alignItems: 'flex-start', padding: '12px 10px' }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 5 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{item.title}</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.45)', marginTop: 3, lineHeight: 1.5 }}>{item.sub}</div>
            </div>
            <span style={{ fontSize: 11, color: item.color, flexShrink: 0, marginTop: 2 }}>{item.tag}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceSection() {
  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      <div className="explorer-section-label">Work & Research History</div>
      <div style={{ position: 'relative', paddingLeft: 20 }}>
        <div style={{ position: 'absolute', left: 6, top: 8, bottom: 8, width: 1, background: 'rgba(255,255,255,0.08)' }} />
        {experiences.map((e, i) => (
          <motion.div
            key={`${e.title}-${e.organization}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.2 }}
            style={{ position: 'relative', paddingBottom: 20 }}
          >
            <div style={{
              position: 'absolute', left: -20, top: 5,
              width: 10, height: 10, borderRadius: '50%',
              border: '1.5px solid #0078d4', background: 'rgba(0,120,212,0.18)',
            }} />
            <div style={{ display: 'flex', gap: 8, marginBottom: 4, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#0078d4', fontWeight: 500 }}>{e.organization}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>·</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{e.period}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.88)', marginBottom: 5 }}>{e.title}</div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6 }}>{e.description}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
              {e.tags.map((t) => <span key={t} className="explorer-tag">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 4, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="explorer-section-label" style={{ marginBottom: 10 }}>Skills</div>
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
            <span style={{ width: 80, flexShrink: 0, fontSize: 11.5, color: 'rgba(255,255,255,0.3)', paddingTop: 3 }}>{group}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {items.map((s) => <span key={s} className="explorer-tag">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ContactSection() {
  const links = [
    { label: 'Email', value: 'hello@joaokido.com', href: 'mailto:hello@joaokido.com', color: '#0078d4' },
    { label: 'GitHub', value: 'github.com/joaokido', href: 'https://github.com/joaokido', color: '#6e5494' },
    { label: 'LinkedIn', value: 'linkedin.com/in/joaokido', href: 'https://linkedin.com/in/joaokido', color: '#0a66c2' },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.88)', marginBottom: 8 }}>
          Want to build something together?
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.48)', maxWidth: 480 }}>
          Open to ambitious projects in AI, product, policy, and education. Based in Berkeley — remote-friendly.
        </div>
      </div>

      <div className="explorer-section-label">Contact</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="explorer-list-row"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <div style={{ width: 32, height: 32, borderRadius: 6, background: link.color, display: 'grid', placeItems: 'center' }}>
              <ExternalLink size={14} style={{ color: 'white' }} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)' }}>{link.label}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{link.value}</div>
            </div>
          </a>
        ))}
      </div>

      <div style={{
        padding: 14, background: 'rgba(0,120,212,0.08)', border: '1px solid rgba(0,120,212,0.2)',
        borderRadius: 8, fontSize: 12.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65,
      }}>
        I respond to thoughtful, specific messages about interesting work.
      </div>
    </motion.div>
  );
}
