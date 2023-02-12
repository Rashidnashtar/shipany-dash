import React, { useRef, useState } from "react";
import "../assets/css/pending-list.css";
import PendingCard from "./pending-card";
import Pagination from "./assets/pagination";
import { useQuery } from "react-query";
import Loader from "./assets/loader";
import { fetchApi } from "../assets/js/helpers";
import useClickOutSide from "./../assets/hooks/useClickOutside";
const PendingList: React.FC = () => {
  const fetchPendingTeachers = () => fetchApi("all_pending_teachers");
  const fetchPendingStudents = () => fetchApi("all_pending_students");
  const fetchPendingFathers = () => fetchApi("all_pending_fathers");

  const [active, setActive] = useState(0);
  // handle fetching ..........................................
  const { isLoading: isLoadingTeachers, data: teachersData } = useQuery(
    ["pending-teachers"],
    fetchPendingTeachers
  );
  const { isLoading: isLoadingStudents, data: studentData } = useQuery(
    ["pending-students"],
    fetchPendingStudents
  );
  const { isLoading: isLoadingFathers, data: fathersData } = useQuery(
    ["pending-fathers"],
    fetchPendingFathers
  );
  // ..........................................................

  // pagination ...............................................
  //TODO: move it to ustom hook if you can
  const ITEMS_PER_PAGE = 30;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // declare the min and max
  const min = ITEMS_PER_PAGE * (currentPageNumber - 1);
  const max = currentPageNumber * ITEMS_PER_PAGE;
  // @ts-ignore
  const totalPages = 100;
  // const totalPages = data?.data.length || 0;
  // handel pagination
  const paginate = (current: number) => {
    setCurrentPageNumber(current);
  };
  //.............................................................

  // handle clicking outside of the Pending List.................
  const ref = useRef(null);
  useClickOutSide(setActive, ref);

  // ............................................................

  return (
    <div
      ref={ref}
      className={`pending-list bg-white ml-10  p-3 fixed top-0  z-10 w-[280px]   h-full border-l-8 border-main-blue transition-all duration-300  ${
        active === 1 ? "right-0" : "-right-[290px]"
      }`}
    >
      <h1 className="text-main-blue text-center text-2xl mb-2  ">
        الطلبات المعلقة
      </h1>
      <div
        onClick={() => {
          active === 0 ? setActive(1) : setActive(0);
        }}
        className={`w-12 h-12 bg-main-gray absolute top-14 transition-all duration-300 shadow-md hover:shadow-main-gray  cursor-pointer flex items-center justify-center text-white text-3xl rounded ${
          active ? "-left-14" : "-left-20"
        }`}
      >
        {active ? (
          <i className="bi bi-bell-fill"></i>
        ) : (
          <i className="bi bi-bell"></i>
        )}
      </div>
      {false ? (
        <Loader />
      ) : (
        <div className="requests-container flex flex-col">
          <PendingCard isStudent id={1} />
          <PendingCard isStudent id={2} />
          <PendingCard isTeacher id={3} />
          <PendingCard isTeacher id={4} />
          <PendingCard isTeacher id={5} />
          <PendingCard isStudent id={6} />
          <PendingCard isStudent id={1} />
          <PendingCard isStudent id={1} />
          <PendingCard isFather id={1} />
          <PendingCard isFather id={1} />
          <PendingCard isFather id={1} />
          <Pagination
            currentPageNumber={currentPageNumber}
            totalPages={totalPages}
            paginate={paginate}
            itemsPerPage={ITEMS_PER_PAGE}
            isPending
          />
        </div>
      )}
    </div>
  );
};

export default PendingList;
