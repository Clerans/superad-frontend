import { Link } from 'react-router-dom';
import { PlusCircle, Database, FileText, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { SERVICE_CATEGORIES } from '@/types/portfolio';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';

export default function AdminDashboard() {
  const { projects, loading, error } = useProjects();

  // Aggregate stats
  const totalProjects = projects.length;
  const totalImages = projects.reduce((sum, p) => sum + (p.images?.length || 0), 0);

  const categoryCounts = SERVICE_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = 0;
    return acc;
  }, {} as Record<string, number>);

  projects.forEach((p) => {
    if (categoryCounts[p.category] !== undefined) {
      categoryCounts[p.category]++;
    }
  });

  // Recent 5 projects
  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'N/A';
    }
  };

  // Category gradients
  const categoryColorClass = (cat: string) => {
    switch (cat) {
      case 'Nameboard': return 'from-blue-500/10 to-cyan-500/10 border-blue-200 text-blue-700';
      case 'Hoarding': return 'from-orange-500/10 to-red-500/10 border-orange-200 text-orange-700';
      case 'Lightboard': return 'from-yellow-500/10 to-orange-500/10 border-yellow-200 text-yellow-700';
      case 'Wall Branding': return 'from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-700';
      case 'Glass Branding': return 'from-teal-500/10 to-blue-500/10 border-teal-200 text-teal-700';
      case 'MDF Counter': return 'from-green-500/10 to-emerald-500/10 border-green-200 text-green-700';
      case 'Iron Racks': return 'from-indigo-500/10 to-purple-500/10 border-indigo-200 text-indigo-700';
      default: return 'from-gray-500/10 to-gray-500/10 border-gray-200 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-secondary font-bold">Aggregating dashboard statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-secondary to-[#002B5B] text-white p-8 rounded-2xl border-4 border-primary shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-primary to-transparent pointer-events-none" />
        <div>
          <h1 className="text-2xl font-black md:text-3xl">Dashboard Overview</h1>
          <p className="text-sm text-accent font-bold mt-1">SuperAds Portfolio Management Console</p>
        </div>
        <Link to="/admin/projects/new">
          <Button className="bg-primary hover:bg-white hover:text-secondary text-white font-bold px-6 py-2.5 rounded-xl border-2 border-primary hover:border-white transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-lg">
            <PlusCircle className="w-5 h-5" />
            <span>Create Project</span>
          </Button>
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-semibold text-center">
          Error loading dashboard statistics: {error}
        </div>
      )}

      {/* High-level metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Projects Card */}
        <div className="bg-white border-4 border-accent rounded-2xl p-6 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Projects</p>
            <p className="text-4xl font-black text-secondary">{totalProjects}</p>
          </div>
          <div className="p-4 bg-secondary/10 rounded-2xl border-2 border-secondary/20">
            <FileText className="w-8 h-8 text-secondary" />
          </div>
        </div>

        {/* Total Images Card */}
        <div className="bg-white border-4 border-accent rounded-2xl p-6 shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Images Hosted</p>
            <p className="text-4xl font-black text-secondary">{totalImages}</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-2xl border-2 border-primary/20">
            <ImageIcon className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Projects per category Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-bold text-secondary">Projects by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {SERVICE_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            return (
              <div
                key={cat}
                className={`border-2 rounded-2xl p-4 text-center shadow-xs bg-gradient-to-b flex flex-col justify-between items-center transition-all hover:scale-105 hover:shadow-md ${categoryColorClass(cat)}`}
              >
                <span className="text-[10px] font-black uppercase tracking-wider block min-h-[32px] flex items-center justify-center">
                  {cat}
                </span>
                <span className="text-2xl font-black mt-2 block">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom details block (Recent updates) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent projects list */}
        <div className="lg:col-span-2 bg-white border-4 border-primary/20 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-bold text-secondary">Recently Added</h3>
            <Link to="/admin/projects" className="text-primary hover:underline font-bold text-xs flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-sm">
              No projects created yet. Click "Create Project" to get started.
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentProjects.map((p) => {
                const img = p.images.find((i) => i.is_primary)?.image_url || p.images[0]?.image_url || '';
                return (
                  <div key={p.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-accent/20 bg-gray-50 flex-shrink-0">
                      <ImageWithFallback src={img} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-secondary truncate">{p.title}</h4>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <span className="font-semibold text-primary uppercase text-[9px] bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10">
                          {p.category}
                        </span>
                        <span>•</span>
                        <span>{formatDate(p.created_at)}</span>
                      </p>
                    </div>
                    <Link to={`/admin/projects/${p.id}/edit`}>
                      <Button size="sm" variant="outline" className="text-xs font-semibold cursor-pointer border-accent/60 hover:border-primary hover:text-primary rounded-lg">
                        Edit
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Help / Info Box */}
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-4 border-accent rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-secondary">Quick Guide</h3>
            <div className="space-y-2 text-xs text-secondary/90 leading-relaxed">
              <p>
                <strong>1. Create:</strong> Click the "Create Project" button, fill in the title and select the BTL service category.
              </p>
              <p>
                <strong>2. Images:</strong> Once created, you can drag and drop up to 10 images at once. The first uploaded image becomes the default display image on the website.
              </p>
              <p>
                <strong>3. Live:</strong> Any project updates made here are instantly synced and live on the public facing website page!
              </p>
            </div>
          </div>
          <div className="pt-4 border-t border-accent/25 mt-4 text-center">
            <p className="text-[10px] text-muted-foreground">Logged in as admin user</p>
          </div>
        </div>
      </div>
    </div>
  );
}
