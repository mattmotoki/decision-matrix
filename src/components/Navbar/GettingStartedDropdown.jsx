import React from 'react';
import { BookOpen, Video, HelpCircle } from 'lucide-react';
import { DropdownItem } from './DropdownItem';

export function GettingStartedDropdown() {
  return (
    <div className="absolute z-50 top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200 p-4">
      <h3 className="text-lg font-bold mb-4 text-slate-800">Getting Started</h3>
      <div className="space-y-2">
        <DropdownItem 
          icon={BookOpen}
          label="Tutorial"
          description="Step-by-step guide to using 2Dotable"
          href="/tutorial"
        />
        <DropdownItem 
          icon={Video}
          label="Video Walkthrough"
          description="Quick video guide for new users"
          href="/tutorial/video"
        />
        <DropdownItem 
          icon={HelpCircle}
          label="Quick Tips"
          description="Pro tips for effective decision-making"
          href="/tutorial/tips"
        />
      </div>
    </div>
  );
} 