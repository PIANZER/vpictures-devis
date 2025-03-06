import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectType, ProjectTypeInfo } from '../types';

interface ProjectTypeSelectorProps {
  selectedTypes: ProjectType[];
  onTypeChange: (types: ProjectType[]) => void;
}

export const projectTypes: ProjectTypeInfo[] = [
  { id: 'server', label: 'Présentation de Serveur', price: 15 },
  { id: 'group', label: 'Présentation de Groupe/Personnage', price: -10 },
  { id: 'script', label: 'Présentation de Script/Mapping', price: 10 },
  { id: 'social', label: 'Format Tiktok/Instagram', price: 0 }
];

export const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({
  selectedTypes,
  onTypeChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <div className="relative">
      <h2 className="text-xl font-semibold mb-4">Type de projet</h2>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex items-center justify-between p-4 rounded-lg border-2 border-cyan-200 bg-white hover:border-cyan-400 transition-colors duration-200"
      >
        <span className="text-lg">
          {selectedTypes.length === 0 
            ? 'Sélectionner les types de projet'
            : `${selectedTypes.length} type${selectedTypes.length > 1 ? 's' : ''} sélectionné${selectedTypes.length > 1 ? 's' : ''}`}
        </span>
        {isDropdownOpen ? <ChevronUp className="text-cyan-500" /> : <ChevronDown className="text-cyan-500" />}
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-2 bg-white rounded-lg border-2 border-cyan-200 shadow-lg overflow-hidden"
          >
            <div className="divide-y divide-cyan-100">
              {projectTypes.map((type) => (
                <div
                  key={type.id}
                  className={`
                    flex items-center justify-between p-4 hover:bg-cyan-50 transition-colors duration-200
                    ${selectedTypes.includes(type.id) ? 'bg-cyan-50' : ''}
                  `}
                >
                  <label className="flex items-center gap-3 cursor-pointer w-full">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onTypeChange([...selectedTypes, type.id]);
                        } else {
                          onTypeChange(selectedTypes.filter(t => t !== type.id));
                        }
                      }}
                      className="w-5 h-5 rounded border-cyan-300 text-cyan-500"
                    />
                    <span className="text-lg">{type.label}</span>
                  </label>
                  <span className={`font-bold text-lg ${
                    type.price > 0 ? 'text-green-500' : type.price < 0 ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    {type.price > 0 ? `+${type.price}€` : type.price < 0 ? `${type.price}€` : '0€'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};