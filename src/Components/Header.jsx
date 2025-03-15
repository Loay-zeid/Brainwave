import brainwave from "../assets/brainwave.svg";
import { navigation } from "../constants/index";
import { useLocation } from "react-router-dom";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import { disablePageScroll,enablePageScroll } from "scroll-lock";

const Header = () => {
  const { hash: pathname } = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation=() =>{
    if(openNavigation){
      setOpenNavigation (false);
      enablePageScroll();
    }
    else{
      setOpenNavigation(true);
      disablePageScroll();
    }
  }
  const handlClick =() =>{
    if(! openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);

  }

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50   border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg--n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block 2-[12rem] xl:mr-8" href="#hero">
          <img src={brainwave} width={190} height={40} alt="Brainwave" loading="lazy" />
        </a>
        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-20 left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => {
              // Hide items with `onlyMobile: true` on larger screens
              if (item.onlyMobile && window.innerWidth >= 1024) {
                return null;
              }
              return (
                <a
                  key={item.id}
                  href={item.url}
                  onClick={handlClick}
                  className={`block relative font-code text-2xl uppercase text-n-1/50 hover:text-n-1 ${
                    item.onlyMobile ? "lg:hidden" : ""
                  } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                    item.url === pathname
                      ? "z-2 lg:text-n-1"
                      : "lg:text-n-1/50"
                  } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                >
                  {item.title}
                </a>
              );
            })}
          </div>
            <HamburgerMenu />
        </nav>

        <a
          href="#signup"
          className="button hidden mr-8 text-n-1/50 hover:text-n-1 lg:block"
        >
          New Account
        </a>
        <Button className="hidden lg:flex" href="#login">
          Sign IN
        </Button>
        <Button className="ml-auto lg:hidden"px="px-3" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
