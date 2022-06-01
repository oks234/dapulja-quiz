import { useLocation } from "react-router-dom";
import Overlay from "../Overlay";
import NavLink from "./NavLink";
import Logo from "../Logo";

const MOBILE_NAV_MARGIN_Y = "my-5";
const NAVS = [
  {
    to: "/",
    children: "기출문제",
  },
  {
    to: "/quiz",
    children: "문제풀기",
  },
];

const HeaderInner = ({ children }) => <div className="relative flex items-center lg:container lg:mx-auto lg:px-10">{children}</div>;
const MobileMenuIcon = ({ clickHandler }) => (
  <button className="absolute bottom-1/2 right-6 translate-y-1/2 lg:hidden" onClick={clickHandler}>
    <img src="/assets/Menu.svg" alt="메뉴 아이콘" width={24} />
  </button>
);
const MobileNav = ({ isVisible, children }) => <div className={`fixed top-0 left-0 w-4/5 h-screen p-6 bg-white transition-transform ${isVisible ? "translate-x-0" : "-translate-x-full"} md:w-2/3 lg:hidden`}>{children}</div>;
const LogInOutBtn = ({ loggedIn, clickHandler, className }) => (
  <button className={`text-xs text-zinc-500 ${className ? className : ""}`} onClick={() => clickHandler(loggedIn)}>
    {loggedIn ? "로그아웃" : "로그인"}
  </button>
);

function Header({ isMobileMenuVisible, setIsMobileMenuVisible, isLoggedIn, setIsLoggedIn }) {
  const headerClassName = `relative h-mobile-header px-6 flex items-center justify-start shadow-md md:h-tablet-header lg:px-0 ${useLocation().pathname.includes("/quiz") ? `hidden lg:flex` : ""}`;
  const showMobileNav = () => {
    setIsMobileMenuVisible(true);
  };
  const hideMobileNav = () => {
    setIsMobileMenuVisible(false);
  };
  const toggleIsLoggedIn = (isLoggedIn) => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className={headerClassName}>
      <HeaderInner>
        <Logo className="w-24" />
        <nav className="hidden mx-5 lg:flex">
          {NAVS.map(({ to, children }) => (
            <NavLink key={`${to}-${children}`} to={to} className="mx-5" clickHandler={hideMobileNav}>
              {children}
            </NavLink>
          ))}
        </nav>
        <div className="relative grow flex justify-end">
          <LogInOutBtn loggedIn={isLoggedIn} className="hidden lg:block" clickHandler={toggleIsLoggedIn} />
        </div>
      </HeaderInner>
      <MobileMenuIcon clickHandler={showMobileNav} />
      <Overlay isVisible={isMobileMenuVisible} clickHandler={hideMobileNav} />
      <MobileNav isVisible={isMobileMenuVisible}>
        <div>
          <Logo className="w-20" />
        </div>
        <div className={`flex items-center ${MOBILE_NAV_MARGIN_Y}`}>
          <div className="rounded-full bg-slate-100 mr-2 p-1">
            <img src="/assets/Daram.png" alt="아바타 이미지" width={36} />
          </div>
          <div>다풀자람이</div>
        </div>
        <hr />
        <nav>
          {NAVS.map(({ to, children }) => (
            <div key={`${to}-${children}--mobile`} className={MOBILE_NAV_MARGIN_Y}>
              <NavLink to={to} clickHandler={hideMobileNav}>
                {children}
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="absolute bottom-6 inset-x-0 text-center">
          <LogInOutBtn loggedIn={isLoggedIn} clickHandler={toggleIsLoggedIn} />
        </div>
      </MobileNav>
    </header>
  );
}

export default Header;
