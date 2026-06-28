import { motion } from 'motion/react';
import { Camera, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/portfolio';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Button } from '@/app/components/ui/button';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onImageClick: (url: string) => void;
}

export default function ProjectCard({ project, onClick, onImageClick }: ProjectCardProps) {
  // Find primary image URL or fallback to first, or fallback image
  const primaryImg = project.images.find((i) => i.is_primary)?.image_url || project.images[0]?.image_url || '';

  // Truncate description text
  const getExcerpt = (text: string, maxLen = 100) => {
    if (!text) return '';
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen).trim() + '...';
  };

  // Category specific colors matching styling instructions
  const categoryColorClass = (cat: string) => {
    switch (cat) {
      case 'Nameboard':
        return 'from-blue-500 to-cyan-500';
      case 'Hoarding':
        return 'from-orange-500 to-red-500';
      case 'Lightboard':
        return 'from-yellow-500 to-orange-500';
      case 'Wall Branding':
        return 'from-purple-500 to-pink-500';
      case 'Glass Branding':
        return 'from-teal-500 to-blue-500';
      case 'MDF Counter':
        return 'from-green-500 to-emerald-500';
      case 'Iron Racks':
        return 'from-indigo-500 to-purple-500';
      default:
        return 'from-secondary to-secondary/80';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border-4 border-accent hover:shadow-2xl hover:border-primary transition-all duration-300 flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-gray-50 flex-shrink-0">
        <ImageWithFallback
          src={primaryImg}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Button
            onClick={onClick}
            className="bg-primary hover:bg-white hover:text-secondary text-white font-bold px-5 py-2.5 rounded-xl border-2 border-primary hover:border-white transition-all duration-200 cursor-pointer shadow-lg flex items-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Camera icon with image count overlay */}
        {project.images.length > 1 && (
          <div className="absolute top-4 right-4 bg-secondary/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md border border-white/20 select-none">
            <Camera className="w-3.5 h-3.5 text-accent" />
            <span>{project.images.length}</span>
          </div>
        )}
      </div>

      {/* Card Body Content */}
      <div className="p-6 bg-gradient-to-br from-white to-accent/5 text-center flex-grow flex flex-col justify-between items-center">
        <div className="flex flex-col items-center">
          {/* Category Badge */}
          <div className={`inline-block px-4 py-1.5 bg-gradient-to-r ${categoryColorClass(project.category)} text-white rounded-full mb-4 border-2 border-white shadow-sm font-bold text-xs uppercase tracking-wider`}>
            {project.category}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-secondary group-hover:text-primary transition-colors line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Description Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {getExcerpt(project.description)}
        </p>
      </div>
    </motion.div>
  );
}
