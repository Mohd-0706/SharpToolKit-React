import React from 'react';
import { Mail, Github, Twitter, Heart } from 'lucide-react';

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
    'Company': [
      { name: 'About Us', action: () => scrollToSection('about') },
      { name: 'Contact', action: () => alert('Contact form would open here') },
      { name: 'Blog', action: () => alert('Blog page would open here') }
    ],
    'Legal': [
      { name: 'Privacy Policy', action: () => alert('Privacy policy would open here') },
      { name: 'Terms of Service', action: () => alert('Terms would open here') },
      { name: 'Cookie Policy', action: () => alert('Cookie policy would open here') }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: 'mailto:hello@sharptoolkit.com', label: 'Email' }
  ];

  return (
    <footer className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Sharp Toolkit
              </span>
            </div>
            <p className={`mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Free online tools for all your PDF and image processing needs. 
              Fast, secure, and always free.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
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

        {/* Newsletter Signup */}
        <div className={`p-8 rounded-2xl mb-12 ${
          darkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
            : 'bg-gradient-to-r from-blue-50 to-teal-50'
        }`}>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className={`text-2xl font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Stay Updated
            </h3>
            <p className={`mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get notified when we add new tools and features to Sharp Toolkit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg border transition-colors ${
                  darkMode
                    ? 'bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold transition-all duration-200 hover:from-blue-700 hover:to-blue-800 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className={`text-sm mb-4 sm:mb-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2024 Sharp Toolkit. All rights reserved.
          </p>
          <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> by the Sharp Toolkit team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;