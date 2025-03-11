import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { MouseEvent, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "top top",
        end: "+=800 center",
        scrub: 0.9,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path, .clip-border", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      width: "100vw",
      height: "120vh",
    });

    gsap.from("#clip", {
      rotationX: 40,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#clip",
        start: "top bottom",
        end: "top 50%",
        scrub: true,
      },
    });

    gsap.from("#welcome", {
      x: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: "#about",
        start: "top 100%",
        end: "top 60%",
        scrub: true,
      },
    });

    ScrollTrigger.create({
      trigger: ".about-subtext",
      start: "top 30%",
      end: "top 30%",
      onEnter: () => {
        setTransformStyle("rotateX(0deg) rotateY(0deg)");
        setScrolled(true);
      },
      onEnterBack: () => {
        setScrolled(false);
      },
    });
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (!itemRef.current) return;

    if (scrolled) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 15;
    const tiltY = (relativeY - 0.5) * -15;

    const newTrasform = `perspective(200px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

    setTransformStyle(newTrasform);
  };

  return (
    <div
      id="about"
      ref={itemRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen w-screen mb-[20vh]"
    >
      <div className="relative mb-8 mt-36 flex flex-col gap-5 items-center">
        <h2
          id="welcome"
          className="font-general text-sm uppercase md:text-[10px]"
        >
          Welcome to Zentry
        </h2>

        <AnimatedTitle
          title={`Disc<b>o</b>ver the World's <br /> largest shared <b>a</b>dventure`}
          containerClass="mt-5 !text-black"
        />

        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry unites every player from countless games and platforms</p>
        </div>
      </div>

      <div className="h-dvh w-screen relative" id="clip">
        <img
          style={{ transform: transformStyle }}
          src="img/stones.webp"
          className="absolute left-1/2 -translate-x-1/2 z-50 top-1/4 scale-[250%] md:scale-[175%] lg:scale-125 lg:-translate-y-1/4 ease-out duration-1000"
          alt="stones"
        />
        <div className="story-img-container">
          <div
            style={{ transform: transformStyle }}
            className="mask-clip-path absolute left-1/2 top-10 z-20 h-80 md:h-96 w-64 md:w-72 lg:w-80 -translate-x-1/2 ease-out duration-300"
          >
            <div className="about-image">
              <img
                src="img/about.webp"
                alt="Background"
                className="absolute left-0 top-0 w-full h-full min-h-dvh object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 -z-10">
          <div className="story-img-container">
            <div
              style={{ transform: transformStyle  }}
              className="clip-border left-1/2 -translate-x-1/2 bg-black absolute h-[322px] w-[258px] md:h-[386px] md:w-[290px] lg:w-[322px] top-10 ease-out duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
