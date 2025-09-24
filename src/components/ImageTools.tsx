import React from 'react';
import { Image, Crop, RotateCw, Maximize as Resize, Palette, Filter, Contrast, Copyright as Brightness6, Compass as Compress, FileImage, Scissors, Grid3X3, Layers, Eye, Download, Upload, } from 'lucide-react';
import ToolCard from './ToolCard';

interface ImageToolsProps {
  darkMode: boolean;
}

const ImageTools: React.FC<ImageToolsProps> = ({ darkMode }) => {
  // Define tool routes/URLs
  const toolRoutes: Record<string, string> = {
    'Resize Image': '/tools/convert-from-pdf/pdf-to-word',
    'Compress Image': '/tools/image/compress',
    'Crop Image': '/tools/image/crop',
    'Convert Format': '/tools/image/convert',
    'Rotate Image': '/tools/image/rotate',
    'Apply Filters': '/tools/image/filters',
    'Adjust Contrast': '/tools/image/contrast',
    'Brightness Control': '/tools/image/brightness',
    'Color Correction': '/tools/image/color-correction',
    'Remove Background': '/tools/image/remove-background',
    'Create Collage': '/tools/image/collage',
    'Watermark': '/tools/image/watermark',
    'Image Viewer': '/tools/image/viewer',
    'Batch Upload': '/tools/image/batch-upload',
    'Bulk Download': '/tools/image/bulk-download',
    'Image Editor': '/tools/image/editor'
  };

  const imageTools = [
    {
      icon: Resize,
      title: 'Resize Image',
      description: 'Resize images to specific dimensions while maintaining quality.',
      featured: true
    },
    {
      icon: Compress,
      title: 'Compress Image',
      description: 'Reduce image file size without losing visual quality.',
      featured: true
    },
    {
      icon: Crop,
      title: 'Crop Image',
      description: 'Crop and trim images to focus on what matters most.',
      featured: true
    },
    {
      icon: FileImage,
      title: 'Convert Format',
      description: 'Convert between JPG, PNG, WebP, GIF, and other formats.'
    },
    {
      icon: RotateCw,
      title: 'Rotate Image',
      description: 'Rotate and flip images to the correct orientation.'
    },
    {
      icon: Filter,
      title: 'Apply Filters',
      description: 'Add artistic filters and effects to enhance your images.'
    },
    {
      icon: Contrast,
      title: 'Adjust Contrast',
      description: 'Fine-tune contrast levels for better image clarity.'
    },
    {
      icon: Brightness6,
      title: 'Brightness Control',
      description: 'Adjust brightness and exposure settings with precision.'
    },
    {
      icon: Palette,
      title: 'Color Correction',
      description: 'Adjust hue, saturation, and color balance professionally.'
    },
    {
      icon: Scissors,
      title: 'Remove Background',
      description: 'Automatically remove or replace image backgrounds.'
    },
    {
      icon: Grid3X3,
      title: 'Create Collage',
      description: 'Combine multiple images into beautiful collages.'
    },
    {
      icon: Layers,
      title: 'Watermark',
      description: 'Add text or image watermarks to protect your content.'
    },
    {
      icon: Eye,
      title: 'Image Viewer',
      description: 'View and analyze image properties and metadata.'
    },
    {
      icon: Upload,
      title: 'Batch Upload',
      description: 'Process multiple images simultaneously for efficiency.'
    },
    {
      icon: Download,
      title: 'Bulk Download',
      description: 'Download processed images in convenient ZIP packages.'
    },
    {
      icon: Image,
      title: 'Image Editor',
      description: 'Full-featured image editor with professional tools.'
    }
  ];

  const categories = {
    'Basic Editing': ['Resize Image', 'Crop Image', 'Rotate Image'],
    'Format & Compression': ['Convert Format', 'Compress Image', 'Batch Upload'],
    'Color & Effects': ['Apply Filters', 'Adjust Contrast', 'Brightness Control', 'Color Correction'],
    'Advanced Tools': ['Remove Background', 'Watermark', 'Create Collage', 'Image Editor']
  };

  const handleToolClick = (toolTitle: string) => {
    const route = toolRoutes[toolTitle];
    if (route) {
      // For a real application, you would use your routing method here
      // For example, with React Router: navigate(route);
      // For this example, we'll simulate navigation
      window.location.href = route;
    } else {
      console.warn(`No route defined for tool: ${toolTitle}`);
    }
  };

  return (
    <section id="image-tools" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Image Tools
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Professional image editing and conversion tools for all your visual content needs. 
            Resize, crop, filter, and optimize with ease.
          </p>
        </div>

        {/* Popular Tools */}
        <div className="mb-12">
          <h3 className={`text-xl font-semibold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Most Popular
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {imageTools.filter(tool => tool.featured).map((tool, index) => (
              <ToolCard
                key={index}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                darkMode={darkMode}
                featured={true}
                onClick={() => handleToolClick(tool.title)}
              />
            ))}
          </div>
        </div>

        {/* Categorized Tools */}
        <div className="space-y-12">
          {Object.entries(categories).map(([category, toolNames]) => (
            <div key={category}>
              <h3 className={`text-xl font-semibold mb-6 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {imageTools
                  .filter(tool => toolNames.includes(tool.title))
                  .map((tool, index) => (
                    <ToolCard
                      key={index}
                      icon={tool.icon}
                      title={tool.title}
                      description={tool.description}
                      darkMode={darkMode}
                      onClick={() => handleToolClick(tool.title)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* All Remaining Tools */}
        <div className="mt-12">
          <h3 className={`text-xl font-semibold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            More Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {imageTools
              .filter(tool => !tool.featured && !Object.values(categories).flat().includes(tool.title))
              .map((tool, index) => (
                <ToolCard
                  key={index}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.description}
                  darkMode={darkMode}
                  onClick={() => handleToolClick(tool.title)}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageTools;