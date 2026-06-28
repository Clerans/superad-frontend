import { motion } from 'motion/react';
import {
  Image,
  Presentation,
  Lightbulb,
  Brush,
  Layers,
  Store,
  Grid
} from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Image,
      title: 'Nameboard',
      description: 'Custom-designed nameboards that make a lasting first impression.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Presentation,
      title: 'Hoarding',
      description: 'Large-format outdoor hoardings that capture attention from a distance.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Lightbulb,
      title: 'Lightboard',
      description: 'Illuminated displays ensuring your brand shines bright, day and night.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Brush,
      title: 'Wall Branding',
      description: 'Transforming plain walls into powerful brand statements with artistic graphics.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Layers,
      title: 'Glass Branding',
      description: 'Sleek and modern branding solutions for glass surfaces and storefronts.',
      color: 'from-teal-500 to-blue-500',
    },
    {
      icon: Store,
      title: 'Mdf Counter',
      description: 'Durable and stylish MDF counters customized for retail and reception areas.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Grid,
      title: 'Iron Racks',
      description: 'Sturdy custom iron racks for efficient product display and storage.',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-primary/90 rounded-full border-2 border-accent">
            <span className="text-white font-semibold">Our Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-secondary">
            Comprehensive{' '}
            <span className="text-primary">BTL Marketing Solutions</span>
          </h2>

          <p className="text-lg text-secondary/80">
            From concept to execution, we offer a full spectrum of below-the-line marketing services tailored to meet your brand's unique needs.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative bg-white border-4 border-primary rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-secondary group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-white/80 mb-4">
            Don't see what you're looking for?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-accent-foreground font-semibold hover:text-primary transition-colors text-lg underline"
          >
            Contact us for custom solutions →
          </button>
        </motion.div>
      </div>
    </section>
  );
}