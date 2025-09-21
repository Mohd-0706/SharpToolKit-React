import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ToolCardProps {
  icon: typeof LucideIcon; 
  title: string;
  description: string;
  darkMode: boolean;
  featured?: boolean;
  onClick?: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  darkMode, 
  featured = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
        featured
          ? darkMode
            ? 'bg-gradient-to-br from-blue-900 to-teal-900 border border-blue-800 hover:border-blue-700'
            : 'bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200 hover:border-blue-300'
          : darkMode
            ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750 hover:border-gray-600'
            : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-lg hover:shadow-xl'
      }`}
    >
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 ${
        featured
          ? darkMode
            ? 'bg-blue-800 group-hover:bg-blue-700'
            : 'bg-blue-100 group-hover:bg-blue-200'
          : darkMode
            ? 'bg-gray-700 group-hover:bg-gray-600'
            : 'bg-gray-100 group-hover:bg-gray-200'
      }`}>
        <Icon className={`h-6 w-6 ${
          featured
            ? darkMode
              ? 'text-blue-300'
              : 'text-blue-600'
            : darkMode
              ? 'text-gray-300'
              : 'text-gray-600'
        }`} />
      </div>
      
      <h3 className={`font-semibold text-lg mb-2 transition-colors ${
        darkMode ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'
      }`}>
        {title}
      </h3>
      
      <p className={`text-sm leading-relaxed ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {description}
      </p>
    </div>
  );
};

export default ToolCard;