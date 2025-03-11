import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";

const ImageClipBox = ({
  src,
  clipClass,
  id = "",
}: {
  src: string;
  clipClass: string;
  id?: string;
}) => {
  return (
    <div id={id} className={clipClass}>
      <img src={src} alt="" />
    </div>
  );
};

const Contact = () => {
  useGSAP(() => {
    gsap.from("#joinZentry", {
      x: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: "#joinZentry",
        start: "top 100%",
        end: "top 60%",
        scrub: true,
      },
    });

    gsap.from("#swordsman", {
      y: 200,
      opacity: 0,
      duration: 2,
      delay: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 100%",
        end: "top 80%",
        scrub: 2,
      },
    });

    gsap.from(".contact-clip-path-2", {
      y: 200,
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 100%",
        end: "top 80%",
        scrub: 2,
      },
    });

    gsap.from(".contact-clip-path-1", {
      y: -200,
      opacity: 0,
      duration: 2,
      delay: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#contact",
        start: "top 100%",
        end: "top 80%",
        scrub: 2,
      },
    });
  });

  return (
    <div id="contact" className="my-40 min-h-96 w-screen px-10 relative">
      <div
        id="swordsman"
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-60 md:translate-x-0 md:left-auto md:right-10 md:-top-3 lg:w-80 z-10"
      >
        <ImageClipBox
          src="img/swordman-partial.webp"
          clipClass={"absolute z-10 md:scale-120"}
        />
        <div className="filter-[url('#flt_tag')]">
          <ImageClipBox
            src="img/swordman.webp"
            clipClass={"sword-man-clip-path md:scale-120"}
          />
        <RoundedCorners />
        </div>
      </div>
      <div className="relative rounded-lg bg-black py-24 text-blue-50 overflow-hidden">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-full w-72 lg:left-20 lg:translate-x-0 lg:w-96 filter-[url('#flt_tag')]">
          <ImageClipBox
            clipClass={"contact-clip-path-1"}
            src="img/contact-1.webp"
          />
          <ImageClipBox
            clipClass={"contact-clip-path-2 absolute -bottom-14"}
            src="img/contact-2.webp"
          />
          <RoundedCorners />
        </div>

        <div className="flex flex-col items-center text-center">
          <p id="joinZentry" className="font-general text-[10px] z-10">
            Join Zentry
          </p>
          <AnimatedTitle
            title="Let's b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether"
            containerClass="mt-10 w-full text-5xl leading-[0.9] md:text-[6rem] z-10"
          />

          <Button
            id="contact-us"
            title="contact us"
            containerClass="mt-10 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
