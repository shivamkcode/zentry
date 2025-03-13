import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";

const Gallery = () => {
    const windowWidth = window.innerWidth

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#gallery",
        start: "top top",
        end: "+=10000 center",
        scrub: 2,
        pin: true,
      },
    });

    tl.to("#gallery-1", {
      width: "100%",
      height: "100%",
      border: 'none',
      borderRadius: 0,
      delay: 1,
      ease: "power1.inOut",
      duration: 5,
    });

    tl.to("#gallery-2", {
      width: "100%",
      height: "100%",
      borderRadius: 0,
      delay: 1,
      ease: "power1.inOut",
      duration: 5,
    });

    tl.to("#gallery-3", {
      width: "100%",
      height: "100%",
      borderRadius: 0,
        delay: 1,
      ease: "power1.inOut",
      duration: 10,
    });

    tl.to("#gallery-3-img", {
      transformOrigin: "center right",
      width: windowWidth > 800 ? "177vw" : '177vh',
      height: windowWidth > 800 ? "100vw" : '100vh',
      delay: 1,
      ease: "power1.inOut",
      duration: 15,
    });

    gsap.from("#uni", {
      x: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: "#gallery",
        start: "top 100%",
        end: "top 60%",
        scrub: true,
      },
    });
  });

  return (
    <div id="gallery" className="h-dvh w-dvw overflow-hidden relative bg-black">
      <img
        src="/img/gallery-1.webp"
        className="absolute-center object-cover min-h-dvh min-w-dvw"
      />
      <div className="flex flex-col text-center gap-4 mt-10">
        <h1
          id="uni"
          className="font-general text-sm uppercase md:text-[10px] text-white"
        >
          Our universe in a nutshell
        </h1>
        <AnimatedTitle title="<b>Gallery</b>" containerClass="" />
      </div>
      <div
        id="gallery-1"
        className="absolute-center size-28 overflow-hidden border rounded-lg"
      >
        <img
          src="/img/gallery-2.webp"
          className="absolute-center object-cover min-h-dvh min-w-dvw"
        />
      </div>
      <div
        id="gallery-2"
        className="absolute-center size-0 overflow-hidden rounded-lg"
      >
        <img
          src="/img/gallery-3.webp"
          className="absolute-center object-cover min-h-dvh min-w-dvw"
        />
      </div>
      <div id="gallery-3" className="absolute-center overflow-hidden size-0 rounded-lg">
        <div className="absolute-center">
          <div id="gallery-3-img" className="relative w-[350vh] h-[200vh] md:w-[350vw] md:[200vh]">
            <img
              
              src="/img/gallery-4.webp"
              className="absolute-center w-full h-full "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
