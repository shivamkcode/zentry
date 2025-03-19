import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Universe = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const windowWidth = window.innerWidth;

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#text-container",
        start: "top top",
        end: "+=2000 center",
        pin: true,
        scrub: 0.1,
      },
    });
    tl.from(".universe-1-text", {
      x: -150,
      y: 30,
      rotateX: 60,
      rotateY: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power1.inOut",
    });

    tl.to(".universe-1-text", {
      x: 150,
      y: 30,
      rotateX: -60,
      rotateY: 60,
      delay: 5,
      duration: 1.5,
      opacity: 0,
      stagger: 0.08,
      ease: "power1.Out",
    });

    tl.to(".universe-2-text", {
      opacity: 1,
    },"-=.5")
  });

  useGSAP(() => {
    const videoElement = videoRef.current;

    if (!videoElement) return;

    const playhead = { time: 0 };

    const updateVideo = () => {
      if (videoElement) {
        videoElement.currentTime = playhead.time;
      }
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: "#video-container",
      start: "top top",
      end: "+=5000 center",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        if (videoElement) {
          playhead.time = self.progress * videoElement.duration;
          updateVideo();
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [videoRef]);

  return (
    <div className="">
      <h4 className="font-general text-xs uppercase md:text-base text-center my-20">
        The power to create
      </h4>
      <div id="video-container" className="w-screen h-screen bg-white relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={`/videos/${
            windowWidth > 800 ? "wall-video" : "wall-video-mobile"
          }.mp4#t=0.001`}
          playsInline
          poster="/img/Zentinel_wall.webp"
          muted
        ></video>
        <div
          id="text-container"
          className="absolute top-0 left-0 w-screen h-screen"
        >
          <div className="absolute-center flex flex-col gap-6 text-white">
            <h4 className="font-general text-sm uppercase md:text-base text-center universe-1-text">
              Zentry Universe
            </h4>
            <h1 className="special-font text-center text-7xl md:text-9xl w-screen universe-1-text">
              The endl<b>e</b>ss <br /> creation <br /> A<b>w</b>aits
            </h1>
          </div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-[80vw] md:w-[50vw]  text-center text-white universe-2-text opacity-0">
          <h4>
            Watchers weave together the threads of myriad possibilities,
            enabling the denizens of all realms to take part in crafting new
            tales and destinies
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Universe;
