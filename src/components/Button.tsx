import gsap from "gsap";
import { ReactNode } from "react";
import RoundedCorners from "./RoundedCorners";

interface Props {
  title: string;
  id: string;
  containerClass: string;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
}

const Button = ({ title, id, rightIcon, leftIcon, containerClass }: Props) => {
  const handleMouseEnter = () => {
    gsap.to(`#${id}`, {
      clipPath: "polygon(5% 5%, 95% 10%, 97% 100%, 6% 100%)",
      padding: "12px auto",
      duration: 0.2,
      borderRadius: 0,
      ease: "bounce-in",
    });

    gsap.set(`#${id} span`, {
      y: 0,
      opacity: 1,
    });

    gsap.from(`#${id} span`, {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(`#${id}`, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      padding: "8px 20px",
      borderRadius: "50px",
      duration: 0.3,
      ease: "power4.in",
    });

    gsap.set(`#${id} span`, {
      y: 0,
      opacity: 1,
    });

    gsap.from(`#${id} span`, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  return (
    <div className="filter-[url(#flt_tag)] h-10">
      <button
        id={id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        className={`relative z-10 cursor-pointer opacity-100 rounded-full font-medium bg-violet-50 px-5 py-2 text-black ${containerClass}`}
      >
        <span>{leftIcon}</span>
        <span className="font-general text-sm uppercase">{title}</span>
        <span>{rightIcon}</span>
      </button>
      <RoundedCorners />
    </div>
  );
};

export default Button;
