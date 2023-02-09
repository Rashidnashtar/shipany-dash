import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../assets/css/nav.css";
const Navbar: React.FC = () => {
  const location = useLocation();
  const locationMap = {
    "/": 1,
    "/teachers": 2,
    "/books": 3,
  };
  type keys = "/" | "/teachers" | "/books";
  const [active, setActive] = useState(locationMap[location.pathname as keys]);
  const activeStyles = " bg-main-transparent scale-110 ";
  const anqerStyles =
    "cursor-pointer px-3 py-2 rounded-full text-white block hover:bg-main-transparent transition-all duration-300s ";
  return (
    <div className="main-nav bg-main-blue flex flex-col justify-center items-center gap-20 text-2xl ">
      <NavLink
        to="/"
        onClick={() => {
          setActive(1);
        }}
        className={anqerStyles + `${active === 1 ? activeStyles : ""}`}
      >
        <i className="bi bi-pencil  "></i>
      </NavLink>
      <NavLink
        to="/teachers"
        onClick={() => {
          setActive(2);
        }}
        className={anqerStyles + `${active === 2 ? activeStyles : ""}`}
      >
        <i className="bi bi-mortarboard"></i>
      </NavLink>
      <NavLink
        to="/books"
        onClick={() => {
          setActive(3);
        }}
        className={anqerStyles + `${active === 3 ? activeStyles : ""}`}
      >
        <i className="bi bi-journal-text"></i>
      </NavLink>
    </div>
  );
};

export default Navbar;
