import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout components
import Header from "./components/Header";
import Hero from "./components/Hero";
import PDFTools from "./components/PDFTools";
import ImageTools from "./components/ImageTools";
import Footer from "./components/Footer";

// Hooks
import { useDarkMode } from "./hooks/useDarkMode";
import { useActiveSection } from "./hooks/useActiveSection";

// Tool pages
import PdfSplit from "./components/tools/pdf/pdfsplit";
import ImgToPdf from "./components/tools/pdf/imgtopdf";
import PdfToImages from './components/tools/pdf/pdftoimg';
import MergePdf from "./components/tools/pdf/MergePdf";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [activeSection, setActiveSection] = useActiveSection();

  return (
    <Router>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Routes */}
        <main>
          <Routes>
            {/* Landing page */}
            <Route
              path="/"
              element={
                <>
                  <Hero
                    darkMode={darkMode}
                    setActiveSection={setActiveSection}
                  />
                  <PDFTools darkMode={darkMode} />
                  <ImageTools darkMode={darkMode} />
                </>
              }
            />

            {/* PDF tools */}
            <Route
              path="/tools/pdf/split"
              element={<PdfSplit darkMode={darkMode} />}
            />
            <Route
              path="/tools/pdf/from-images"
              element={<ImgToPdf darkMode={darkMode} />}
            />
            <Route 
              path="/tools/pdf/pdftoimg" 
              element={<PdfToImages darkMode={darkMode} />} 
            />
            <Route
    path="/tools/pdf/merge" // Add this route
    element={<MergePdf darkMode={darkMode} />}
  />

          </Routes>
        </main>

        {/* Footer */}
        <Footer
          darkMode={darkMode}
          setActiveSection={setActiveSection}
        />
      </div>
    </Router>
  );
};

export default App;