import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import PDFTools from './components/PDFTools';
import ImageTools from './components/ImageTools';
import About from './components/About';
import Footer from './components/Footer';
import { useDarkMode } from './hooks/useDarkMode';
import { useActiveSection } from './hooks/useActiveSection';

// Import PDF tool components
import PdfSplit from './components/tools/pdf/pdfsplit';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();
  const [activeSection, setActiveSection] = useActiveSection();

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        
        <main>
          <Routes>
            {/* Main page route */}
            <Route path="/" element={
              <>
                <Hero 
                  darkMode={darkMode}
                  setActiveSection={setActiveSection}
                />
                <PDFTools darkMode={darkMode} />
                <ImageTools darkMode={darkMode} />
                <About darkMode={darkMode} />
              </>
            } />
            
            {/* PDF Tool routes */}
            <Route path="/tools/pdf/PDFSplit" element={<PdfSplit darkMode={darkMode} />} />

            
          </Routes>
        </main>
        
        <Footer 
          darkMode={darkMode}
          setActiveSection={setActiveSection}
        />
      </div>
    </Router>
  );
}

export default App;