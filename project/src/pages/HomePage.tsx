import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { Projects } from '../components/Projects';
import { Certifications } from '../components/Certifications';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <Skills />
      <Projects />
      <Certifications />
      <Footer />
    </div>
  );
};