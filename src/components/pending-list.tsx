import React, { useRef, useState } from "react";
import "../assets/css/pending-list.css";
import PendingCard from "./pending-card";
import Pagination from "./assets/pagination";
import { useQuery } from "react-query";
import Loader from "./assets/loader";
import { fetchApi } from "../assets/js/helpers";
import useClickOutSide from "./../assets/hooks/useClickOutside";
import { getItemsBetweenTowIndexes } from "./../assets/js/helpers";

interface props {
  isUser?: boolean;
}
const PendingList: React.FC<props> = ({ isUser }) => {
  const token = localStorage.getItem("token");

  const fetchingName = isUser ? "all_pending_users" : "all_pending_students";
  const fetchPending = () => fetchApi(fetchingName, "GET", undefined, token!);

  const [active, setActive] = useState(0);
  // handle fetching ..........................................

  const { isLoading: isLoading, data } = useQuery([fetchingName], fetchPending);
  console.log(data?.data);

  // ..........................................................

  // pagination ...............................................
  //TODO: move it to ustom hook if you can
  const ITEMS_PER_PAGE = 8;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // declare the min and max
  const min = ITEMS_PER_PAGE * (currentPageNumber - 1);
  const max = currentPageNumber * ITEMS_PER_PAGE;
  // @ts-ignore
  // const totalPages = 100;

  const totalPages = (isUser ? data?.data.length : data?.data.length) || 0;

  console.log(totalPages);
  // handel pagination
  const paginate = (current: number) => {
    setCurrentPageNumber(current);
  };
  //.............................................................

  // handle clicking outside of the Pending List.................
  const ref = useRef(null);
  useClickOutSide(setActive, ref);

  // ............................................................

  const displayList = (list: any[]) => {
    return getItemsBetweenTowIndexes(list, min, max).map((item: any) => (
      <PendingCard
        first_name={item.first_name}
        last_name={item.last_name}
        isUser={isUser}
        key={item.id}
        id={item.id}
      />
    ));
  };
  return (
    <div
      ref={ref}
      className={`pending-list bg-white ml-10  p-3 fixed top-0  z-10 w-[280px]   h-full border-l-8 border-main-blue transition-all duration-300  ${
        active === 1 ? "right-0" : "-right-[290px]"
      }`}
    >
      <h1 className="text-main-blue text-center text-2xl mb-2  ">
        {isUser ? "طلبات المستخدمين المعلقة" : " طلبات الطلاب المعلقة المعلقة"}
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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="requests-container flex flex-col">
          {data?.data.length ? (
            isUser ? (
              displayList(data.data)
            ) : (
              displayList(data.data)
            )
          ) : (
            <h4 className="text-center "> لايوجد طلبات لعرضها</h4>
          )}
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
