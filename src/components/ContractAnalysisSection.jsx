import { useState } from "react";

export default function ContractAnalysisSection() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a PDF file first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      setTimeout(() => {
        setAnalysisResult({
          greenFlags: [
            "Confidentiality clause is standard and fair",
            "Term length (1 year) is acceptable",
          ],
          yellowFlags: [
            "Payment terms are Net 60, but your playbook prefers Net 30",
            "Termination clause requires 60 days notice",
          ],
          redFlags: [
            "No liability cap found - violates your playbook rule",
            "Indemnification clause is too broad",
          ],
        });
      }, 2000);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze contract");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Analyze a Contract
        </h2>
        <p className="text-gray-600">
          Upload a PDF contract and our AI agent will analyze it against your
          playbook, flagging risky clauses and explaining legal terms in simple
          language.
        </p>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pdf-upload"
          disabled={isAnalyzing}
        />
        <label htmlFor="pdf-upload" className="cursor-pointer">
          <div className="text-5xl mb-2">📄</div>
          <p className="text-gray-700 font-semibold">
            {file ? file.name : "Click to upload a PDF"}
          </p>
          <p className="text-gray-500 text-sm mt-1">or drag and drop</p>
        </label>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!file || isAnalyzing}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isAnalyzing ? "Analyzing Contract..." : "Analyze Contract"}
      </button>

      {analysisResult && (
        <div className="space-y-4 mt-8 border-t pt-8">
          <h3 className="text-2xl font-bold text-gray-800">Analysis Results</h3>

          {analysisResult.greenFlags.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-900 mb-3">
             Green-Light Clauses
              </h4>
              <ul className="space-y-2">
                {analysisResult.greenFlags.map((flag, idx) => (
                  <li key={idx} className="text-green-800">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {analysisResult.yellowFlags.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-900 mb-3">
                Yellow-Flag Clauses
              </h4>
              <ul className="space-y-2">
                {analysisResult.yellowFlags.map((flag, idx) => (
                  <li key={idx} className="text-yellow-800">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysisResult.redFlags.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-900 mb-3">
                Red-Flag Clauses
              </h4>
              <ul className="space-y-2">
                {analysisResult.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-red-800">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-4 mt-6 pt-4 border-t">
            <button className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Approve & Sign
            </button>
            <button className="flex-1 bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Request Changes
            </button>
            <button className="flex-1 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
