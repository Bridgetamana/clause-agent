import { useAuth0 } from "@auth0/auth0-react";

export default function SignOutButton() {
  const { isAuthenticated, logout } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="absolute top-8 right-8 z-10 animate-slide-down">
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className="text-grey text-sm hover:text-foreground transition-colors duration-300"
      >
        Sign out
      </button>
    </div>
  );
}
