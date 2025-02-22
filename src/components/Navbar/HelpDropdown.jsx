import React from 'react';
import { HelpCircle, MessageCircle, Mail } from 'lucide-react';
import { DropdownItem } from './DropdownItem';

export function HelpDropdown() {
  return (
    <div className="absolute z-50 top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200 p-4">
      <h3 className="text-lg font-bold mb-4 text-slate-800">Help & Support</h3>
      <div className="space-y-2">
        <DropdownItem 
          icon={HelpCircle}
          label="FAQs"
          description="Frequently asked questions"
          href="/help/faq"
        />
        <DropdownItem 
          icon={MessageCircle}
          label="Support Forum"
          description="Community support and discussions"
          href="/help/forum"
        />
        <DropdownItem 
          icon={Mail}
          label="Contact Support"
          description="Get help from our support team"
          href="/help/contact"
        />
      </div>
    </div>
  );
} 