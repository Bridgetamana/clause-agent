import { useState, useEffect } from "react";
import { useApiClient, playbookAPI } from "../api/client";

export default function PlaybookSection({ userId }) {
  const [playbook, setPlaybook] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [, setIsLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState("");
  const apiClient = useApiClient();

  useEffect(() => {
    const loadPlaybook = async () => {
      try {
        setIsLoading(true);
        const response = await playbookAPI.get(apiClient);
        if (response.content) {
          setPlaybook(response.content);
        }
      } catch {
        // Fall back to local storage if API call fails
        const savedPlaybook = localStorage.getItem(`playbook_${userId}`);
        if (savedPlaybook) {
          setPlaybook(savedPlaybook);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaybook();
  }, [userId, apiClient]);

  const handleSave = async () => {
    setIsSaving(true);
    setSavedMessage("");

    try {
      await playbookAPI.save(apiClient, playbook);
      localStorage.setItem(`playbook_${userId}`, playbook);
      setSavedMessage("✓ Saved");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch {
      setSavedMessage("✗ Failed");
      // Save to local storage as fallback
      localStorage.setItem(`playbook_${userId}`, playbook);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <h2 className="text-3xl font-light tracking-tight">Company Playbook</h2>
        <p className="text-grey font-light leading-relaxed max-w-2xl">
          Define your company's non-negotiable rules. These become the
          foundation for contract analysis.
        </p>
      </div>

      <div className="space-y-8">
        <div className="pt-8 border-t border-border space-y-4">
          <p className="text-xs uppercase tracking-widest text-grey">
            Examples
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Payment terms must be Net 30 or less",
              "Early termination clause required",
              "Liability capped at contract value",
              "All contracts must comply with GDPR",
            ].map((example, idx) => (
              <div
                key={idx}
                className="p-3 border border-border rounded text-xs text-slate-300 font-light"
              >
                {example}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-border space-y-4">
          <label className="block text-sm font-light text-slate-200">
            Your Rules
          </label>
          <textarea
            value={playbook}
            onChange={(e) => setPlaybook(e.target.value)}
            placeholder="Enter your company rules in plain English. One per line or however you prefer."
            className="w-full h-56 px-4 py-3 bg-slate-900 border border-border text-foreground placeholder-grey font-light rounded focus:outline-none focus:border-grey focus:ring-1 focus:ring-grey resize-none transition-colors duration-300"
          />
        </div>

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving || !playbook.trim()}
            className="px-6 py-2 border border-grey text-foreground text-sm font-light hover:border-slate-200 hover:bg-slate-900 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Rules"}
          </button>
          {savedMessage && (
            <span
              className={`text-xs ${
                savedMessage.includes("✓") ? "text-success" : "text-danger"
              } font-light`}
            >
              {savedMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
