import { useState } from 'react';
import { FileArchive, FileCode2, FileText, RotateCcw } from 'lucide-react';

const deletedFiles = [
  { name: 'final_final_v27_REAL.pdf', icon: <FileText size={18} />, msg: 'Restored into Documents/definitely_final/ for emotional support.' },
  { name: 'bug_fix_ACTUAL_FINAL_v2.js', icon: <FileCode2 size={18} />, msg: 'Restored. It still contains one suspicious TODO.' },
  { name: 'sleep_schedule.zip', icon: <FileArchive size={18} />, msg: 'Restore failed: archive corrupted by deadlines.' },
  { name: 'economics_notes_final_FINAL.pdf', icon: <FileText size={18} />, msg: 'Restored next to a graph labeled “trust me bro”.' },
];

export function RecycleBinApp() {
  const [message, setMessage] = useState('Double-click a deleted file to restore absolutely nothing important.');

  return (
    <div className="fake-app app-scroll">
      <div className="fake-app-header">
        <h2>Recycle Bin</h2>
        <p>4 items · 0 bytes of real consequences</p>
      </div>
      <div className="recycle-list">
        {deletedFiles.map((file) => (
          <button key={file.name} onDoubleClick={() => setMessage(file.msg)}>
            {file.icon}
            <span>{file.name}</span>
            <RotateCcw size={14} />
          </button>
        ))}
      </div>
      <div className="fake-status">{message}</div>
    </div>
  );
}
