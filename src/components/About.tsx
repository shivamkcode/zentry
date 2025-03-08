import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "top top",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      top: -10,
      // paddingTop: 100,
      // bottom: 100,
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen  -mb-2.5">
      <div className="relative mb-8 mt-36 flex flex-col gap-5 items-center">
        <h2 className="font-general text-sm uppercase md:text-[10px]">
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

      <div className="h-dvh w-screen" id="clip">
        <img
          src="img/stones.webp"
          className="absolute left-1/2 -translate-x-1/2 z-50 top-1/4 md:-translate-y-1/4 scale-[250%] md:scale-120"
          alt="stones"
        />
        <div className="mask-clip-path border absolute left-1/2 top-10 z-20 h-[50vh] md:h-[60vh] w-64 md:w-[25vw] origin-center -translate-x-1/2 overflow-hidden rounded-3xl">
          <div className="about-image">
            <img
              src="img/about.webp"
              alt="Background"
              className="absolute left-0 top-0 w-full h-full min-h-dvh object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
