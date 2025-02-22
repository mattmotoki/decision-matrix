import React, { useRef } from 'react';
import { Download, Upload, Grid, Star, Share2 } from 'lucide-react';
import { ControlItem } from './ControlItem';

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
    <ControlItem
      icon={Grid}
      label="Browse Templates"
      description="Explore pre-built decision matrices"
      href="/templates"
    />
  );
}

export function FavoriteTemplatesButton() {
  return (
    <ControlItem
      icon={Star}
      label="Favorite Templates"
      description="Quick access to your saved templates"
      href="/templates"
    />
  );
}

export function CommunityTemplatesButton() {
  return (
    <ControlItem
      icon={Share2}
      label="Community Templates"
      description="Discover and share templates"
      href="/templates"
    />
  );
} 