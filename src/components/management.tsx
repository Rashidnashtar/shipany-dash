import "../assets/css/management.css";
import ManagementCard from "./management-card";
import Pagination from "./assets/pagination";
import CustomSearch from "./assets/custom-search";
import { useState, ChangeEvent } from "react";
import { isItAllArabic } from "../assets/js/helpers";
import { useQuery } from "react-query";
import axios from "axios";
import PageLoader from "./assets/page-loader";
import CustomPopup from "./assets/custom-popup";
import { Navigate, useNavigate } from "react-router-dom";
interface props {
  isStudents?: boolean;
  isTeachers?: boolean;
  isBooks?: boolean;
  isSubjects?: boolean;
}
const Management: React.FC<props> = (props) => {
  const { isStudents, isTeachers, isBooks, isSubjects } = props;
  const navigate = useNavigate();
  // fetching .................................................
  const fetchingName = `${
    isStudents
      ? "students"
      : isTeachers
      ? "teachers"
      : isBooks
      ? "books"
      : isSubjects
      ? "subjects"
      : ""
  }`;
  const { isError, isLoading, data } = useQuery([fetchingName], () => {
    return axios.get(import.meta.env.VITE_REACT_APP_BACKEND_URI + fetchingName);
  });
  console.log(data);
  if (isError) {
    console.log("kdsl;fjals;dkfjlkskadjflksdjflsdfjlsadflk");
    navigate("/notfound");
    return <></>;
  }
  // ..........................................................

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
  const [isDeleteAproved, setIsDeleteAproved] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  if (isDeleteAproved) {
    console.log("deleting proccss");
    setIsDeleteAproved(false);
    console.log(deleteId);
    console.log("deleting");
  }
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
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          <table className=" flex-1 text-center text-sm sm:text-xl  ">
            <thead>
              <tr className=" p-4  font-bold">
                {(isStudents || isTeachers) && <th className=" ">الاسم</th>}
                {(isStudents || isTeachers) && <th className="">الرقم</th>}
                {isStudents && <th className="">الصف</th>}
                {isBooks && (
                  <>
                    <th className="">اسم الكتاب</th>
                    <th className="  ">وصف الكتاب</th>
                  </>
                )}
                {isSubjects && (
                  <>
                    <th className="">اسم المادة</th>
                    <th className="  ">وصف المادة</th>
                  </>
                )}
                <th>{""}</th>
              </tr>
            </thead>
            <tbody>
              <ManagementCard
                _id={1}
                {...props}
                setIsPopupShown={setIsPopupShown}
                setId={setDeleteId}
              />
              <ManagementCard
                _id={2}
                {...props}
                setIsPopupShown={setIsPopupShown}
                setId={setDeleteId}
              />
              <ManagementCard
                {...props}
                _id={3}
                setIsPopupShown={setIsPopupShown}
                setId={setDeleteId}
              />
              <ManagementCard
                _id={4}
                {...props}
                setIsPopupShown={setIsPopupShown}
                setId={setDeleteId}
              />
              <ManagementCard
                _id={5}
                {...props}
                setIsPopupShown={setIsPopupShown}
                setId={setDeleteId}
              />
              <ManagementCard
                _id={6}
                {...props}
                setIsPopupShown={setIsPopupShown}
                setId={setDeleteId}
              />
            </tbody>
          </table>
          <Pagination
            currentPageNumber={currentPageNumber}
            totalPages={totalPages}
            paginate={paginate}
            itemsPerPage={ITEMS_PER_PAGE}
          />
          {isPopupShown && (
            <CustomPopup
              title="هل انتة متأكد من الحذف"
              setIsApproved={setIsDeleteAproved}
              setIsPopupShown={setIsPopupShown}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Management;
