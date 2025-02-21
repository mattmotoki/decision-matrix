import React, { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { DimensionWeightSlider } from './DimensionWeightSlider';
import { CreateDimensionButton } from './CreateDimensionButton';
import { Modal } from '../Modal';
import { ControlItem } from './ControlItem';
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
  onSave
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleRemoveDimension = (dimensionName) => {
    onDimensionsChange(dimensions.filter(dim => dim.name !== dimensionName));
  };

  const handleWeightChange = (dimensionName, newWeight) => {
    onDimensionsChange(
      dimensions.map(dim =>
        dim.name === dimensionName
          ? { ...dim, weight: Number(newWeight) }
          : dim
      )
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Templates Section */}
      <section className="mb">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <BrowseTemplatesButton />
          <FavoriteTemplatesButton />
          <CommunityTemplatesButton />
          <ExportTemplateButton onClick={onExport} />
          <ImportTemplateButton onClick={onImport} />          
          <ControlItem
            icon={Pencil}
            label="Edit Dimensions"
            description="Modify and reorder dimensions"
            onClick={() => setIsEditModalOpen(true)}
          />
        </div>
      </section>

      {/* Edit Dimensions Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Dimensions"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            {dimensions.map(dim => (
              <div key={dim.name} className="flex-1">
                <DimensionWeightSlider
                  name={dim.name}
                  label={dim.label}
                  value={dim.weight}
                  onChange={(value) => handleWeightChange(dim.name, value)}
                  onDelete={() => handleRemoveDimension(dim.name)}
                  showDelete={true}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <CreateDimensionButton
              dimensions={dimensions}
              onDimensionsChange={onDimensionsChange}
            />
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 