import { BaseUrl ,} from "./endpoints";

export const apiCall = async (endpoint, method = "GET", body = null, token = null) => {
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const response = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(body),
    });
    return response.json();
};

export const login = (username, password) => {
    return apiCall(`${BaseUrl}api/auth/login`, "POST", { username, password });
}

