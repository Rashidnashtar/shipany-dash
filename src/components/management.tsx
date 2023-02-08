import "../assets/css/management.css";
import ManagementCard from "./management-card";
import Pagination from "./assets/pagination";
import CustomSearch from "./assets/custom-search";
import { useState, ChangeEvent } from "react";
import { useLocation } from "react-router-dom";
import { isItAllArabic } from "../assets/js/helpers";
interface props {
  isStudents?: boolean;
  isTeachers?: boolean;
  isBooks?: boolean;
}
const Management: React.FC<props> = ({ isStudents, isTeachers, isBooks }) => {
  // pagination ...............................................
  const ITEMS_PER_PAGE = 6;
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

  // search handler .............................................

  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    if (!isItAllArabic(value)) {
      return;
    }
    setSearchValue(value);
    setCurrentPageNumber(1);
  };
  // ............................................................
  return (
    <div className="management flex flex-col flex-1 p-3 ">
      <h1 className="text-main-blue text-4xl text-right mb-2 mx-auto ">
        إدارة
      </h1>
      <CustomSearch
        placeholder="ابحث باللغة العربية.......... "
        searchValue={searchValue}
        handleSearch={handleSearch}
      />
      <div className="items-container flex-1 flex flex-col gap-2 ">
        <ManagementCard />
        <ManagementCard />
        <ManagementCard />
        <ManagementCard />
        <ManagementCard />
        <ManagementCard />
        <Pagination
          currentPageNumber={currentPageNumber}
          totalPages={totalPages}
          paginate={paginate}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
};

export default Management;
