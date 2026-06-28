import { useState, useEffect, useCallback } from 'react';
import { Project } from '@/types/portfolio';
import { portfolioApi } from '../api/portfolioApi';

export function useProjects(category?: string | null) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await portfolioApi.getProjects(category || undefined);
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
  };
}
