import { Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '@/assets/70be82926b0ed207a1ebf683c489d9076556dc83.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      'Event Management',
      'Brand Activation',
      'Promotional Marketing',
      'Retail Marketing',
    ],
    company: [
      'About Us',
      'Our Team',
      'Careers',
      'Contact',
    ],
    resources: [
      'Blog',
      'Case Studies',
      'Portfolio',
      'FAQ',
    ],
  };

  return (
    <footer className="bg-secondary text-white border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="Superads Logo" className="h-12 w-auto" />
              <div style={{ fontFamily: "'Algerian', serif" }}>
                <div className="relative inline-block">
                  {/* Company Name with individual letter colors and continuous underline */}
                  <div className="text-lg lg:text-xl font-bold tracking-wide leading-none pb-1">
                    <span style={{ color: '#4dd2ff' }}>S</span>
                    <span className="text-primary">UPER </span>
                    <span style={{ color: '#4dd2ff' }}>A</span>
                    <span className="text-primary">DS (PVT) LTD.</span>
                  </div>
                  {/* Continuous underline with color segments */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 flex">
                    <span style={{ backgroundColor: '#4dd2ff', width: '6.25%' }}></span>
                    <span className="bg-primary" style={{ width: '25.25%' }}></span>
                    <span style={{ backgroundColor: '#4dd2ff', width: '7.25%' }}></span>
                    <span className="bg-primary" style={{ width: '61.25%' }}></span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-white/80 mb-6 max-w-sm border-l-4 border-primary pl-4">
              Your trusted partner in outdoor advertising and below-the-line marketing. Creating memorable brand experiences that drive results.
            </p>
            <div className="space-y-3">
              <a href="tel:0112996984 / 0778040377" className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span>0112996984 / 0778040377</span>
              </a>
              <a href="superads1info@gmail.com" className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>superads1info@gmail.com</span>
              </a>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span>No.253/A siyambalape south Siyambalape.(Mawaramandiya)</span>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-bold mb-4 text-accent border-l-4 border-primary pl-3">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <button className="text-white/80 hover:text-accent transition-colors hover:translate-x-1 inline-block">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-bold mb-4 text-accent border-l-4 border-primary pl-3">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button className="text-white/80 hover:text-accent transition-colors hover:translate-x-1 inline-block">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold mb-4 text-accent border-l-4 border-primary pl-3">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <button className="text-white/80 hover:text-accent transition-colors hover:translate-x-1 inline-block">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-primary pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Super Ads (Pvt) Ltd. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <button className="hover:text-accent transition-colors">Privacy Policy</button>
              <button className="hover:text-accent transition-colors">Terms of Service</button>
              <button className="hover:text-accent transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}