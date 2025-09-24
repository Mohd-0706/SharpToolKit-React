import React from 'react';
import { Shield, Zap, Globe, Users, Award, Heart } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = ({ darkMode }) => {
  const features = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your files are processed locally and never stored on our servers. Complete privacy guaranteed.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Advanced algorithms ensure quick processing times without compromising quality.'
    },
    {
      icon: Globe,
      title: 'Always Free',
      description: 'All tools are completely free to use with no hidden costs or subscription requirements.'
    },
    {
      icon: Users,
      title: 'User Friendly',
      description: 'Intuitive interface designed for both beginners and professionals.'
    },
    {
      icon: Award,
      title: 'Professional Quality',
      description: 'Industry-standard processing that meets professional requirements.'
    },
    {
      icon: Heart,
      title: 'Made with Care',
      description: 'Built by developers who understand the importance of reliable, efficient tools.'
    }
  ];

  const stats = [
    { number: '2M+', label: 'Files Processed' },
    { number: '150K+', label: 'Happy Users' },
    { number: '35+', label: 'Tools Available' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Why Choose Sharp Toolkit?
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We've built the most comprehensive collection of free online tools 
            for document and image processing, designed with privacy and performance in mind.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stat.number}
              </div>
              <div className={`text-sm sm:text-base ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750'
                  : 'bg-gray-50 border border-gray-200 hover:bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 ${
                darkMode ? 'bg-gray-700' : 'bg-white shadow-md'
              }`}>
                <feature.icon className={`h-7 w-7 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className={`text-xl font-semibold mb-3 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default About;