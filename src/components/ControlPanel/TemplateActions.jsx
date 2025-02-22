import React, { useRef } from 'react';
import { Download, Upload, Grid, Star, Share2 } from 'lucide-react';
import { ControlItem } from './ControlItem';
import { Link } from 'react-router-dom';
import { showComingSoonToast } from '../../utils/notifications';

export function ExportTemplateButton({ onClick }) {
  return (
    <ControlItem
      icon={Download}
      label="Export Template"
      description="Export as JSON file"
      onClick={onClick}
    />
  );
}

export function ImportTemplateButton({ onClick }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      onClick(data);
    } catch (error) {
      console.error('Import error:', error);
      alert(`Import failed: ${error.message}`);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <ControlItem
        icon={Upload}
        label="Import Template"
        description="Import from JSON file"
        onClick={handleClick}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />
    </>
  );
}

export function BrowseTemplatesButton() {
  return (
    <Link to="browse-templates">
      <ControlItem
        icon={Grid}
        label="Browse Templates"
        description="Explore pre-built decision matrices"
      />
    </Link>
  );
}

export function FavoriteTemplatesButton({ setToast }) {
  return (
    <ControlItem
      icon={Star}
      label="Favorite Templates"
      description="Quick access to your saved templates"
      onClick={() => showComingSoonToast('Favorite Templates', setToast)}
    />
  );
}

export function CommunityTemplatesButton({ setToast }) {
  return (
    <ControlItem
      icon={Share2}
      label="Community Templates"
      description="Discover and share templates"
      onClick={() => showComingSoonToast('Community Templates', setToast)}
    />
  );
} 