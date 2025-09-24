import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode, setActiveSection }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const footerLinks = {
    'Tools': [
      { name: 'PDF Tools', action: () => scrollToSection('pdf-tools') },
      { name: 'Image Tools', action: () => scrollToSection('image-tools') },
      { name: 'All Tools', action: () => scrollToSection('home') }
    ],
  };

  return (
    <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Sharp Toolkit
              </span>
            </div>
            <p className={`mb-6 leading-relaxed max-w-md ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Free online tools for all your PDF and image processing needs. 
              Fast, secure, and always free.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className={`font-semibold text-lg mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={link.action}
                      className={`text-left transition-colors hover:underline ${
                        darkMode
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className={`flex items-center text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            This SharpToolKit developed by  <Heart className="h-4 w-4 mx-1 text-red-500" /> MineCrafted Code
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;