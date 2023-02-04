import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/nav.css";
const Navbar: React.FC = () => {
  const [active, setActive] = useState(0);
  const activeStyles = " bg-main-transparent scale-110 ";
  const anqerStyles =
    "cursor-pointer px-3 py-2 rounded-full text-white block hover:bg-main-transparent transition-all duration-300s ";
  return (
    <div className="main-nav bg-main-blue flex flex-col justify-center items-center gap-20 text-2xl ">
      <a
        onClick={() => {
          setActive(1);
        }}
        className={anqerStyles + `${active === 1 ? activeStyles : ""}`}
      >
        <i className="bi bi-pencil  "></i>
      </a>
      <a
        onClick={() => {
          setActive(2);
        }}
        className={anqerStyles + `${active === 2 ? activeStyles : ""}`}
      >
        <i className="bi bi-mortarboard"></i>
      </a>
      <a
        onClick={() => {
          setActive(3);
        }}
        className={anqerStyles + `${active === 3 ? activeStyles : ""}`}
      >
        <i className="bi bi-journal-text"></i>
      </a>
    </div>
  );
};

export default Navbar;
