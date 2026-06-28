import { motion } from 'motion/react';
import { Award, Users, Lightbulb, Target } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function About() {
  const features = [
    {
      icon: Award,
      title: 'Award-Winning',
      description: 'Recognized excellence in BTL marketing and brand activations',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Seasoned professionals with years of industry experience',
    },
    {
      icon: Lightbulb,
      title: 'Creative Solutions',
      description: 'Innovative campaigns that make your brand stand out',
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Focused on delivering measurable ROI for every campaign',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-accent">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHRlYW18ZW58MXx8fHwxNzY5NTc4MTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our Team"
                className="w-full h-auto"
              />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 bg-secondary p-6 rounded-xl shadow-lg hidden sm:block border-4 border-primary"
            >
              <div className="text-4xl font-bold text-accent mb-1">15+</div>
              <div className="text-sm text-white">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full border-2 border-primary">
              <span className="text-primary font-semibold">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-secondary">
              Your Trusted Partner in{' '}
              <span className="text-primary">Outdoor Advertising</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              Super Ads (Pvt) Ltd. is a premier outdoor advertising and below-the-line marketing agency specializing in creating memorable brand experiences. We bridge the gap between brands and consumers through innovative activations, events, and promotional campaigns.
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              Our team of creative professionals brings together expertise in event management, brand activation, promotional marketing, and experiential campaigns to deliver results that exceed expectations.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-4 border-l-4 border-primary pl-4 hover:border-accent transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-secondary">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}