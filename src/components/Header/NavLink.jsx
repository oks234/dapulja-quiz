import { Link, useLocation } from "react-router-dom";

function NavLink({ to, clickHandler, className, children }) {
  const textColor = useLocation().pathname === to ? "text-primary" : "";
  return (
    <Link to={to} className={`block ${textColor} ${className ? className : ""}`} onClick={clickHandler}>
      {children}
    </Link>
  );
}

export default NavLink;
