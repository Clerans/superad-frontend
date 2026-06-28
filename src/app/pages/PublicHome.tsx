import { Header } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { About } from '@/app/components/About';
import { Team } from '@/app/components/Team';
import { Services } from '@/app/components/Services';
import { Portfolio } from '@/app/components/Portfolio';
import { Contact } from '@/app/components/Contact';
import { Footer } from '@/app/components/Footer';

export default function PublicHome() {
  return (
    <div className="min-h-screen overflow-x-hidden w-full relative">
      <Header />
      <main>
        <Hero />
        <div className="bg-gradient-to-br from-[#A8D5E2] to-[#8AC4E3]">
          <About />
          <Services />
          <Portfolio />
          <Team />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
