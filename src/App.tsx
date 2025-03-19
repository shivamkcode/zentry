import React, { useState, Suspense } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import "./index.css";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const About = React.lazy(() => import("./components/About"));
const Features = React.lazy(() => import("./components/Features"));
const Story = React.lazy(() => import("./components/Story"));
const Gallery = React.lazy(() => import("./components/Gallery"));
const Universe = React.lazy(() => import("./components/Universe"));

const App = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  return (
    <main className="relative w-full overflow-x-hidden">
      <NavBar
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
      />
      <Hero
        isAudioPlaying={isAudioPlaying}
        setIsAudioPlaying={setIsAudioPlaying}
      />
      
      <Suspense fallback={<div>Loading...</div>}>
        <About />
        <Features />
        <Story />
        <Gallery />
        <Universe />
        <Contact />
        <Footer />
      </Suspense>
    </main>
  );
};

export default App;
