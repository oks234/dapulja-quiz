function Overlay({ isVisible, clickHandler, className }) {
  return <div className={`fixed inset-0 bg-black transition-all ${isVisible ? "opacity-50 visible" : "opacity-0 invisible"} ${className ? className : ""}`} onClick={clickHandler}></div>;
}

export default Overlay;
