import React from 'react';
import { 
  BookOpen, 
  Grid, 
  Star, 
  Share2, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Video,
  User,
  Settings,
  History,
  LogOut,
  Save,
  Download,
  Upload
} from 'lucide-react';

const DropdownItem = ({ icon: Icon, label, description, href, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className="flex items-center p-3 hover:bg-slate-100 rounded-lg transition-colors group cursor-pointer"
    >
      <div className="mr-4 text-teal-600 group-hover:text-teal-700">
        <Icon size={24} />
      </div>
      <div>
        <h4 className="font-semibold text-slate-800 group-hover:text-teal-800">{label}</h4>
        <p className="text-sm text-slate-600 group-hover:text-slate-700">{description}</p>
      </div>
    </a>
  );
};

export const DataManagementDropdown = ({ onSave, onExport, onImport, fileInputRef }) => {
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="absolute z-50 top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200 p-4">
      <h3 className="text-lg font-bold mb-4 text-slate-800">Data Management</h3>
      <div className="space-y-2">
        <DropdownItem 
          icon={Save}
          label="Save Changes"
          description="Save your current progress"
          href="#"
          onClick={onSave}
        />
        <DropdownItem 
          icon={Download}
          label="Export Data"
          description="Download your data as JSON"
          href="#"
          onClick={onExport}
        />
        <DropdownItem 
          icon={Upload}
          label="Import Data"
          description="Upload previously exported data"
          href="#"
          onClick={handleImportClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={onImport}
          className="hidden"
          accept=".json"
        />
      </div>
    </div>
  );
};

export const TemplatesDropdown = () => (
  <div className="absolute z-50 top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-slate-200 p-4">
    <h3 className="text-lg font-bold mb-4 text-slate-800">Templates Library</h3>
    <div className="space-y-2">
      <DropdownItem 
        icon={Grid}
        label="Browse Templates"
        description="Explore pre-built decision matrices"
        href="/templates"
      />
      <DropdownItem 
        icon={Star}
        label="Favorite Templates"
        description="Quick access to your saved templates"
        href="/templates/favorites"
      />
      <DropdownItem 
        icon={Share2}
        label="Community Templates"
        description="Discover and share templates"
        href="/templates/community"
      />
    </div>
  </div>
);

export const GettingStartedDropdown = () => (
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

export const HelpDropdown = () => (
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

export const ProfileDropdown = () => (
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