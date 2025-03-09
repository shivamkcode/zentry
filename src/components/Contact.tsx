import { useGSAP } from "@gsap/react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import gsap from "gsap";

const ImageClipBox = ({
  src,
  clipClass,
}: {
  src: string;
  clipClass: string;
}) => {
  return (
    <div className={clipClass}>
      <img src={src} alt="" />
    </div>
  );
};

const Contact = () => {
  useGSAP(() =>{
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

    // gsap.from('#swordsman', {
    //   y: -200,
    //   opacity: 0,
    //   scrollTrigger:{
    //     trigger: "#swordsman",
    //     start: "top 100%",
    //     end: "top 60%",
    //     scrub: true,
    //     markers: true
    //   }
    // })
  })

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            clipClass={"contact-clip-path-1"}
            src="img/contact-1.webp"
          />
          <ImageClipBox
            clipClass={"contact-clip-path-2 lg:translate-y-40 translate-y-60"}
            src="img/contact-2.webp"
          />
        </div>

        <div id="swordsman" className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="img/swordman-partial.webp"
            clipClass={"absolute md:scale-125"}
          />
          <ImageClipBox
            src="img/swordman.webp"
            clipClass={"sword-man-clip-path md:scale-125"}
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p id="joinZentry" className="font-general text-[10px]">Join Zentry</p>
          <AnimatedTitle
            title="Let's b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether"
            containerClass="mt-10 w-full text-5xl leading-[0.9] md:text-[6rem]"
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
