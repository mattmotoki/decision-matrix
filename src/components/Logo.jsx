import React from 'react';
import favicon from '/public/favicon.svg';

export function Logo({ className }) {
  return (
    <img 
      src={favicon}
      alt="Dotable Logo" 
      className={className}
    />
  );
} 