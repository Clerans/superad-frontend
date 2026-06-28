import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, ZoomIn } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Project, ProjectImage } from '@/types/portfolio';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  onImageClick: (url: string) => void;
}

export default function ProjectModal({ project, open, onClose, onImageClick }: ProjectModalProps) {
  const [activeImage, setActiveImage] = useState<ProjectImage | null>(null);

  // Set default primary image when modal opens or project changes
  useEffect(() => {
    if (project) {
      const primary = project.images.find((img) => img.is_primary) || project.images[0] || null;
      setActiveImage(primary);
    } else {
      setActiveImage(null);
    }
  }, [project, open]);

  if (!project) return null;

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return `Added: ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } catch {
      return 'Added: Recently';
    }
  };

  // Category color matching standard brand styling
  const categoryColorClass = (cat: string) => {
    switch (cat) {
      case 'Nameboard':
        return 'from-blue-500 to-cyan-500 text-white';
      case 'Hoarding':
        return 'from-orange-500 to-red-500 text-white';
      case 'Lightboard':
        return 'from-yellow-500 to-orange-500 text-white';
      case 'Wall Branding':
        return 'from-purple-500 to-pink-500 text-white';
      case 'Glass Branding':
        return 'from-teal-500 to-blue-500 text-white';
      case 'MDF Counter':
        return 'from-green-500 to-emerald-500 text-white';
      case 'Iron Racks':
        return 'from-indigo-500 to-purple-500 text-white';
      default:
        return 'from-secondary to-secondary/80 text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl rounded-2xl border-4 border-primary bg-white p-6 shadow-2xl overflow-hidden [&>button]:hidden">
        {/* Header Section */}
        <DialogHeader className="flex flex-row items-start justify-between gap-4 border-b-2 border-accent pb-4">
          <div className="flex flex-col gap-2 text-left">
            <div className={`inline-block w-fit px-3 py-1 bg-gradient-to-r ${categoryColorClass(project.category)} rounded-full border border-white text-xs font-bold uppercase tracking-wider shadow-sm`}>
              {project.category}
            </div>
            <DialogTitle className="text-2xl font-bold text-secondary">
              {project.title}
            </DialogTitle>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-primary transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        {/* Modal Main Body */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6 mt-4 max-h-[70vh] overflow-y-auto pr-1"
        >
          {/* Main Large Image Preview */}
          {activeImage && (
            <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden border-2 border-accent/40 group shadow-md bg-gray-50">
              <ImageWithFallback
                src={activeImage.image_url}
                alt={project.title}
                className="w-full h-full object-contain"
              />
              {/* Zoom overlay on image hover */}
              <div
                onClick={() => onImageClick(activeImage.image_url)}
                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in"
              >
                <div className="bg-white/90 p-3 rounded-full text-secondary hover:text-primary transition-colors flex items-center gap-2 font-semibold text-sm shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                  Expand Image
                </div>
              </div>
            </div>
          )}

          {/* Horizontal scrollable thumbnails gallery */}
          {project.images.length > 1 && (
            <div>
              <h4 className="text-sm font-bold text-secondary mb-2">Image Gallery</h4>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {project.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(img)}
                    className={`relative flex-shrink-0 h-24 w-32 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-gray-50 ${
                      activeImage?.id === img.id
                        ? 'border-primary shadow-md scale-95'
                        : 'border-accent/40 hover:border-primary'
                    }`}
                  >
                    <ImageWithFallback
                      src={img.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {img.is_primary && (
                      <span className="absolute top-1 left-1 bg-primary text-[9px] text-white font-bold px-1.5 py-0.5 rounded shadow-sm">
                        Primary
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-secondary border-b border-gray-100 pb-1">About the Project</h4>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
              {project.description || 'No project description provided.'}
            </p>
          </div>

          {/* Metadata Section */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg border border-accent/20">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{formatDate(project.created_at)}</span>
          </div>
        </motion.div>

        {/* Footer closing button */}
        <div className="flex justify-end gap-2 border-t-2 border-accent pt-4 mt-2">
          <Button
            onClick={onClose}
            className="bg-primary hover:bg-secondary text-white border-2 border-primary hover:border-secondary transition-all cursor-pointer font-bold px-6"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
