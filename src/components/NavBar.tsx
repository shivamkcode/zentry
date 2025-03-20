import { SetStateAction, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { RiMenuAddLine } from "react-icons/ri";
import { CgClose } from "react-icons/cg";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];
const navItems2 = [
  "<b>N</b>exus",
  "V<b>a</b>ult",
  "Pr<b>o</b>logue",
  "<b>a</b>bout",
  "Conta<b>c</b>t",
];

export interface isPlayingProps {
  isAudioPlaying: boolean;
  setIsAudioPlaying: React.Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ isAudioPlaying, setIsAudioPlaying }: isPlayingProps) => {
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [sideNavVisible, setSideNavVisible] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElement = useRef<HTMLAudioElement>(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(!isAudioPlaying);
    setIsIndicatorActive(!isIndicatorActive);
  };

  useEffect(() => {
    setIsIndicatorActive(isAudioPlaying);
    if (isAudioPlaying) {
      audioElement.current?.play();
    } else {
      audioElement.current?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (sideNavVisible) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [sideNavVisible]);

  const handleSideNavOpen = () => {
    const tl = gsap.timeline();

    tl.to("#product-button", {
      background: "black",
      color: "white",
      ease: "power1.inOut",
    });

    tl.from(
      ".nav-link",
      {
        x: -100,
        y: 50,
        rotateX: 50,
        rotateY: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power1.inOut",
      },
      "-=0.5"
    );

    tl.from(
      ".nav-span",
      {
        opacity: 0,
        duration: 1,
        stagger: 0.07,
      },
      "-=0.8"
    );
  };

  const handleSideNavClose = () => {
    const tl = gsap.timeline();

    tl.to("#product-button", {
      background: "white",
      color: "black",
      ease: "back.inOut",
    });

    tl.to(
      ".nav-link",
      {
        x: 150,
        y: 30,
        rotateX: -50,
        rotateY: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power1.Out",
        onComplete: () => {
          setSideNavVisible(false);
        },
      },
      "-=0.5"
    );

    tl.to(
      ".nav-span",
      {
        opacity: 0,
        duration: 1,
        stagger: 0.07,
        onComplete: () => {
          gsap.set(".nav-span, .nav-link", { clearProps: "all" });
        },
      },
      "-=0.8"
    );
  };

  return (
    <div
      className="fixed inset-x-0 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      ref={navContainerRef}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <a href="/">
              <img
                src="/logo.png"
                alt="logo"
                className="w-10 bg-blue-50 rounded-full"
              />
            </a>
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 flex items-center justify-center gap-1"
            />
          </div>

          {!sideNavVisible && (
            <RiMenuAddLine
              className="text-violet-50 md:hidden cursor-pointer size-6 hover:scale-105"
              onClick={() => {
                setSideNavVisible(true);
                handleSideNavOpen();
              }}
            />
          )}

          {sideNavVisible && (
            <CgClose
              className="size-6 cursor-pointer md:hidden mr-4 hover:scale-105"
              onClick={() => handleSideNavClose()}
            />
          )}

          <div className="h-full items-center hidden md:flex">
            <div>
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-1 cursor-pointer"
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElement}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
      <aside
        className={`${
          sideNavVisible ? "flex" : "hidden"
        } absolute pt-20 pb-8 px-4 -z-10 w-screen h-dvh overflow-y-hidden bg-[#edff66] md:hidden flex-col justify-between`}
      >
        <div className="flex flex-col gap-6">
          {navItems2.map((item, index) => (
            <h1
              key={item}
              onClick={handleSideNavClose}
              className="flex gap-6 w-fit hover:opacity-30 hover:scale-99"
            >
              <span className="nav-span font-general text-xs">
                0{index + 1}
              </span>
              <a
                href={`#${navItems[index].toLowerCase()}`}
                className="nav-link text-black special-font text-8xl uppercase leading-[.8]"
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </h1>
          ))}
        </div>
        <button
          onClick={toggleAudioIndicator}
          className="flex flex-row self-end items-center gap-2 justify-center cursor-pointer"
        >
          <h4 className="text-xs uppercase font-bold font-circular-web">
            Sound {isIndicatorActive ? "On" : "Off"}
          </h4>
          <div className="flex gap-1 items-center">
            <audio ref={audioElement} src="/audio/loop.mp3" loop />
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`indicator-line ${
                  isIndicatorActive ? "active" : ""
                }`}
                style={{ animationDelay: `${bar * 0.1}s`, background: "black" }}
              />
            ))}
          </div>
        </button>
      </aside>
    </div>
  );
};

export default NavBar;
