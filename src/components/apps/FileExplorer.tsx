import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Folder, BookOpen, Briefcase, Mail, FlaskConical,
  ExternalLink, Github, Linkedin, ArrowLeft, ChevronRight,
  FileText, Download, MapPin, GraduationCap,
} from 'lucide-react';
import { projects, experiences, skills, profile } from '../../data/portfolio';

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

/* ── Home: top-level state (profile ↔ resume viewer) ─── */
function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [imgErr,      setImgErr]      = useState(false);
  const [view,        setView]        = useState<'profile' | 'resume'>('profile');

  return (
    <AnimatePresence mode="wait">
      {view === 'profile' ? (
        <ProfileContent
          key="profile"
          imgErr={imgErr}
          setImgErr={setImgErr}
          onViewResume={() => setView('resume')}
          onNavigate={onNavigate}
        />
      ) : (
        <ResumeViewer key="resume" onBack={() => setView('profile')} />
      )}
    </AnimatePresence>
  );
}

/* ── Profile content ─────────────────────────────────── */
function ProfileContent({
  imgErr, setImgErr, onViewResume, onNavigate,
}: {
  imgErr: boolean;
  setImgErr: (v: boolean) => void;
  onViewResume: () => void;
  onNavigate: (s: Section) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.18 }}
    >
      {/* ── Profile row ──────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        {/* Photo — swap /public/avatar.jpg to update */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.18 }}
          style={{
            width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
            overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.12)',
            background: 'linear-gradient(135deg,#0078d4,#5c2d91)',
            display: 'grid', placeItems: 'center',
            cursor: 'default',
          }}
        >
          {!imgErr ? (
            <img
              src="/avatar.jpg"
              alt="João Kido"
              onError={() => setImgErr(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
            />
          ) : (
            <span style={{ fontSize: 24, fontWeight: 300, color: 'rgba(255,255,255,0.85)' }}>JK</span>
          )}
        </motion.div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 500, color: 'rgba(255,255,255,0.92)', marginBottom: 3 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)', marginBottom: 7 }}>
            CS Student · Builder · Researcher
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={10} style={{ color: 'rgba(255,255,255,0.25)', flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>{profile.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="about-pulse-dot" />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Open to opportunities</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ──────────────────────────────────────── */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.055)', marginBottom: 13 }} />

      {/* ── Currently ────────────────────────────────────── */}
      <div className="about-panel" style={{ marginBottom: 11, padding: '10px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 7, flexShrink: 0,
          background: 'rgba(0,120,212,0.12)',
          border: '1px solid rgba(0,120,212,0.18)',
          display: 'grid', placeItems: 'center',
        }}>
          <Briefcase size={14} style={{ color: '#0078d4' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 2 }}>Currently</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)', fontWeight: 500 }}>Itaú Unibanco</div>
        </div>
        <span style={{
          fontSize: 11, color: 'rgba(255,255,255,0.32)',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 4, padding: '2px 8px',
          whiteSpace: 'nowrap',
        }}>Investment Banking Tech</span>
      </div>

      {/* ── Bio ──────────────────────────────────────────── */}
      <div style={{
        fontSize: 13, lineHeight: 1.74, color: 'rgba(255,255,255,0.55)',
        marginBottom: 12, padding: '11px 13px',
        background: 'rgba(255,255,255,0.025)',
        borderRadius: 8, border: '1px solid rgba(255,255,255,0.055)',
      }}>
        I build software and think carefully about systems. Currently engineering internal
        banking technology at Itaú Unibanco. Also into AI research, simulation tools,
        and cancer biology on the side.
      </div>

      {/* ── Stat cards ───────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 7, marginBottom: 12 }}>
        {[
          { label: 'University', value: 'UC Berkeley', icon: <GraduationCap size={12} style={{ color: '#0078d4' }} /> },
          { label: 'Projects',   value: `${projects.length} active`,  icon: <FlaskConical size={12} style={{ color: '#0078d4' }} /> },
          { label: 'Research',   value: 'Cancer biology', icon: <BookOpen size={12} style={{ color: '#a78bfa' }} /> },
        ].map((fact) => (
          <div key={fact.label} className="about-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
              {fact.icon}
              <span style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.26)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {fact.label}
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.70)', fontWeight: 500 }}>{fact.value}</div>
          </div>
        ))}
      </div>

      {/* ── Tech strip ───────────────────────────────────── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 13 }}>
        {['TypeScript', 'React', 'Python', 'Java', 'SQL', 'AI / ML'].map((t) => (
          <span key={t} className="explorer-tag" style={{ cursor: 'default' }}>{t}</span>
        ))}
      </div>

      {/* ── Resume card ──────────────────────────────────── */}
      <div className="about-resume-card" style={{ marginBottom: 14 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 7, flexShrink: 0,
          background: 'rgba(0,120,212,0.12)',
          border: '1px solid rgba(0,120,212,0.18)',
          display: 'grid', placeItems: 'center',
        }}>
          <FileText size={16} style={{ color: '#0078d4' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.82)', marginBottom: 2 }}>
            Curriculum Vitae
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.26)' }}>
            resume.pdf · drop at /public/resume.pdf
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button
            className="win-btn"
            style={{ fontSize: 12, gap: 5 }}
            onClick={onViewResume}
          >
            <ExternalLink size={12} /> View
          </button>
          <a
            href="/resume.pdf"
            download="joao-kido-resume.pdf"
            className="win-btn-primary"
            style={{ fontSize: 12, gap: 5 }}
          >
            <Download size={12} /> Download
          </a>
        </div>
      </div>

      {/* ── Connect ──────────────────────────────────────── */}
      <div className="explorer-section-label">Connect</div>
      <div style={{ display: 'flex', gap: 7, marginBottom: 18 }}>
        {[
          { label: 'LinkedIn', href: profile.linkedin, icon: <Linkedin size={13} /> },
          { label: 'GitHub',   href: profile.github,   icon: <Github size={13} />   },
          { label: 'Email',    href: profile.email,    icon: <Mail size={13} />      },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="win-btn"
            style={{ flex: 1, justifyContent: 'center', gap: 6, fontSize: 12 }}
          >
            {s.icon} {s.label}
          </a>
        ))}
      </div>

      {/* ── Quick access ─────────────────────────────────── */}
      <div className="explorer-section-label">Quick access</div>
      <div className="explorer-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }}>
        {NAV.filter((n) => n.id !== 'home').map((item) => (
          <div key={item.id} className="explorer-card" onClick={() => onNavigate(item.id)}>
            <div className="explorer-card-icon" style={{ background: '#0078d4', color: 'white' }}>
              {item.icon}
            </div>
            <div className="explorer-card-name">{item.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Embedded resume viewer ──────────────────────────── */
function ResumeViewer({ onBack }: { onBack: () => void }) {
  const [pdfState, setPdfState] = useState<'checking' | 'ready' | 'missing'>('checking');

  useEffect(() => {
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((r) => setPdfState(r.ok && r.headers.get('content-type')?.includes('pdf') ? 'ready' : 'missing'))
      .catch(() => setPdfState('missing'));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 22 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 22 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}
    >
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button className="win-btn" onClick={onBack} style={{ gap: 5, fontSize: 12 }}>
          <ArrowLeft size={13} /> Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
          <FileText size={12} style={{ color: 'rgba(255,255,255,0.30)', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            resume.pdf — João Kido
          </span>
        </div>
        {pdfState === 'ready' && (
          <a
            href="/resume.pdf"
            download="joao-kido-resume.pdf"
            className="win-btn"
            style={{ gap: 5, fontSize: 12, flexShrink: 0 }}
          >
            <Download size={12} /> Download
          </a>
        )}
      </div>

      {/* Content area */}
      <div style={{
        flex: 1,
        minHeight: 420,
        background: 'rgba(255,255,255,0.02)',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* Checking */}
        {pdfState === 'checking' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0.5 }}>
            <div style={{
              width: 22, height: 22, border: '2px solid rgba(255,255,255,0.15)',
              borderTopColor: 'rgba(255,255,255,0.6)', borderRadius: '50%',
              animation: 'spin 0.75s linear infinite',
            }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)' }}>Loading…</span>
          </div>
        )}

        {/* PDF not found */}
        {pdfState === 'missing' && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 32, textAlign: 'center' }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'grid', placeItems: 'center',
            }}>
              <FileText size={24} style={{ color: 'rgba(255,255,255,0.25)' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>
                resume.pdf not found
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.32)', lineHeight: 1.6, maxWidth: 280 }}>
                Drop your PDF at{' '}
                <code style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.45)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '1px 6px', borderRadius: 4,
                }}>
                  /public/resume.pdf
                </code>
                {' '}and it will appear here automatically.
              </div>
            </div>
            <button
              className="win-btn"
              style={{ gap: 5, fontSize: 12 }}
              onClick={() => {
                setPdfState('checking');
                fetch('/resume.pdf', { method: 'HEAD' })
                  .then((r) => setPdfState(r.ok && r.headers.get('content-type')?.includes('pdf') ? 'ready' : 'missing'))
                  .catch(() => setPdfState('missing'));
              }}
            >
              ↺ Check again
            </button>
          </motion.div>
        )}

        {/* PDF ready — full iframe */}
        {pdfState === 'ready' && (
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=1"
            style={{ width: '100%', height: '100%', minHeight: 420, border: 'none', display: 'block' }}
            title="João Kido — Resume"
          />
        )}
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
    { label: 'LinkedIn', value: 'linkedin.com/in/joao-guilherme-kido-carvalho', href: profile.linkedin, icon: <Linkedin size={16} /> },
    { label: 'GitHub', value: 'github.com/kidoexpress', href: profile.github, icon: <Github size={16} /> },
    { label: 'Email', value: 'joaokido@berkeley.edu', href: profile.email, icon: <Mail size={16} /> },
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
      <div className="contact-link-grid">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="contact-link-card"
          >
            <div className="contact-link-icon">
              {link.icon}
            </div>
            <div>
              <div className="contact-link-label">{link.label}</div>
              <div className="contact-link-value">{link.value}</div>
            </div>
            <ExternalLink size={13} className="contact-link-arrow" />
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
