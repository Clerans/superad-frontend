import { motion } from 'motion/react';
import { SERVICE_CATEGORIES, ServiceCategory } from '@/types/portfolio';

interface CategoryFilterProps {
  selected: ServiceCategory | null;
  onChange: (category: ServiceCategory | null) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 25 } },
};

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="overflow-x-auto pb-2 flex gap-3 mb-10 no-scrollbar select-none justify-start md:justify-center"
    >
      {/* "All" button */}
      <motion.button
        variants={itemVariants}
        onClick={() => onChange(null)}
        className={`border-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
          selected === null
            ? 'bg-primary text-white border-primary shadow-md transform scale-105'
            : 'bg-white text-secondary border-secondary hover:border-primary hover:text-primary'
        }`}
      >
        All Projects
      </motion.button>

      {/* Categories */}
      {SERVICE_CATEGORIES.map((cat) => (
        <motion.button
          key={cat}
          variants={itemVariants}
          onClick={() => onChange(cat)}
          className={`border-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
            selected === cat
              ? 'bg-primary text-white border-primary shadow-md transform scale-105'
              : 'bg-white text-secondary border-secondary hover:border-primary hover:text-primary'
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </motion.div>
  );
}
