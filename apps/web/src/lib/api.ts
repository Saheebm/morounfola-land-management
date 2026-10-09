import { useAppStore } from '../store/useAppStore';

/**
 * Resolves and normalizes the API base URL.
 * Supports:
 * - Full URL with /api (e.g. https://api.example.com/api)
 * - Full URL without /api (e.g. https://api.example.com)
 * - Dev fallback (http://localhost:5000/api)
 * - Production relative fallback (/api)
 */
function getApiBaseUrl(): string {
  const envUrl = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
  if (envUrl) {
    return envUrl;
  }
  // If not configured, use localhost in development, or relative /api in production
  return import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, headers, ...customConfig } = options;
  const baseUrl = getApiBaseUrl();

  let normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Prevent duplicate /api/api/... if baseUrl already includes /api
  if (baseUrl.endsWith('/api') && normalizedEndpoint.startsWith('/api/')) {
    normalizedEndpoint = normalizedEndpoint.slice(4);
  }

  let url = `${baseUrl}${normalizedEndpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  // Get active role from Zustand
  const currentRole = useAppStore.getState().activeRole;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Role': currentRole,
  };

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorBody: any = {};
      try {
        errorBody = await response.json();
      } catch {
        errorBody = { message: response.statusText };
      }

      const errorMessage =
        errorBody.message || `API Error: ${response.status} ${response.statusText}`;

      // Global toast notification on error
      useAppStore.getState().addToast({
        type: 'error',
        title: 'Error',
        message: errorMessage,
      });

      throw new ApiError(response.status, errorMessage, errorBody);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    const networkError = new ApiError(0, err.message || 'Network error occurred');
    useAppStore.getState().addToast({
      type: 'error',
      title: 'সংযোগ ত্রুটি / Connection Error',
      message: networkError.message,
    });
    throw networkError;
  }
}

export const api = {
  get: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
