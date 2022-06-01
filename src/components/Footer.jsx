import { useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  const footerClassName = `flex items-center h-mobile-footer bg-zinc-200 md:h-tablet-footer ${/quiz|result/g.test(useLocation().pathname)  ? `hidden lg:hidden` : ""}`;
  return (
    <footer className={footerClassName}>
      <div className="grow flex flex-col items-center justify-center">
        <Logo className="w-24 mb-4" />
        <p className="text-zinc-500">Copyright &copy; 2021 Dapulja. All right reserved.</p>
      </div>
    </footer>
  );
}
