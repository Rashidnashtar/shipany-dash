import { useState } from "react";
import "../assets/css/pending-list.css";
import PendingCard from "./pending-card";
import Pagination from "./assets/pagination";
const PendingList: React.FC = () => {
  const [active, setActive] = useState(0);

  // pagination ...............................................
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

  return (
    <div
      className={`pending-list bg-white ml-10  p-3 fixed top-0  z-50 w-[280px]   h-full border-l-8 border-main-blue transition-all duration-300  ${
        active === 1 ? "right-0" : "-right-[280px]"
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
          active ? "-left-14" : "-left-16"
        }`}
      >
        {active ? (
          <i className="bi bi-bell-fill"></i>
        ) : (
          <i className="bi bi-bell"></i>
        )}
      </div>
      <div className="requests-container flex flex-col">
        <PendingCard isStudent />
        <PendingCard isStudent />
        <PendingCard isTeacher />
        <PendingCard isTeacher />
        <PendingCard isTeacher />
        <PendingCard isStudent />
        <PendingCard isStudent />
        <PendingCard isStudent />
        <PendingCard isFather />
        <PendingCard isFather />
        <PendingCard isFather />
        <Pagination
          currentPageNumber={currentPageNumber}
          totalPages={totalPages}
          paginate={paginate}
          itemsPerPage={ITEMS_PER_PAGE}
          isPending
        />
      </div>
    </div>
  );
};

export default PendingList;
