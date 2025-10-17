import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const { isLoading, isAuthenticated } = useAuth0();
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setShowDashboard(true);
    } else if (!isLoading && !isAuthenticated) {
      setShowDashboard(false);
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-foreground flex justify-center items-center">
        <div className="text-lg font-semibold text-grey">Loading...</div>
      </div>
    );
  }

  return showDashboard ? <Dashboard /> : <LandingPage />;
}

export default App;
