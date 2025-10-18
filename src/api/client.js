import { useAuth0 } from "@auth0/auth0-react";

const API_BASE_URL = "http://localhost:8000/api";

export const useApiClient = () => {
    const { getAccessTokenSilently } = useAuth0();

    const makeRequest = async (method, endpoint, data = null) => {
        const token = await getAccessTokenSilently();

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        return await response.json();
    };

    return {
        get: (endpoint) => makeRequest("GET", endpoint),
        post: (endpoint, data) => makeRequest("POST", endpoint, data),
        put: (endpoint, data) => makeRequest("PUT", endpoint, data),
        delete: (endpoint) => makeRequest("DELETE", endpoint),
    };
};

export const playbookAPI = {
    save: (client, content) => client.post("/playbook/save", { content }),
    get: (client) => client.get("/playbook/get"),
};
