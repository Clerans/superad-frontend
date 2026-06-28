import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import logoImage from '@/assets/70be82926b0ed207a1ebf683c489d9076556dc83.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b-4 border-primary shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Superads Logo" className="h-12 lg:h-14 w-auto" />
              <div className="hidden sm:block" style={{ fontFamily: "'Algerian', serif" }}>
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
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-secondary hover:text-primary transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-primary hover:bg-secondary text-white border-2 border-primary hover:border-secondary transition-all"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-secondary" />
            ) : (
              <Menu className="w-6 h-6 text-secondary" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t-2 border-primary">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-secondary hover:text-primary transition-colors text-left py-2 font-medium"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-secondary hover:text-primary transition-colors text-left py-2 font-medium"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-secondary hover:text-primary transition-colors text-left py-2 font-medium"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-secondary hover:text-primary transition-colors text-left py-2 font-medium"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-secondary hover:text-primary transition-colors text-left py-2 font-medium"
              >
                Contact
              </button>
              <Button
                onClick={() => scrollToSection('contact')}
                className="bg-primary hover:bg-secondary text-white mt-2"
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}