/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "https://lesson-starter-1.onrender.com";

async function request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("accessToken");
    const headers = new Headers(options.headers || {});
    if (token && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
    }
    if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await response.json().catch(() => ({}));

    const errorMessage = data?.message || '';
    const isTokenError = errorMessage === 'Invalid or expired token'
    if (isTokenError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        window.location.href = '/auth/auth2/login';
        return { response, data };
    }

    return { response, data };
}

export const api = {
    get: (url: string, options?: RequestInit) =>
        request(url, { ...options, method: "GET" }),
    post: (url: string, body?: any, options?: RequestInit) => {
        const isForm = body instanceof FormData;
        return request(url, {
            ...options,
            method: "POST",
            body: isForm ? body : JSON.stringify(body)
        });
    },

    put: (url: string, body?: any, options?: RequestInit) => {
        const isForm = body instanceof FormData;
        return request(url, {
            ...options,
            method: "PUT",
            body: isForm ? body : JSON.stringify(body)
        });
    },

    delete: (url: string, options?: RequestInit) =>
        request(url, { ...options, method: "DELETE" }),
};