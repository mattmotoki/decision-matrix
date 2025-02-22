import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="container mx-auto px-6 text-center text-gray-600">
        <div className="space-x-4 text-sm mb-2">
          <Link to="/privacy-policy" className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-teal-600 transition-colors">Terms of Service</Link>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} – Todotable
        </p>
      </div>
    </footer>
  );
} 