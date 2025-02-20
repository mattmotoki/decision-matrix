import React, { useEffect } from 'react';
import { Edit, Trash2, CheckCircle } from 'lucide-react';

const MenuItem = ({ icon: Icon, label, onClick, color }) => (
  <button
    onClick={onClick}
    className={`w-full px-3 py-2 text-left text-sm text-${color}-600 hover:bg-${color}-50 flex items-center gap-2`}
  >
    <Icon size={16} />
    {label}
  </button>
);

export function ContextMenu({ 
  isOpen, 
  setIsOpen, 
  task, 
  onEdit, 
  onDelete, 
  onComplete,
  position,
  menuRef
}) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const menuItems = [
    {
      icon: CheckCircle,
      label: 'Complete',
      onClick: () => { onComplete(task); setIsOpen(false); },
      color: 'green'
    },
    {
      icon: Edit,
      label: 'Edit',
      onClick: () => { onEdit(task); setIsOpen(false); },
      color: 'blue'
    },
    {
      icon: Trash2,
      label: 'Delete',
      onClick: () => { onDelete(); setIsOpen(false); },
      color: 'red'
    }
  ];

  return (
    <div
      ref={menuRef}
      className="absolute z-10 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-36"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {menuItems.map(item => (
        <MenuItem key={item.label} {...item} />
      ))}
    </div>
  );
} 