import { motion } from 'framer-motion';
import { FileText, FolderOpen, Link } from 'lucide-react';

type Item = {
  name: string;
  type: 'file' | 'folder' | 'link';
  meta?: string;
  href?: string;
};

type Props = { items: Item[]; sidebarLabel: string };

export function FinderApp({ items, sidebarLabel }: Props) {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar */}
      <div className="finder-sidebar">
        <p className="finder-sidebar-section">Favorites</p>
        <div className="finder-sidebar-item finder-sidebar-item-active">
          <FolderOpen size={11} />
          <span>{sidebarLabel}</span>
        </div>
        <div className="finder-sidebar-item">
          <FolderOpen size={11} />
          <span>Projects</span>
        </div>
        <div className="finder-sidebar-item">
          <FolderOpen size={11} />
          <span>Notes</span>
        </div>
      </div>

      {/* Content */}
      <div className="app-scroll flex-1 p-4">
        <div className="space-y-0.5">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.035, duration: 0.2 }}
              className="finder-row group"
              onClick={() => item.href && window.open(item.href, '_blank')}
              style={{ cursor: item.href ? 'pointer' : 'default' }}
            >
              <span className="finder-row-icon">
                {item.type === 'folder' ? (
                  <FolderOpen size={13} className="text-blue-400" />
                ) : item.type === 'link' ? (
                  <Link size={13} className="text-cyan-400" />
                ) : (
                  <FileText size={13} className="text-white/40" />
                )}
              </span>
              <span className="finder-row-name group-hover:text-white transition-colors">{item.name}</span>
              {item.meta && (
                <span className="finder-row-meta">{item.meta}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
