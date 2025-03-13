import { useState } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Story from './components/Story';
import './index.css';
import Gallery from './components/Gallery';

const App = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <main className="relative w-full overflow-x-hidden">
      <NavBar isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />
      <Hero isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />
      <About />
      <Features />
      <Story />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
