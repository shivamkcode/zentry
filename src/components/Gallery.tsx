import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";

const Gallery = () => {
  const windowWidth = window.innerWidth;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#gallery",
        start: "top top",
        end: "+=10000 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.to("#gallery-1", {
      width: "100%",
      height: "100%",
      borderRadius: 0,
      duration: 5,
    });

    tl.from(
      ".gallery-1-text",
      {
        y: 500,
        duration: 2,
        ease: "power1.in",
        stagger: 0.05,
      },
      "-=2"
    );

    tl.to(".gallery-1-text", {
      x: 150,
      y: 30,
      delay: 1,
      rotateX: -50,
      rotateY: 30,
      opacity: 0,
      stagger: 0.08,
      ease: "power1.Out",
    });

    tl.to(
      "#gallery-2",
      {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        duration: 5,
      },
      "-=0.5"
    );

    tl.from(
      ".gallery-2-text",
      {
        x: -150,
        y: 50,
        rotateX: 60,
        rotateY: 90,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power1.inOut",
      },
      "-=2"
    );

    tl.to(".gallery-2-text", {
      x: 150,
      y: 30,
      delay: 1,
      rotateX: -50,
      rotateY: 30,
      opacity: 0,
      stagger: 0.08,
      ease: "power1.Out",
    });

    tl.to("#gallery-3", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      width: "100%",
      height: "100%",
      borderRadius: 0,
      duration: 5,
    });

    tl.from(
      ".gallery-3-text-1",
      {
        x: -150,
        y: 50,
        rotateX: 60,
        rotateY: 90,
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        ease: "power1.inOut",
      },
      "-=2"
    );

    tl.to(".gallery-3-text-1", {
      x: 150,
      y: 30,
      delay: 1,
      rotateX: -50,
      rotateY: 30,
      opacity: 0,
      stagger: -0.3,
      ease: "power1.Out",
    });

    tl.to("#gallery-3-img", {
      transformOrigin: "center right",
      width: windowWidth > 800 ? "177vw" : "177vh",
      height: windowWidth > 800 ? "100vw" : "100vh",
      duration: 10,
    });

    tl.from(
      ".gallery-3-text-2",
      {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      },
      "-=3"
    );

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
    <div
      id="gallery"
      className="h-screen w-screen overflow-hidden relative bg-black"
    >
      <img
        src="/img/gallery-1.webp"
        className="absolute-center object-cover min-h-dvh min-w-dvw"
        loading="lazy"
      />
      <div className="flex flex-col text-center gap-4 mt-10">
        <h4
          id="uni"
          className="font-general text-sm uppercase md:text-[10px] text-white"
        >
          Our universe in a nutshell
        </h4>
        <AnimatedTitle title="<b>Gallery</b>" containerClass="" />
      </div>
      <div
        id="gallery-1"
        className="absolute-center size-28 overflow-hidden border rounded-lg"
      >
        <img
          src="/img/gallery-3.webp"
          className="absolute-center object-cover min-h-dvh min-w-dvw"
          loading="lazy"
        />
        <div className="absolute-center w-screen md:w-[60vw] text-center">
          <AnimatedTitle
            title="At the h<b>e</b>art of zentry, the secret to shape the fabric of all realms is u<b>n</b>veiled"
            containerClass="text-4xl tracking-wider text-black gallery-1-text"
          />
          <h4 className="font-general text-sm uppercase md:text-[14px] mt-4 gallery-1-text">
            A place for those who dare
          </h4>
        </div>
      </div>
      <div
        id="gallery-2"
        style={{ borderRadius: "1000px" }}
        className="absolute-center size-0 overflow-hidden"
      >
        <img
          src="/img/gallery-2.webp"
          className="absolute-center object-cover min-h-dvh min-w-dvw"
          loading="lazy"
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-screen md:w-[60vw] text-center flex flex-col gap-4 items-center">
          <AnimatedTitle
            title="T<b>h</b>e <br /> univ<b>e</b>rse <br /> pill<b>a</b>r"
            containerClass="text-7xl text-black text-white gallery-2-text"
          />
          <h4 className="text-sm md:text-[16px] w-[80%] text-white gallery-2-text">
            The Pillar transcends mere structure; it is a universe unto itself,
            harboring its own unique ecology and ecosystem. This universe,
            distinct and mysterious, is called Zentry.
          </h4>
        </div>
      </div>
      <div
        id="gallery-3"
        style={{ clipPath: "polygon(50% 0%, 50% 0%, 100% 100%, 0% 100%)" }}
        className="absolute-center overflow-hidden size-0 rounded-lg"
      >
        <div className="absolute-center">
          <div
            id="gallery-3-img"
            className="relative w-[350vh] h-[200vh] md:w-[350vw] md:h-[200vw]"
          >
            <img
              src="/img/gallery-4.webp"
              className="absolute-center w-full h-full "
              loading="lazy"
            />
            <div className="absolute-center h-screen flex flex-col justify-between py-10 font-bold text-center ">
              <h4 className="font-general text-sm uppercase md:text-[10px] gallery-3-text-2 text-white">
                Hidden depths of the pillar
              </h4>
              <h4 className="font-general text-sm uppercase md:text-[10px] gallery-3-text-2 text-black">
                Flowing to the source
              </h4>
              <h4 className="font-general text-sm uppercase md:text-[10px] gallery-3-text-2 text-white">
                The center of it all
              </h4>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 p-10 flex flex-col gap-4 md:w-[30vw]">
          <h1 className="special-font text-5xl text-white gallery-3-text-1">
            A new <b>D</b>iscovery
          </h1>
          <h4 className="font-general text-xs md:text-sm uppercase tracking-tighter gallery-3-text-1">
            At the edge where all realms meet, stands an eternal pillar. It is
            the axis of realms, weaving the old and the new together, guiding
            them into the flow of balance and harmony.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
