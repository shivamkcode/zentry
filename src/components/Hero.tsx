import { MouseEvent, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { isPlayingProps } from "./NavBar";
import RoundedCorners from "./RoundedCorners";

gsap.registerPlugin(ScrollTrigger);

const headings = [
  "",
  "G<b>a</b>ming",
  "Ide<b>n</b>tity",
  "Re<b>a</b>lity",
  "Ag<b>e</b>ntic Ai",
];

const splitAndPreserveTags = (str: string) => {
  const parts = str.split(/(<b>.*?<\/b>)/g); // Split by <b> tags
  return parts.map((part, index) => {
    if (part.startsWith("<b>") && part.endsWith("</b>")) {
      return (
        <b key={index} className="hero-text">
          {part.slice(3, -4)}
        </b>
      );
    }
    return part.split("").map((char, charIndex) => (
      <span className="hero-text" key={`${index}-${charIndex}`}>
        {char}
      </span>
    ));
  });
};

const Hero = ({ isAudioPlaying, setIsAudioPlaying }: isPlayingProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [transformStyle, setTransformStyle] = useState("");
  const [lastVid, setLastVid] = useState(currentIndex);

  const totalVideos = 4;
  const itemRef = useRef<HTMLDivElement>(null);
  const nextVdRef = useRef<HTMLVideoElement>(null);
  const whooshSoundRef = useRef<HTMLAudioElement>(null);
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const currentVideoRef = useRef<HTMLVideoElement>(null);


  const handleVideoLoad = () => {
    setLoadedVideos((prevVideos) => prevVideos + 1);
  };

  const playWhooshSound = () => {
    if (whooshSoundRef.current) {
      whooshSoundRef.current.currentTime = 0;
      const playPromise = whooshSoundRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setTimeout(() => {
              whooshSoundRef.current?.pause();
              if (whooshSoundRef.current) {
                whooshSoundRef.current.currentTime = 0;
              }
            }, 1000);
          })
          .catch((error) => {
            console.log("Whoosh sound failed to play:", error);
          });
      }
    }
  };

  const handleMiniVDClick = () => {
    if (!nextVdRef.current || !currentVideoRef.current) return;

    playWhooshSound();
    nextVdRef.current.currentTime = 0;
    nextVdRef.current.play().catch(() => {});
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
    setTimeout(() => {
      if (!isAudioPlaying) {
        setIsAudioPlaying(true);
      }
    }, 1000);
    setTransformStyle("");
  };

  useEffect(() => {
    setTimeout(() => {
      setLastVid(currentIndex);
    }, 600);
  }, [currentIndex]);

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }

  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVdRef.current) {
              nextVdRef.current.play();
            }
          },
        });

        gsap.from("#current-video, #hero-border", {
          transformOrigin: "center center",
          scale: 0,
          duration: 2,
          ease: "power1.inOut",
        });

        gsap.from(".hero-text", {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    gsap.to(".mask-clip-path", {
      scale: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

    gsap.from(".hero-text", {
      y: 50,
      opacity: 0,
      duration: 2,
      stagger: 0.1,
    });
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 20;
    const tiltY = (relativeY - 0.5) * -20;

    const newTrasform = `perspective(300px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

    setTransformStyle(newTrasform);
  };

  const handleMouseEnter = () => {
    gsap.to(".mask-clip-path", {
      scale: 1,
      ease: "power1.inOut",
      duration: 2,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".mask-clip-path", {
      scale: 0,
      ease: "power3.inOut",
      duration: 2.5,
    });
  };

  const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

  return (
    <>
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-400">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <audio
        ref={whooshSoundRef}
        src="/audio/whoosh.mp3"
        preload="auto"
        className="hidden"
      />
      <div className="relative h-dvh w-screen overflow-x-hidden">
        <div
          id="video-frame"
          className="relative z-10 h-dvh w-screen overflow-hidden"
        >
          <div>
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={itemRef}
              className="absolute-center z-[100] w-[60vw] h-[60vh] origin-center overflow-hidden  cursor-pointer"
            >
              <div className="relative transition-all duration-500 ease-in hover:animation-scale cursor-pointer size-full">
                <div
                  onClick={handleMiniVDClick}
                  style={{ transform: transformStyle }}
                  className="absolute-center z-40 size-28 md:size-60 filter-[url(#flt_tag)]"
                >
                  <div className="size-28 mask-clip-path sm:scale-0 md:size-60">
                    <div className="relative w-full h-full">
                      <video
                        ref={nextVdRef}
                        src={getVideoSrc(upcomingVideoIndex)}
                        loop
                        muted
                        autoPlay
                        id="current-video"
                        className="absolute-center w-full min-w-dvw h-full min-h-dvh object-cover"
                        onLoadedData={handleVideoLoad}
                      />
                    </div>
                  </div>
                  <RoundedCorners />
                </div>
                <div
                  style={{ transform: transformStyle }}
                  className="absolute-center z-30 filter-[url(#flt_tag)]"
                >
                  <div
                    id="hero-border"
                    className="mask-clip-path sm:scale-0 origin-center size-[115px] md:size-[243px]"
                  >
                    <div className=" bg-black object-cover size-full" />
                  </div>
                  <RoundedCorners />
                </div>
              </div>
            </div>

            <video
              ref={currentVideoRef}
              src={getVideoSrc(currentIndex)}
              autoPlay
              // poster="/img/entrance.webp"
              loop
              muted
              id="next-video"
              className="absolute-center invisible z-20 size-28 md:size-60 object-cover object-center rounded-lg"
              onLoadedData={handleVideoLoad}
            />

            <div className="hero-heading special-font absolute bottom-5 right-5 z-50 text-blue-75">
              {splitAndPreserveTags(headings[currentIndex])}
            </div>

            <video
              src={getVideoSrc(lastVid)}
              autoPlay
              loop
              muted
              id="main-video"
              className="absolute left-0 top-0 size-full object-cover object-center"
              onLoadedData={handleVideoLoad}
            />
          </div>

          <div className="absolute left-0 top-0 z-50">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="hero-heading text-blue-100 special-font">
                redefi<b>n</b>e
              </h1>

              <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                Enter the Metagame Layer <br /> Unleash the Play Economy
              </p>

              <Button
                id="watch-trailer"
                title="Watch Trailer"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-100 flex-center gap-1"
              />
            </div>
          </div>
        </div>

        <h1
          className="hero-heading special-font absolute bottom-5 right-5 text-black"
          dangerouslySetInnerHTML={{ __html: headings[currentIndex] }}
        />
      </div>
    </>
  );
};

export default Hero;
