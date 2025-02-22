import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="container mx-auto px-6 text-center text-gray-600">
        <p className="text-sm">
          © {new Date().getFullYear()} – Todotable
        </p>
        <div className="mt-2 space-x-4 text-sm">
          <a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-teal-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
} 