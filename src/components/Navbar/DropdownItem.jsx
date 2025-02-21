import React from 'react';

export function DropdownItem({ icon: Icon, label, description, href, onClick }) {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="flex items-start p-3 hover:bg-slate-100 rounded-lg transition-colors group cursor-pointer"
    >
      <div className="mr-4 text-teal-600 group-hover:text-teal-700 pt-1">
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-semibold text-slate-800 group-hover:text-teal-800">{label}</h4>
        <p className="text-sm text-slate-600 group-hover:text-slate-700">{description}</p>
      </div>
    </a>
  );
} 