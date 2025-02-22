import React from 'react';
import { User, Save, Settings, History, LogOut } from 'lucide-react';
import { DropdownItem } from './DropdownItem';

export function ProfileDropdown({ onSave }) {
  return (
    <div className="absolute z-50 top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-slate-200 p-4">
      <div className="flex items-center gap-3 pb-3 mb-3 border-b border-slate-200">
        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
          <User className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800">Guest User</h4>
          <p className="text-sm text-slate-600">guest@example.com</p>
        </div>
      </div>
      <div className="space-y-2">
        <DropdownItem 
          icon={User}
          label="My Profile"
          description="View and edit your profile"
          href="/profile"
        />   
        <DropdownItem 
          icon={Save}
          label="Save Changes"
          description="Save your current progress"
          href="#"
          onClick={onSave}
        />          
        <DropdownItem 
          icon={Settings}
          label="Account Settings"
          description="Manage your account preferences"
          href="/profile/settings"
        />    
        <DropdownItem 
          icon={History}
          label="Decision History"
          description="View your past decisions"
          href="/profile/history"
        />
        <div className="pt-2 mt-2 border-t border-slate-200">
          <DropdownItem 
            icon={LogOut}
            label="Sign Out"
            description="Log out of your account"
            href="/logout"
          />
        </div>
      </div>
    </div>
  );
} 