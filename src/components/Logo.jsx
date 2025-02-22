import React from 'react';
import favicon from '../assets/favicon.svg';

export function Logo({ className }) {
  return (
    <img 
      src={favicon}
      alt="Todotable logo" 
      className={className}
    />
  );
} 