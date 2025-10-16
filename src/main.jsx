import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App.jsx";
import { auth0Config } from "./auth0-config";

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider {...auth0Config} onRedirectCallback={onRedirectCallback}>
      <App />
    </Auth0Provider>
  </StrictMode>
);
