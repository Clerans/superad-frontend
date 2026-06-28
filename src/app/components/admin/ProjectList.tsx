import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Images, Calendar, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useProjects } from '@/hooks/useProjects';
import { portfolioApi } from '@/api/portfolioApi';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

export default function ProjectList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { projects, loading, error, refetch } = useProjects();

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will permanently delete the project and all of its images from Cloudinary.`)) {
      return;
    }

    const toastId = toast.loading('Deleting project...');
    try {
      await portfolioApi.deleteProject(id);
      toast.success('Project deleted successfully', { id: toastId });
      refetch();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete project', { id: toastId });
    }
  };

  // Filter projects by title or category based on search
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-secondary">Manage Projects</h1>
          <p className="text-xs text-muted-foreground">Create, edit, or delete portfolio projects</p>
        </div>
        <Link to="/admin/projects/new">
          <Button className="bg-primary hover:bg-secondary text-white font-bold rounded-xl border-2 border-primary hover:border-secondary transition-all cursor-pointer flex items-center gap-1.5 shadow-md">
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Button>
        </Link>
      </div>

      {/* Search Filter Bar */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <Search className="w-4 h-4" />
        </span>
        <Input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 border-2 border-gray-200 rounded-xl focus:border-primary w-full bg-white"
        />
      </div>

      {/* Error state */}
      {error && (
        <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
          <p className="text-red-600 font-bold mb-3">Error loading projects: {error}</p>
          <Button onClick={refetch} className="bg-primary hover:bg-secondary text-white font-bold cursor-pointer">
            Retry
          </Button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading ? (
        <div className="border-4 border-gray-100 rounded-2xl overflow-hidden bg-white p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0 animate-pulse">
              <div className="w-24 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        /* Empty State */
        <div className="bg-white border-4 border-dashed border-accent/40 rounded-2xl p-12 text-center flex flex-col items-center">
          <Images className="w-16 h-16 text-accent mb-4" />
          <h3 className="text-lg font-bold text-secondary mb-1">No Projects Found</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Start showcasing your success stories!'}
          </p>
          {!searchTerm && (
            <Link to="/admin/projects/new">
              <Button className="bg-primary hover:bg-secondary text-white font-bold rounded-xl border-2 border-primary hover:border-secondary transition-all cursor-pointer">
                Create First Project
              </Button>
            </Link>
          )}
        </div>
      ) : (
        /* Project Table List */
        <div className="bg-white border-4 border-primary/20 rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary text-white font-bold text-sm border-b border-secondary/20">
                  <th className="py-4 px-6">Thumbnail</th>
                  <th className="py-4 px-6">Project Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6 text-center">Images</th>
                  <th className="py-4 px-6">Date Added</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProjects.map((p) => {
                  const primaryImg = p.images.find((img) => img.is_primary)?.image_url || p.images[0]?.image_url || '';
                  return (
                    <tr key={p.id} className="hover:bg-accent/5 transition-colors">
                      {/* Image Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="w-24 h-16 rounded-lg overflow-hidden border border-accent/30 bg-gray-50 flex-shrink-0">
                          <ImageWithFallback src={primaryImg} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                      </td>

                      {/* Title */}
                      <td className="py-4 px-6 font-bold text-secondary max-w-xs truncate">
                        {p.title}
                      </td>

                      {/* Category Badge */}
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-xs font-bold uppercase tracking-wider">
                          {p.category}
                        </span>
                      </td>

                      {/* Images Count */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                          <Images className="w-4 h-4 text-accent" />
                          <span className="font-bold">{p.images.length}</span>
                        </div>
                      </td>

                      {/* Creation Date */}
                      <td className="py-4 px-6 text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{formatDate(p.created_at)}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/admin/projects/${p.id}/edit`)}
                            className="p-2 text-secondary hover:text-primary rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                            title="Edit Project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
