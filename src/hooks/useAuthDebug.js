import { useAuth0 } from "@auth0/auth0-react";

export function useAuthDebug() {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const testAuth = async () => {
    if (!isAuthenticated) {
      return { success: false, error: "Not authenticated" };
    }

    try {
      const token = await getAccessTokenSilently({
        detailedResponse: true,
      });

      const playbookResponse = await fetch("http://localhost:8000/api/playbook/get", {
        headers: {
          Authorization: `Bearer ${token.access_token}`
        }
      });

      if (!playbookResponse.ok) {
        return {
          success: false,
          error: `API returned ${playbookResponse.status}`,
          tokenInfo: {
            tokenType: token.token_type,
            scope: token.scope,
            expiresIn: token.expires_in,
          }
        };
      }

      return {
        success: true,
        tokenInfo: {
          tokenType: token.token_type,
          scope: token.scope,
          expiresIn: token.expires_in,
        }
      };
    } catch (error) {
      return {
        success: false,
        error: String(error)
      };
    }
  };

  return {
    testAuth,
    isAuthenticated,
    user
  };
}