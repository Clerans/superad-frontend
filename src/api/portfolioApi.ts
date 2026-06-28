import { Project, ProjectImage, AdminUser } from '@/types/portfolio';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Interceptor helper to check for auth expiration
async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    // Force redirect on 401
    window.location.href = '/admin/login';
    throw new Error('Unauthorized - Redirecting to login');
  }
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export const portfolioApi = {
  // Public
  getProjects: async (category?: string): Promise<Project[]> => {
    const url = category ? `${BASE_URL}/projects?category=${encodeURIComponent(category)}` : `${BASE_URL}/projects`;
    const res = await fetch(url);
    return handleResponse<Project[]>(res);
  },

  getProject: async (id: string): Promise<Project> => {
    const res = await fetch(`${BASE_URL}/projects/${id}`);
    return handleResponse<Project>(res);
  },

  // Admin (authenticated)
  login: async (username: string, password: string): Promise<AdminUser> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return handleResponse<AdminUser>(res);
  },

  createProject: async (data: { title: string; description: string; category: string }): Promise<Project> => {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse<Project>(res);
  },

  updateProject: async (id: string, data: Partial<{ title: string; description: string; category: string }>): Promise<Project> => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify(data),
    });
    return handleResponse<Project>(res);
  },

  deleteProject: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_username');
      window.location.href = '/admin/login';
      throw new Error('Unauthorized');
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to delete project');
    }
  },

  uploadImages: async (projectId: string, files: File[]): Promise<ProjectImage[]> => {
    const formData = new FormData();
    formData.append('project_id', projectId);
    files.forEach(f => formData.append('images', f));
    const res = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: formData,
    });
    return handleResponse<ProjectImage[]>(res);
  },

  deleteImage: async (imageId: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/upload/${imageId}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_username');
      window.location.href = '/admin/login';
      throw new Error('Unauthorized');
    }
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to delete image');
    }
  },
};
