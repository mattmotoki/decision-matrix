import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="container mx-auto px-6 text-center text-gray-600">
        <div className="space-x-4 text-sm mb-2">
          <span className="text-sm">
            © {new Date().getFullYear()} – Dotable
          </span>
          <span className="text-gray-300">|</span>
          <Link to="/privacy-policy" className="hover:text-teal-600 transition-colors px-2">
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/terms-of-service" className="hover:text-teal-600 transition-colors px-2">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
} 