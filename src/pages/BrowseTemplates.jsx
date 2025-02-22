import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Grid,
  Utensils,
  GraduationCap,
  Code,
  Plane,
  Briefcase,
  Home,
  Dog,
  Car,
  Palette,
  Smartphone
} from 'lucide-react';
import { sampleTemplates } from '../data/sampleTemplates';
import { EditDimensionsModal } from '../components/ControlPanel/DimensionEditor';


const templateIcons = {
  'restaurant-choice': Utensils,
  'college-selection': GraduationCap,
  'side-projects': Code,
  'vacation-planning': Plane,
  'job-offers': Briefcase,
  'home-buying': Home,
  'pet-adoption': Dog,
  'car-purchase': Car,
  'hobby-selection': Palette,
  'tech-gadget': Smartphone
};

function TemplateCard({ template, onSelect }) {
  const IconComponent = templateIcons[template.id] || Grid;

  return (
    <div className="bg-teal-75 border border-gray-200 rounded-xl p-6 hover:bg-teal-200 shadow-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <IconComponent className="text-teal-600 w-8 h-8 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2 ml-1">{template.description}</p>
        <div className="mt-4">
          <ul className="space-y-1 pl-2">

            {template.dimensions.map((dimension) => (
              <li
                key={dimension.name}
                className="text-sm flex items-center bg-teal-50 rounded-lg p-1.5 px-4
                         border border-gray-200 shadow-sm"
              >
                <span className="mr-2 text-teal-600">•</span>
                <span className="font-medium text-gray-700">{dimension.name}</span>
                <span className="ml-auto font-bold text-teal-700 px-1 py-0.5 rounded">
                  {dimension.weight}x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={() => onSelect(template)}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 
                   bg-teal-500 text-white rounded-lg hover:bg-teal-600 
                   focus:outline-none focus:ring-2 focus:ring-teal-500 
                   focus:ring-offset-2 transition-colors text-lg"
      >
        Use Template
      </button>
    </div>
  );
}

export function BrowseTemplates({ onTemplateSelect }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setIsEditModalOpen(true);
  };

  const handleDimensionsChange = (newDimensions) => {
    const templateData = {
      ...selectedTemplate,
      dimensions: newDimensions.map(dim => ({
        name: dim.name,
        label: dim.label,
        weight: dim.weight
      }))
    };

    onTemplateSelect(templateData);
    setIsEditModalOpen(false);
    navigate('/');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-12 border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <Grid className="text-teal-600 w-10 h-10" />
          <h1 className="text-4xl font-bold">Browse Templates</h1>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-gray-700 
                     hover:text-teal-600 bg-gray-100 hover:bg-gray-200 
                     rounded-lg transition-all duration-200 font-medium text-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>

      {selectedTemplate && (
        <EditDimensionsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          dimensions={selectedTemplate.dimensions}
          onDimensionsChange={handleDimensionsChange}
        />
      )}


    </div>
  );
} 