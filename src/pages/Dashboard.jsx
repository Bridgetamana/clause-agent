import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import PlaybookSection from "../components/PlaybookSection";
import ContractAnalysisSection from "../components/ContractAnalysisSection";

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth0();
  const [activeTab, setActiveTab] = useState("playbook");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex justify-center items-center">
        <div className="text-sm font-light text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-full h-full opacity-[0.03]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="border-b border-slate-800 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-light tracking-tight opacity-90">
                ClauseClarity
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Welcome, {user?.name || user?.email}
              </p>
            </div>
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              className="text-slate-400 text-sm hover:text-slate-100 transition-colors duration-300"
            >
              Sign out
            </button>
          </div>
        </header>

        <main className="flex-1 px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 mb-12 border-b border-slate-800 pb-8">
              <button
                onClick={() => setActiveTab("playbook")}
                className={`px-6 py-2 text-sm font-light transition-all duration-300 relative ${
                  activeTab === "playbook"
                    ? "text-slate-50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Company Playbook
                {activeTab === "playbook" && (
                  <div className="absolute bottom-[-8px] left-0 right-0 h-px bg-slate-50"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("analyze")}
                className={`px-6 py-2 text-sm font-light transition-all duration-300 relative ${
                  activeTab === "analyze"
                    ? "text-slate-50"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Analyze Contract
                {activeTab === "analyze" && (
                  <div className="absolute bottom-[-8px] left-0 right-0 h-px bg-slate-50"></div>
                )}
              </button>
            </div>

            <div className="animate-fade-in-up">
              {activeTab === "playbook" && (
                <PlaybookSection userId={user?.sub} />
              )}
              {activeTab === "analyze" && (
                <ContractAnalysisSection userId={user?.sub} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
