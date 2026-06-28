import { useState } from 'react';
import { motion } from 'motion/react';
import { RefreshCw, ImageOff } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import { ServiceCategory } from '@/types/portfolio';
import CategoryFilter from './portfolio/CategoryFilter';
import ProjectCard from './portfolio/ProjectCard';
import ProjectModal from './portfolio/ProjectModal';
import Lightbox from './portfolio/Lightbox';
import { Button } from '@/app/components/ui/button';

// Loading skeleton matching layout dimensions
function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden border-4 border-accent/30 shadow-lg animate-pulse"
        >
          <div className="h-64 sm:h-80 bg-gray-200" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
            <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-4/5 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Error state display
interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="text-center py-12 bg-red-50 border-4 border-dashed border-red-200 rounded-2xl max-w-xl mx-auto p-6">
      <p className="text-red-600 font-bold mb-4">Failed to load portfolio: {message}</p>
      <Button
        onClick={onRetry}
        className="bg-primary hover:bg-secondary text-white font-bold cursor-pointer flex items-center gap-2 mx-auto"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try Again</span>
      </Button>
    </div>
  );
}

// Empty state display
interface EmptyStateProps {
  category: ServiceCategory | null;
}

function EmptyState({ category }: EmptyStateProps) {
  return (
    <div className="text-center py-16 bg-white/50 border-4 border-dashed border-accent/40 rounded-2xl max-w-xl mx-auto p-8">
      <ImageOff className="w-12 h-12 text-accent mx-auto mb-3" />
      <h3 className="text-lg font-bold text-secondary mb-1">No Projects Found</h3>
      <p className="text-sm text-muted-foreground">
        We haven't added projects for{' '}
        <span className="font-bold text-primary">{category || 'this category'}</span> yet. Please
        check back soon!
      </p>
    </div>
  );
}

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
  const { projects, loading, error, refetch } = useProjects(selectedCategory);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Lightbox State
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleImageClickInModal = (imageUrl: string) => {
    setLightboxImage(imageUrl);
    setLightboxOpen(true);
  };

  return (
    <section id="portfolio" className="py-20 lg:py-32 border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full border-2 border-primary">
            <span className="text-primary font-semibold">Our Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-secondary">
            Our Work &{' '}
            <span className="text-primary">Portfolio</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Explore our portfolio of successful BTL campaigns, nameboards, hoardings, lightboards, and branding solutions built with outstanding visual appeal.
          </p>
        </motion.div>

        {/* Category Pill Filter */}
        <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />

        {/* Data Loading, Errors, Grid and Empty states */}
        {loading && <LoadingSkeleton />}

        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {!loading && !error && projects.length === 0 && (
          <EmptyState category={selectedCategory} />
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
                onImageClick={handleImageClickInModal}
              />
            ))}
          </div>
        )}

        {/* Project Details Dialog Modal */}
        <ProjectModal
          project={selectedProject}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onImageClick={handleImageClickInModal}
        />

        {/* Fullscreen Image Lightbox */}
        <Lightbox
          image={lightboxImage}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />

        {/* Stats Section (Kept exactly as-is from original code) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '500+', label: 'Projects Completed' },
            { number: '200+', label: 'Happy Clients' },
            { number: '50+', label: 'Industry Awards' },
            { number: '10M+', label: 'People Reached' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-secondary to-secondary/90 rounded-xl border-4 border-primary shadow-lg"
            >
              <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
              <div className="text-white/90">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}