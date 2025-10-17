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
        <p className="text-grey font-light leading-relaxed max-w-2xl">
          Upload a PDF and our AI analyzes it against your playbook, flagging
          risky clauses and explaining them clearly.
        </p>
      </div>

      <div className="pt-8 border-t border-border space-y-6">
        <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-grey transition-colors duration-300">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
            disabled={isAnalyzing}
          />
          <label htmlFor="pdf-upload" className="cursor-pointer block">
            <div className="text-4xl mb-3">���</div>
            <p className="text-slate-200 font-light">
              {file ? file.name : "Upload a PDF contract"}
            </p>
            <p className="text-grey text-xs mt-2 font-light">
              or drag and drop
            </p>
          </label>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          className="w-full px-6 py-3 border border-grey text-foreground text-sm font-light hover:border-slate-200 hover:bg-background-alt transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? "��� Analyzing..." : "Analyze Contract"}
        </button>
      </div>

      {analysisResult && (
        <div className="space-y-6 mt-8 border-t border-border pt-8 animate-fade-in-up">
          <h3 className="text-3xl font-light tracking-tight">
            Analysis Results
          </h3>

          {analysisResult.greenFlags.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-success font-semibold">
                ✓ Green-Light Clauses
              </p>
              <ul className="space-y-2">
                {analysisResult.greenFlags.map((flag, idx) => (
                  <li key={idx} className="text-slate-300 font-light text-sm">
                    • {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysisResult.yellowFlags.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-warning font-semibold">
                ⚠ Yellow-Flag Clauses
              </p>
              <ul className="space-y-2">
                {analysisResult.yellowFlags.map((flag, idx) => (
                  <li key={idx} className="text-slate-300 font-light text-sm">
                    • {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysisResult.redFlags.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-danger font-semibold">
                ✕ Red-Flag Clauses
              </p>
              <ul className="space-y-2">
                {analysisResult.redFlags.map((flag, idx) => (
                  <li key={idx} className="text-slate-300 font-light text-sm">
                    • {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-6 border-t border-border">
            <button className="flex-1 px-4 py-2 border border-success text-success text-xs font-light hover:bg-success/90 transition-colors duration-300">
              Approve & Sign
            </button>
            <button className="flex-1 px-4 py-2 border border-warning text-warning text-xs font-light hover:bg-warning/90 transition-colors duration-300">
              Request Changes
            </button>
            <button className="flex-1 px-4 py-2 border border-danger text-danger text-xs font-light hover:bg-danger/90 transition-colors duration-300">
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
