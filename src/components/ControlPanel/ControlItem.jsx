import React from 'react';

export function ControlItem({ icon: Icon, label, description, onClick, href, className = '' }) {
  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  return (
    <Component
      {...props}
      className={`w-full p-4 flex items-start bg-white hover:bg-gray-50  transition-colors ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 text-teal-600 flex-shrink-0 mr-3 mt-0.5" />}
      <div className="flex-1 text-left">
        <div className="font-medium text-gray-900">{label}</div>
        {description && (
          <div className="text-sm text-gray-500 mt-1">{description}</div>
        )}
      </div>
    </Component>
  );
} 