import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MouseEvent, ReactNode, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

interface BentoCardProps {
  src: string;
  title: ReactNode;
  description?: string;
}

export interface BentoTiltProps {
  children: ReactNode;
  className: string;
}

export const BentoTilt = ({ children, className = "" }: BentoTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeX - 0.5) * 5;
    const tiltY = (relativeY - 0.5) * -5;

    const newTrasform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98) `;

    setTransformStyle(newTrasform);
  };
  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  useGSAP(() => {
    if (itemRef.current) {
      gsap.from(itemRef.current, {
        rotationX: 50,
        ease: "power1.in",
        delay: 1,
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 100%",
          end: "top 70%",
          scrub: 0.8,
        },
      });
    }
  });

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className={`${className} bento`}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description }: BentoCardProps) => {
  return (
    <div className="relative size-full cursor-grab">
      <video
        src={src}
        playsInline
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base font-robert-regular">
              {description}
            </p>
          )}
        </div>
        <button className="bg-black flex flex-row items-center justify-center rounded-full h-10 w-48 gap-3 cursor-grab border border-violet-50/30">
          <TiLocationArrow className="size-6 opacity-50" />
          <p className="opacity-50 font-general font-bold uppercase">
            Coming soon
          </p>
        </button>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-md text-blue-50 capitalize">
            Into the metagame layer
          </p>
          <p className="max-w-md font-circular-web text-sm leading-4 text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products coverage into an inner-connected overlay
            experience on your world.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-[85vw] w-full overflow-hidden rounded-md md:h-[40vw]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                radia<b>n</b>t
              </>
            }
            description="The game of games transforming your in-game actions across Web2 & Web3 titles into a rewarding adventure."
          />
        </BentoTilt>

        <div className="flex flex-col md:grid h-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 w-[70vw] h-[80vh] md:h-full md:w-full">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  zig<b>m</b>a
                </>
              }
              description="The NFT collection merging Zentry’s IP, AI, and gaming—pushing the boundaries of NFT innovation."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0 h-[50vh] md:h-full">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  n<b>e</b>xus
                </>
              }
              description="The player portal uniting humans & AI to play, compete, earn and showcase—gamifying social & Web3 experiences."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0 h-[40vh] md:h-full">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  az<b>u</b>l
                </>
              }
              description="The agent of agents elevating agentic AI experience to be more fun and productive."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 h-[40vw] w-[60vw] self-end md:h-full md:w-full">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5 cursor-grab">
              <h1 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
              </h1>
              <TiLocationArrow className="scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2 cursor-grab w-[65vw] md:w-full">
            <video
              src="videos/feature-5.mp4"
              playsInline
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
