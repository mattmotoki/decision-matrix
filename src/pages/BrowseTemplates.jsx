import React from 'react';
import { Link } from 'react-router-dom';
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

// Map template IDs to their corresponding icons
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
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <IconComponent className="text-teal-600 w-8 h-8 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-gray-900">{template.name}</h3>
        </div>
        <p className="text-gray-600 mb-6 line-clamp-2 ml-1">{template.description}</p>
        <div className="mt-6">
          <ul className="space-y-2">
            {template.dimensions.map((dimension) => (
              <li
                key={dimension.name}
                className="text-sm flex items-center bg-gray-100 rounded-lg p-2.5 
                           border border-gray-200 shadow-sm"
              >
                <span className="mr-2 text-teal-600">•</span>
                <span className="font-medium text-gray-700">{dimension.name}</span>
                <span className="ml-auto font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {dimension.weight}x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={() => onSelect(template)}
        className="mt-8 w-full bg-gradient-to-br from-teal-500 to-teal-600 
                   text-white px-6 py-3.5 rounded-lg hover:from-teal-600 
                   hover:to-teal-700 transition-all duration-200 font-semibold 
                   text-lg shadow-sm hover:shadow-md active:transform 
                   active:scale-98 uppercase tracking-wide"
      >
        Use Template
      </button>
    </div>
  );
}

export function BrowseTemplates() {
  const handleTemplateSelect = (template) => {
    // TODO: Implement template selection logic
    console.log('Selected template:', template);
    alert(`Selected template: ${template.name}`);
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
    </div>
  );
} 