import React from 'react';

export function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms of Service</h1>
      
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing and using Todotable, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use our application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">2. Use of Service</h2>
        <p className="text-gray-600 mb-4">
          Todotable provides a task management and decision-making tool. 
          You are responsible for maintaining the confidentiality of your account and data.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">3. Data and Privacy</h2>
        <p className="text-gray-600 mb-4">
          We respect your privacy. All user data is stored locally in your browser. 
          We do not collect or share your personal information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">4. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          Todotable is provided "as is" without any warranties. 
          We are not liable for any damages arising from the use of this application.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">5. Changes to Terms</h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify these terms at any time. 
          Continued use of the application constitutes acceptance of any changes.
        </p>
      </section>

      <p className="text-sm text-gray-500 mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
} 