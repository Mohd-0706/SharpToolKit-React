import React, { useState, useRef } from "react";
import { Scissors, Upload, Download, RotateCw, FileText, AlertCircle, CheckCircle } from "lucide-react";

const PdfSplit: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pages, setPages] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setSuccess(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handlePagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPages(e.target.value);
    setError(null);
  };

  const handleSplit = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }
    if (!pages.trim()) {
      setError("Please enter pages to extract (comma-separated or ranges like 1-5).");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("pages", pages);

      const response = await fetch("https://sharp-tools-react.onrender.com/split", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to split PDF");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `split-${fileName || "document"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      setSuccess("PDF successfully split and downloaded!");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while processing the PDF");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPages("");
    setError(null);
    setSuccess(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        setFileName(file.name);
        setError(null);
        setSuccess(null);
      } else {
        setError("Please upload a PDF file only.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={`min-h-screen py-12 px-4 transition-colors duration-300 ${
      darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-blue-50 to-gray-100"
    }`}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className={`p-3 rounded-2xl ${
              darkMode ? "bg-blue-900/20" : "bg-blue-100"
            }`}>
              <Scissors className={`h-8 w-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            </div>
          </div>
          <h1 className={`text-4xl font-bold mb-3 bg-gradient-to-r ${
            darkMode ? "from-blue-400 to-teal-400" : "from-blue-600 to-teal-600"
          } bg-clip-text text-transparent`}>
            PDF Splitter
          </h1>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Extract specific pages from your PDF documents with ease
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group ${
              darkMode 
                ? "border-gray-600 hover:border-blue-400 hover:bg-blue-400/5" 
                : "border-gray-300 hover:border-blue-500 hover:bg-blue-500/5"
            } ${selectedFile ? "border-green-400 bg-green-400/5" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="flex flex-col items-center justify-center">
              {selectedFile ? (
                <>
                  <CheckCircle className={`h-16 w-16 mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                  <h3 className="text-xl font-semibold mb-2">File Selected</h3>
                  <p className={`font-mono text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {fileName}
                  </p>
                  <p className={`text-sm mt-2 ${darkMode ? "text-green-400" : "text-green-600"}`}>
                    Ready to split!
                  </p>
                </>
              ) : (
                <>
                  <Upload className={`h-16 w-16 mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-semibold mb-2">Upload PDF File</h3>
                  <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                    Click to browse or drag & drop your PDF here
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Pages Input */}
        <div className="mb-8">
          <label className={`block text-sm font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Pages to Extract
          </label>
          <div className="relative">
            <FileText className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`} />
            <input
              type="text"
              placeholder="e.g., 1,3,5 or 1-5 or 1,3-5,8"
              value={pages}
              onChange={handlePagesChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                darkMode 
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400" 
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
          <p className={`text-xs mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Enter page numbers separated by commas, or ranges using hyphens (e.g., 1,3-5,8)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={handleSplit}
            disabled={loading || !selectedFile || !pages.trim()}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
              darkMode
                ? "bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl"
                : "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <>
                <div className={`animate-spin rounded-full h-5 w-5 border-b-2 ${
                  darkMode ? "border-white" : "border-white"
                }`}></div>
                Processing...
              </>
            ) : (
              <>
                <Scissors className="h-5 w-5" />
                Split PDF
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            className={`py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 border-2 ${
              darkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            <RotateCw className="h-5 w-5" />
            Reset
          </button>
        </div>

        {/* Status Messages */}
        {error && (
          <div className={`p-4 rounded-xl border-l-4 flex items-center gap-3 mb-4 ${
            darkMode ? "bg-red-900/20 border-red-500 text-red-400" : "bg-red-50 border-red-500 text-red-700"
          }`}>
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className={`p-4 rounded-xl border-l-4 flex items-center gap-3 mb-4 ${
            darkMode ? "bg-green-900/20 border-green-500 text-green-400" : "bg-green-50 border-green-500 text-green-700"
          }`}>
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <p>{success}</p>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className={`p-4 rounded-xl text-center ${
            darkMode ? "bg-gray-800/50" : "bg-white/50"
          }`}>
            <div className={`p-2 rounded-lg inline-block mb-2 ${
              darkMode ? "bg-blue-900/20" : "bg-blue-100"
            }`}>
              <Upload className={`h-6 w-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <h3 className="font-semibold mb-1">Easy Upload</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Drag & drop or click to upload
            </p>
          </div>

          <div className={`p-4 rounded-xl text-center ${
            darkMode ? "bg-gray-800/50" : "bg-white/50"
          }`}>
            <div className={`p-2 rounded-lg inline-block mb-2 ${
              darkMode ? "bg-green-900/20" : "bg-green-100"
            }`}>
              <Scissors className={`h-6 w-6 ${darkMode ? "text-green-400" : "text-green-600"}`} />
            </div>
            <h3 className="font-semibold mb-1">Flexible Selection</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Select pages by numbers or ranges
            </p>
          </div>

          <div className={`p-4 rounded-xl text-center ${
            darkMode ? "bg-gray-800/50" : "bg-white/50"
          }`}>
            <div className={`p-2 rounded-lg inline-block mb-2 ${
              darkMode ? "bg-purple-900/20" : "bg-purple-100"
            }`}>
              <Download className={`h-6 w-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
            </div>
            <h3 className="font-semibold mb-1">Instant Download</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Get your split PDF immediately
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className={`mt-8 p-6 rounded-2xl ${
          darkMode ? "bg-gray-800/30" : "bg-white/50"
        }`}>
          <h3 className={`font-semibold mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            How to use:
          </h3>
          <ol className={`list-decimal list-inside space-y-2 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            <li>Upload your PDF file by clicking the upload area or dragging & dropping</li>
            <li>Enter the pages you want to extract (e.g., "1,3,5" or "1-5" or "1,3-5,8")</li>
            <li>Click "Split PDF" to process your document</li>
            <li>Download your new PDF with only the selected pages</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PdfSplit;