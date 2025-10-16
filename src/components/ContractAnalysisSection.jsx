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
    <div className="space-y-12">
      <div className="space-y-3">
        <h2 className="text-3xl font-light tracking-tight">
          Analyze a Contract
        </h2>
        <p className="text-slate-400 font-light leading-relaxed max-w-2xl">
          Upload a PDF and our AI analyzes it against your playbook, flagging
          risky clauses and explaining them clearly.
        </p>
      </div>

      <div className="pt-8 border-t border-slate-800 space-y-6">
        <div className="border-2 border-dashed border-slate-700 rounded-lg p-12 text-center hover:border-slate-500 transition-colors duration-300">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
            disabled={isAnalyzing}
          />
          <label htmlFor="pdf-upload" className="cursor-pointer block">
            <div className="text-4xl mb-3">📄</div>
            <p className="text-slate-200 font-light">
              {file ? file.name : "Upload a PDF contract"}
            </p>
            <p className="text-slate-500 text-xs mt-2 font-light">
              or drag and drop
            </p>
          </label>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          className="w-full px-6 py-3 border border-slate-400 text-slate-50 text-sm font-light hover:border-slate-200 hover:bg-slate-900 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? "🔄 Analyzing..." : "Analyze Contract"}
        </button>
      </div>

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
              <h4 className="font-bold text-red-900 mb-3">Red-Flag Clauses</h4>
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
