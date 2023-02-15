import { useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useClickOutSide from "../assets/hooks/useClickOutside";
import "../assets/css/nav.css";
const Navbar: React.FC = () => {
  const location = useLocation();
  const addListRef = useRef(null);
  const locationMap = {
    "/": 1,
    "/teachers": 2,
    "/books": 3,
    "/subjects": 4,
  };
  type keys = "/" | "/teachers" | "/books";
  const [active, setActive] = useState(locationMap[location.pathname as keys]);
  const [addActive, setAddActive] = useState(false);
  console.log(addActive);

  const activeStyles = " bg-main-transparent scale-110 ";
  const anqerStyles =
    "cursor-pointer px-3 py-2 rounded-full text-white block hover:bg-main-transparent transition-all duration-300s ";
  useClickOutSide(setAddActive, addListRef);
  return (
    <div className="main-nav  bg-main-blue flex flex-col justify-center items-center gap-20 text-2xl ">
      <span title="الطلاب">
        <NavLink
          to="/"
          onClick={() => {
            setActive(1);
          }}
          className={anqerStyles + `${active === 1 ? activeStyles : ""}`}
        >
          <i className="bi bi-pencil  "></i>
        </NavLink>
      </span>
      <span title="الأساتذة">
        <NavLink
          to="/teachers"
          onClick={() => {
            setActive(2);
          }}
          className={anqerStyles + `${active === 2 ? activeStyles : ""}`}
        >
          <i className="bi bi-mortarboard"></i>
        </NavLink>
      </span>
      <span title="الكتب">
        <NavLink
          to="/books"
          onClick={() => {
            setActive(3);
          }}
          className={anqerStyles + `${active === 3 ? activeStyles : ""}`}
        >
          <i className="bi bi-book"></i>
        </NavLink>
      </span>
      <span title="المواد">
        <NavLink
          to="/subjects"
          onClick={() => {
            setActive(4);
          }}
          className={anqerStyles + `${active === 4 ? activeStyles : ""}`}
        >
          <i className="bi bi-journal-text"></i>
        </NavLink>
      </span>
      <span ref={addListRef} className="relative" title="أضف">
        <div
          onClick={() => {
            setAddActive(!addActive);
            // addActive ? setAddActive(0) : setAddActive(1);
          }}
          className={anqerStyles + `${addActive ? activeStyles : ""}`}
        >
          <i className="bi bi-file-plus"></i>
        </div>
        <div
          className={
            "absolute top-1/2 -translate-y-1/2  z-10 w-48 h-32 bg-white shadow-lg shadow-main-gray border border-main-blue rounded  flex flex-col justify-between p-4 text-main-blue hover:text-secandary-blue duration-300 transition-all " +
            `${addActive ? "left-20" : "-left-96"}`
          }
        >
          <Link className="block border-b border-b-main-gray" to="/add/book">
            كتاب جديد
          </Link>
          <Link className="block border-b border-b-main-gray" to="/add/subject">
            مادة جديد
          </Link>
        </div>
      </span>
    </div>
  );
};

export default Navbar;
