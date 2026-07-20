import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileArchive, FileCode2, FileText, FileSpreadsheet, RotateCcw, Trash2 } from 'lucide-react';

type DeletedFile = {
  name: string;
  type: string;
  size: string;
  deleted: string;
  icon: React.ReactNode;
  accent: string;
  restoreMsg: string;
};

const deletedFiles: DeletedFile[] = [
  {
    name: 'sleep_schedule.zip',
    type: 'Archive',
    size: '0 KB',
    deleted: 'Every semester',
    icon: <FileArchive size={16} />,
    accent: '#fb923c',
    restoreMsg: 'Restore failed. File corrupted by overlapping deadlines and one too many "just one more commit."',
  },
  {
    name: 'final_final_v27_REAL.pdf',
    type: 'Document',
    size: '4.2 MB',
    deleted: '2 days before submission',
    icon: <FileText size={16} />,
    accent: '#60a5fa',
    restoreMsg: 'Restored to Documents/definitely_final_v28/. The cycle continues.',
  },
  {
    name: 'bug_fix_ACTUAL_FINAL_v2.js',
    type: 'Source code',
    size: '12 KB',
    deleted: '3am, Berkeley',
    icon: <FileCode2 size={16} />,
    accent: '#4ade80',
    restoreMsg: 'Restored. Still contains one TODO from 2024 that nobody should touch.',
  },
  {
    name: 'balanced_diet_plan.xlsx',
    type: 'Spreadsheet',
    size: '8 KB',
    deleted: 'Week 2 of semester',
    icon: <FileSpreadsheet size={16} />,
    accent: '#a78bfa',
    restoreMsg: 'Restored next to an empty coffee cup and a tab still open on Uber Eats.',
  },
  {
    name: 'economics_notes_final_FINAL.pdf',
    type: 'Document',
    size: '2.1 MB',
    deleted: 'Night before midterm',
    icon: <FileText size={16} />,
    accent: '#f472b6',
    restoreMsg: 'Restored. One graph is labeled "trust me bro" and I stand by it.',
  },
];

export function RecycleBinApp() {
  const [message, setMessage] = useState<string | null>(null);
  const [restoredId, setRestoredId] = useState<string | null>(null);

  const handleRestore = (file: DeletedFile) => {
    setRestoredId(file.name);
    setMessage(file.restoreMsg);
    setTimeout(() => setRestoredId(null), 1400);
  };

  return (
    <div className="rb-app">
      {/* Header */}
      <div className="rb-header">
        <div className="rb-header-icon">
          <Trash2 size={20} />
        </div>
        <div>
          <h2 className="rb-title">Recycle Bin</h2>
          <p className="rb-meta">{deletedFiles.length} items · 0 bytes of real consequences</p>
        </div>
      </div>

      {/* Column headers */}
      <div className="rb-col-head">
        <span>Name</span>
        <span>Type</span>
        <span>Deleted</span>
        <span>Size</span>
        <span />
      </div>

      {/* File list */}
      <div className="rb-list">
        {deletedFiles.map((file, i) => (
          <motion.button
            key={file.name}
            className={`rb-row${restoredId === file.name ? ' rb-row--restoring' : ''}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.055, duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onDoubleClick={() => handleRestore(file)}
            title="Double-click to restore"
          >
            <span className="rb-file-icon" style={{ color: file.accent }}>{file.icon}</span>
            <span className="rb-file-name">{file.name}</span>
            <span className="rb-file-type">{file.type}</span>
            <span className="rb-file-deleted">{file.deleted}</span>
            <span className="rb-file-size">{file.size}</span>
            <span className="rb-restore-btn">
              <RotateCcw size={13} />
            </span>
          </motion.button>
        ))}
      </div>

      {/* Status bar */}
      <div className="rb-footer">
        <AnimatePresence mode="wait">
          {message ? (
            <motion.span
              key={message}
              className="rb-status rb-status--active"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {message}
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="rb-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              Double-click a file to restore absolutely nothing important.
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
