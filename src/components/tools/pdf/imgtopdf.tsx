import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import {
  Upload,
  Download,
  Trash2,
  GripVertical,
  RotateCw,
  Image as ImageIcon,
  Settings,
  CheckCircle,
  AlertCircle,
  Home,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ImageData {
  file: File;
  url: string;
  id: string;
}

interface PageSettings {
  orientation: 'portrait' | 'landscape';
  margin: number;
  quality: number;
}

const ImgToPdf: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);
  const [pageSettings, setPageSettings] = useState<PageSettings>({
    orientation: 'portrait',
    margin: 10,
    quality: 100
  });
  const [showSettings, setShowSettings] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const navigate = useNavigate();

  // Generate unique ID for images
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Handle uploaded files
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    
    const validImages = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)
    );

    if (validImages.length === 0) {
      setStatus({ message: "Please upload valid images (JPEG, PNG, WebP, GIF)", type: "error" });
      return;
    }

    if (validImages.length + selectedImages.length > 50) {
      setStatus({ message: "Maximum 50 images allowed", type: "error" });
      return;
    }

    const imageData: ImageData[] = validImages.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: generateId()
    }));

    setSelectedImages((prev) => [...prev, ...imageData]);
    setStatus({ message: `${imageData.length} image(s) added`, type: "success" });
  };

  // Drag and drop for file upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Drag and drop for image rearrangement
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, imageId: string) => {
    setDraggedImage(imageId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOverImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropImage = (e: React.DragEvent<HTMLDivElement>, targetImageId: string) => {
    e.preventDefault();
    if (!draggedImage || draggedImage === targetImageId) return;

    setSelectedImages((prev) => {
      const images = [...prev];
      const draggedIndex = images.findIndex(img => img.id === draggedImage);
      const targetIndex = images.findIndex(img => img.id === targetImageId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;

      const [draggedItem] = images.splice(draggedIndex, 1);
      images.splice(targetIndex, 0, draggedItem);
      
      return images;
    });

    setDraggedImage(null);
    setStatus({ message: "Image order updated", type: "success" });
  };

  // Remove image
  const removeImage = (id: string) => {
    setSelectedImages((prev) => {
      const newImages = prev.filter(img => img.id !== id);
      if (newImages.length === 0) {
        setStatus({ message: "All images removed", type: "success" });
      }
      return newImages;
    });
  };

  // Clear all images
  const clearAll = () => {
    setSelectedImages([]);
    setStatus({ message: "All images cleared", type: "success" });
  };

  // Move image up/down
  const moveImage = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === selectedImages.length - 1)) {
      return;
    }

    setSelectedImages((prev) => {
      const images = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [images[index], images[newIndex]] = [images[newIndex], images[index]];
      return images;
    });
  };

  // Generate PDF
  const generatePDF = async () => {
    if (selectedImages.length === 0) {
      setStatus({ message: "No images selected", type: "error" });
      return;
    }

    setLoading(true);
    setStatus({ message: "Generating PDF...", type: "info" });

    try {
      const pdf = new jsPDF({
        orientation: pageSettings.orientation,
        unit: 'mm',
        format: 'a4'
      });

      for (let i = 0; i < selectedImages.length; i++) {
        if (i > 0) pdf.addPage();

        const img = selectedImages[i];
        const imgElement = new Image();
        imgElement.src = img.url;

        await new Promise<void>((resolve) => {
          imgElement.onload = () => {
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            let width = imgElement.width;
            let height = imgElement.height;

            // Calculate available space considering margins
            const availableWidth = pdfWidth - (pageSettings.margin * 2);
            const availableHeight = pdfHeight - (pageSettings.margin * 2);

            // Scale to fit available space while maintaining aspect ratio
            const ratio = Math.min(availableWidth / width, availableHeight / height);
            width *= ratio;
            height *= ratio;

            const x = (pdfWidth - width) / 2;
            const y = (pdfHeight - height) / 2;

            const format = img.file.type === "image/png" ? "PNG" : "JPEG";
            pdf.addImage(imgElement, format, x, y, width, height, '', 'FAST');
            resolve();
          };
        });
      }

      pdf.save(`images-${new Date().getTime()}.pdf`);
      setStatus({ message: `PDF generated with ${selectedImages.length} image(s)`, type: "success" });
    } catch (error) {
      console.error(error);
      setStatus({ message: "Error generating PDF", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
      darkMode ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" : "bg-gradient-to-br from-blue-50 via-white to-gray-100"
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBackToHome}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              darkMode 
                ? "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" 
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-100"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </button>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            darkMode ? "bg-blue-900/30 text-blue-300" : "bg-blue-100 text-blue-700"
          }`}>
            Image to PDF Tool
          </div>
        </div>

        {/* Main Card */}
        <div className={`rounded-3xl shadow-2xl overflow-hidden ${
          darkMode ? "bg-gray-800/80 backdrop-blur-sm" : "bg-white/80 backdrop-blur-sm"
        }`}>
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-2xl ${
                  darkMode ? "bg-gradient-to-br from-blue-600/20 to-teal-600/20" : "bg-gradient-to-br from-blue-100 to-teal-100"
                }`}>
                  <ImageIcon className={`h-8 w-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r ${
                darkMode ? "from-blue-400 to-teal-400" : "from-blue-600 to-teal-600"
              } bg-clip-text text-transparent`}>
                Image to PDF Converter
              </h1>
              <p className={`text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Convert multiple images to PDF with drag-and-drop arrangement
              </p>
            </div>

            {/* Upload Area */}
            <div className="mb-6 md:mb-8">
              <label className={`block text-sm font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Upload Images
              </label>
              <div
                className={`border-2 border-dashed rounded-2xl p-6 md:p-8 text-center cursor-pointer transition-all duration-300 group ${
                  darkMode 
                    ? "border-gray-600 hover:border-blue-400 hover:bg-blue-400/5" 
                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-500/5"
                } ${selectedImages.length > 0 ? "border-green-400 bg-green-400/5" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  ref={fileInputRef}
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
                
                <div className="flex flex-col items-center justify-center">
                  {selectedImages.length > 0 ? (
                    <>
                      <CheckCircle className={`h-12 w-12 md:h-16 md:w-16 mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                      <h3 className="text-lg md:text-xl font-semibold mb-2">
                        {selectedImages.length} Image{selectedImages.length !== 1 ? 's' : ''} Selected
                      </h3>
                      <p className={`text-sm mt-2 ${darkMode ? "text-green-400" : "text-green-600"}`}>
                        Ready to convert to PDF!
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className={`h-12 w-12 md:h-16 md:w-16 mb-4 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      } group-hover:scale-110 transition-transform`} />
                      <h3 className="text-lg md:text-xl font-semibold mb-2">Upload Images</h3>
                      <p className={`text-sm md:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        Click to browse or drag & drop your images here
                      </p>
                      <p className={`text-xs mt-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        Supported formats: JPEG, PNG, WebP, GIF • Maximum 50 images
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Image Preview and Arrangement */}
            {selectedImages.length > 0 && (
              <div className="mb-6 md:mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    Image Arrangement ({selectedImages.length} images)
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setZoomLevel(Math.min(zoomLevel + 0.1, 2))}
                      disabled={zoomLevel >= 2}
                      className={`p-2 rounded-lg ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(Math.max(zoomLevel - 0.1, 0.5))}
                      disabled={zoomLevel <= 0.5}
                      className={`p-2 rounded-lg ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className={`p-2 rounded-lg ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* PDF Settings */}
                {showSettings && (
                  <div className={`p-4 rounded-xl mb-4 ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-100"
                  }`}>
                    <h3 className={`font-semibold mb-3 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                      PDF Settings
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Orientation
                        </label>
                        <select
                          value={pageSettings.orientation}
                          onChange={(e) => setPageSettings(prev => ({
                            ...prev,
                            orientation: e.target.value as 'portrait' | 'landscape'
                          }))}
                          className={`w-full p-2 border rounded-lg ${
                            darkMode 
                              ? "bg-gray-600 border-gray-500 text-white" 
                              : "bg-white border-gray-300"
                          }`}
                        >
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Margin (mm)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="30"
                          value={pageSettings.margin}
                          onChange={(e) => setPageSettings(prev => ({
                            ...prev,
                            margin: parseInt(e.target.value)
                          }))}
                          className="w-full"
                        />
                        <span className="text-sm">{pageSettings.margin}mm</span>
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Quality
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          step="10"
                          value={pageSettings.quality}
                          onChange={(e) => setPageSettings(prev => ({
                            ...prev,
                            quality: parseInt(e.target.value)
                          }))}
                          className="w-full"
                        />
                        <span className="text-sm">{pageSettings.quality}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
                  {selectedImages.map((img, index) => (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, img.id)}
                      onDragOver={handleDragOverImage}
                      onDrop={(e) => handleDropImage(e, img.id)}
                      className={`relative group border-2 rounded-lg p-2 transition-all duration-200 ${
                        darkMode 
                          ? "border-gray-600 hover:border-blue-400 bg-gray-700/50" 
                          : "border-gray-300 hover:border-blue-500 bg-white"
                      } ${draggedImage === img.id ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <GripVertical className={`h-4 w-4 cursor-grab ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`} />
                        <span className={`text-sm font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}>
                          Page {index + 1}
                        </span>
                        <div className="flex gap-1 ml-auto">
                          <button
                            onClick={() => moveImage(index, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded ${
                              darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                            } disabled:opacity-30`}
                          >
                            <ChevronUp className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => moveImage(index, 'down')}
                            disabled={index === selectedImages.length - 1}
                            className={`p-1 rounded ${
                              darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"
                            } disabled:opacity-30`}
                          >
                            <ChevronDown className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeImage(img.id)}
                            className={`p-1 rounded ${
                              darkMode 
                                ? "hover:bg-red-600/20 text-red-400" 
                                : "hover:bg-red-100 text-red-600"
                            }`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <img
                        src={img.url}
                        alt={`preview-${index}`}
                        className="w-full h-32 object-contain rounded"
                        style={{ transform: `scale(${zoomLevel})` }}
                      />
                    </div>
                  ))}
                </div>
                <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Drag images to rearrange order • Use arrows to move images up/down
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
              <button
                onClick={generatePDF}
                disabled={loading || selectedImages.length === 0}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  darkMode
                    ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
                }`}
              >
                {loading ? (
                  <>
                    <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                      darkMode ? "border-white" : "border-white"
                    }`}></div>
                    <span className="hidden sm:inline">Generating PDF...</span>
                    <span className="sm:hidden">Processing</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span className="hidden sm:inline">Generate PDF</span>
                    <span className="sm:hidden">Generate</span>
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                disabled={selectedImages.length === 0 || loading}
                className={`py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 border-2 ${
                  darkMode
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500 hover:scale-105"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:scale-105"
                }`}
              >
                <Trash2 className="h-5 w-5" />
                <span className="hidden sm:inline">Clear All</span>
                <span className="sm:hidden">Clear</span>
              </button>
            </div>

            {/* Status Messages */}
            {status && (
              <div className={`p-4 rounded-xl border-l-4 flex items-center gap-3 mb-4 animate-fade-in ${
                status.type === "success"
                  ? darkMode 
                    ? "bg-green-900/20 border-green-500 text-green-400" 
                    : "bg-green-50 border-green-500 text-green-700"
                  : status.type === "error"
                  ? darkMode 
                    ? "bg-red-900/20 border-red-500 text-red-400" 
                    : "bg-red-50 border-red-500 text-red-700"
                  : darkMode 
                    ? "bg-blue-900/20 border-blue-500 text-blue-400" 
                    : "bg-blue-50 border-blue-500 text-blue-700"
              }`}>
                {status.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                <p className="text-sm">{status.message}</p>
              </div>
            )}

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mt-8">
              <div className={`p-3 md:p-4 rounded-xl text-center transition-transform hover:scale-105 ${
                darkMode ? "bg-gray-700/30" : "bg-white/50"
              }`}>
                <div className={`p-2 rounded-lg inline-block mb-2 ${
                  darkMode ? "bg-blue-900/20" : "bg-blue-100"
                }`}>
                  <Upload className={`h-5 w-5 md:h-6 md:w-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <h3 className="font-semibold mb-1 text-sm md:text-base">Multi-Format</h3>
                <p className={`text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  JPEG, PNG, WebP, GIF
                </p>
              </div>

              <div className={`p-3 md:p-4 rounded-xl text-center transition-transform hover:scale-105 ${
                darkMode ? "bg-gray-700/30" : "bg-white/50"
              }`}>
                <div className={`p-2 rounded-lg inline-block mb-2 ${
                  darkMode ? "bg-green-900/20" : "bg-green-100"
                }`}>
                  <GripVertical className={`h-5 w-5 md:h-6 md:w-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                </div>
                <h3 className="font-semibold mb-1 text-sm md:text-base">Drag & Drop</h3>
                <p className={`text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Rearrange easily
                </p>
              </div>

              <div className={`p-3 md:p-4 rounded-xl text-center transition-transform hover:scale-105 ${
                darkMode ? "bg-gray-700/30" : "bg-white/50"
              }`}>
                <div className={`p-2 rounded-lg inline-block mb-2 ${
                  darkMode ? "bg-purple-900/20" : "bg-purple-100"
                }`}>
                  <Settings className={`h-5 w-5 md:h-6 md:w-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                </div>
                <h3 className="font-semibold mb-1 text-sm md:text-base">Customizable</h3>
                <p className={`text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Page settings
                </p>
              </div>

              <div className={`p-3 md:p-4 rounded-xl text-center transition-transform hover:scale-105 ${
                darkMode ? "bg-gray-700/30" : "bg-white/50"
              }`}>
                <div className={`p-2 rounded-lg inline-block mb-2 ${
                  darkMode ? "bg-orange-900/20" : "bg-orange-100"
                }`}>
                  <Download className={`h-5 w-5 md:h-6 md:w-6 ${darkMode ? "text-orange-400" : "text-orange-600"}`} />
                </div>
                <h3 className="font-semibold mb-1 text-sm md:text-base">High Quality</h3>
                <p className={`text-xs md:text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Optimized PDF
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="mt-6 text-center">
          <button
            onClick={handleBackToHome}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              darkMode 
                ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50" 
                : "text-gray-600 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Home className="h-4 w-4" />
            Back to All Tools
          </button>
        </div>
      </div>

      {/* Add custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ImgToPdf;