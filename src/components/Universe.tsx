import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Universe = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

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
        trigger: '#video-container',
        start: 'top top',
        end: '+=3000 center',
        pin:true,
        scrub: true,
        markers: true,
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
    <div id="video-container" className="w-screen h-dvh bg-white relative">
      <video
        ref={videoRef}
        className="video-scrub w-full h-full object-cover"
        src="/videos/wall-video2.mp4"
        plays-inline="true"
        webkit-playsinline="true"
        preload="metadata"
        muted
      ></video>
    </div>
  );
};

export default Universe;
