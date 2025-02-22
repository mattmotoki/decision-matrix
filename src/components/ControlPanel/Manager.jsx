import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { ControlItem } from './ControlItem';
import { EditDimensionsModal } from './DimensionEditor';
import {
  ExportTemplateButton,
  ImportTemplateButton,
  BrowseTemplatesButton,
  FavoriteTemplatesButton,
  CommunityTemplatesButton
} from './TemplateActions';

export function Manager({
  dimensions,
  onDimensionsChange,
  onExport,
  onImport,
  onSave,
  setToast
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Templates Section */}
      <section className="mb">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <BrowseTemplatesButton />
          <ExportTemplateButton onClick={onExport} />
          <ImportTemplateButton onClick={onImport} />                    
          <FavoriteTemplatesButton setToast={setToast} />
          <CommunityTemplatesButton setToast={setToast} />
          <ControlItem
            icon={Pencil}
            label="Edit Dimensions"
            description="Modify and reorder dimensions"
            onClick={() => setIsEditModalOpen(true)}
          />
        </div>
      </section>

      <EditDimensionsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        dimensions={dimensions}
        onDimensionsChange={onDimensionsChange}
      />
    </div>
  );
} 