// lib/api.ts

interface ApiOptions extends RequestInit {
  body?: any;
}

export async function apiFetch<T = any>(
  path: string,
  { method = "GET", body, headers, ...options }: ApiOptions = {}
): Promise<T> {
  const isBrowser = typeof window !== "undefined";

  const baseUrl = isBrowser
    ? "" // relative on client
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // absolute on server

  const url = `${baseUrl}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store", // prevents stale data when server renders
    ...options,
  });

  if (!res.ok) {
    let errorMessage = `API error: ${res.status}`;
    try {
      const errJson = await res.json();
      errorMessage = errJson.error || JSON.stringify(errJson);
    } catch {}
    throw new Error(errorMessage);
  }

  return res.json();
}
