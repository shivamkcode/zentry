import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";

const Gallery = () => {
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#gallery",
        start: "top top",
        end: "+=1200 center",
        scrub: 2,
        pin: true,
      },
    });

    tl.to("#gallery-1", {
      width: "100%",
      height: "100%",
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
        <h1 id="uni" className="font-general text-sm uppercase md:text-[10px] text-white">
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
      <div
        id="gallery-3"
        className="absolute-center size-0 overflow-hidden rounded-lg"
      >
        <img
          src="/img/gallery-4.webp"
          className="absolute-center object-cover min-h-[300dvh] min-w-[300dvw]"
        />
      </div>
    </div>
  );
};

export default Gallery;
