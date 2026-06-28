import { motion } from 'motion/react';
import { Button } from '@/app/components/ui/button';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import companyBg from '@/assets/bg.png';
import rightImg from '@/assets/right.png';


export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-start lg:items-center pt-36 pb-24 lg:pt-20 lg:pb-0">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={companyBg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Decorative curved lines like the logo */}
      <div className="absolute inset-0 overflow-hidden hidden lg:block z-10"> {/* Added z-10 to ensure circles are above background image */}
        <div className="absolute top-1/4 -right-32 w-96 h-96">
          <div className="w-full h-full rounded-full border-8 border-accent/20" />
        </div>
        <div className="absolute top-1/3 -right-40 w-80 h-80">
          <div className="w-full h-full rounded-full border-8 border-primary/20" />
        </div>
        <div className="absolute bottom-1/4 -left-32 w-96 h-96">
          <div className="w-full h-full rounded-full border-8 border-accent/10" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left text-white mb-16 lg:mb-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-4 px-4 py-2 bg-primary/90 rounded-full border-2 border-accent"
            >
              <span className="text-white font-semibold">
                #1 Outdoor Advertising Specialist
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8 leading-normal"
            >
              {/* First line */}
              <span className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
                Elevate Your Brand with
              </span>

              <br />

              {/* Brand Name */}
              <div className="relative inline-block mt-5 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                <span className="text-2xl min-[380px]:text-3xl sm:text-5xl lg:text-6xl algerian-font leading-none whitespace-nowrap">
                  <span className="text-[#4dd2ff]">S</span>
                  <span className="brand-red">UPER </span>
                  <span className="text-[#4dd2ff]">A</span>
                  <span className="brand-red">DS (PVT) LTD.</span>
                </span>

                <div className="w-full h-[3px] flex mt-1">
                  <div className="bg-[#4dd2ff]" style={{ width: '6%' }} />
                  <div className="bg-primary" style={{ width: '25.25%' }} />
                  <div className="bg-[#4dd2ff]" style={{ width: '7.25%' }} />
                  <div className="bg-primary" style={{ width: '61.25%' }} />
                </div>
              </div>

            </motion.h1>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              We create impactful below-the-line marketing campaigns that connect your brand directly with your audience through innovative activations, events, and promotional strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                onClick={scrollToContact}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg border-2 border-accent shadow-lg shadow-primary/50"
              >
                Start Your Campaign
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-accent text-accent hover:bg-accent hover:text-secondary px-8 py-6 text-lg"
              >
                View Our Work
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left border-l-4 border-primary pl-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span className="text-3xl font-bold text-white">500+</span>
                </div>
                <p className="text-sm text-white/70">Campaigns</p>
              </div>
              <div className="text-center lg:text-left border-l-4 border-primary pl-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-3xl font-bold text-white">200+</span>
                </div>
                <p className="text-sm text-white/70">Happy Clients</p>
              </div>
              <div className="text-center lg:text-left border-l-4 border-primary pl-4">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="text-3xl font-bold text-white">98%</span>
                </div>
                <p className="text-sm text-white/70">Success Rate</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative max-w-lg lg:max-w-xl">
              <ImageWithFallback
                src={rightImg}
                alt="Superads BTL Team"
                className="w-full h-auto"
              />
              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full blur-3xl opacity-30 -z-10" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-accent rounded-full blur-3xl opacity-20 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section >
  );
}