import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Scissors, Merge, RotateCw, Lock, Unlock, Image, FileImage, Compass as Compress, Edit3, Search, Bookmark } from 'lucide-react';
import ToolCard from './ToolCard';

interface PDFToolsProps {
  darkMode: boolean;
}

const PDFTools: React.FC<PDFToolsProps> = ({ darkMode }) => {
  const navigate = useNavigate();

  // Define tool routes/URLs
  const toolRoutes: Record<string, string> = {
    'PdfSplit': '/tools/pdf/pdfsplit',
    'Merge PDF': '/tools/pdf/merge',
    'Compress PDF': '/tools/pdf/compress',
    'Protect PDF': '/tools/pdf/protect',
    'Unlock PDF': '/tools/pdf/unlock',
    'Rotate PDF': '/tools/pdf/rotate',
    'PDF to Images': '/tools/pdf/to-images',
    'Images to PDF': '/tools/pdf/from-images',
    'Edit PDF': '/tools/pdf/edit',
    'Extract Text': '/tools/pdf/extract-text',
    'Add Bookmarks': '/tools/pdf/bookmarks',
    'PDF Converter': '/tools/pdf/converter'
  };

  const pdfTools = [
    {
      icon: Scissors,
      title: 'PdfSplit',
      description: 'Extract pages or split your PDF into multiple documents with precision.',
      featured: true
    },
    {
      icon: Merge,
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one seamless document.',
      featured: true
    },
    {
      icon: Compress,
      title: 'Compress PDF',
      description: 'Reduce PDF file size while maintaining quality for easier sharing.',
      featured: true
    },
    {
      icon: Lock,
      title: 'Protect PDF',
      description: 'Add password protection and security to your PDF documents.'
    },
    {
      icon: Unlock,
      title: 'Unlock PDF',
      description: 'Remove password protection from PDF files you own.'
    },
    {
      icon: RotateCw,
      title: 'Rotate PDF',
      description: 'Rotate PDF pages to the correct orientation.'
    },
    {
      icon: FileImage,
      title: 'PDF to Images',
      description: 'Convert PDF pages to high-quality JPG, PNG, or other image formats.'
    },
    {
      icon: Image,
      title: 'Images to PDF',
      description: 'Create PDF documents from your images with custom layouts.'
    },
    {
      icon: Edit3,
      title: 'Edit PDF',
      description: 'Add text, images, and annotations to your PDF documents.'
    },
    {
      icon: Search,
      title: 'Extract Text',
      description: 'Extract all text content from PDF documents for editing.'
    },
    {
      icon: Bookmark,
      title: 'Add Bookmarks',
      description: 'Create navigation bookmarks for better PDF organization.'
    },
    {
      icon: FileText,
      title: 'PDF Converter',
      description: 'Convert PDFs to Word, Excel, PowerPoint, and other formats.'
    }
  ];

  const handleToolClick = (toolTitle: string) => {
    const route = toolRoutes[toolTitle];
    if (route) {
      navigate(route);
    } else {
      console.warn(`No route defined for tool: ${toolTitle}`);
    }
  };

  return (
    <section id="pdf-tools" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            PDF Tools
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprehensive PDF processing tools for all your document needs. 
            Split, merge, compress, and convert with professional results.
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
            {pdfTools.filter(tool => tool.featured).map((tool, index) => (
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

        {/* All Tools */}
        <div>
          <h3 className={`text-xl font-semibold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            All PDF Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pdfTools.map((tool, index) => (
              <ToolCard
                key={index}
                icon={tool.icon}
                title={tool.title}
                description={tool.description}
                darkMode={darkMode}
                featured={tool.featured}
                onClick={() => handleToolClick(tool.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFTools;