import "../assets/css/management.css";
import ManagementCard from "./management-card";
import Pagination from "./assets/pagination";
import CustomSearch from "./assets/custom-search";
import { useState, ChangeEvent } from "react";
import { fetchApi, isItAllArabic } from "../assets/js/helpers";
import { useQuery } from "react-query";
import PageLoader from "./assets/page-loader";
import CustomPopup from "./assets/custom-popup";
import { useNavigate } from "react-router-dom";

import useDelete from "../assets/hooks/useDelete";
interface props {
  isStudents?: boolean;
  isTeachers?: boolean;
  isBooks?: boolean;
  isSubjects?: boolean;
}
const Management: React.FC<props> = (props) => {
  const token = localStorage.getItem("token");  
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
  const { isLoading, data } = useQuery(
    [fetchingName],
    () => fetchApi(fetchingName, undefined, undefined, token!),
    {
      onError: () => {
        navigate("/notfound");
        return <></>;
      },
    }
  );
  console.log(data);

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

  // delete handle ..............................................
  const [isDeleteAproved, setIsDeleteAproved] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);
  const deleteUrl = isStudents
    ? `/delete_student/${deleteId}`
    : isTeachers
    ? `delete_user/${deleteId}`
    : isBooks
    ? `/books/${deleteId}'`
    : isSubjects
    ? `subjects/${deleteId}`
    : "";
  const { mutate } = useDelete(deleteUrl, token!, fetchingName);
  if (isDeleteAproved) {
    mutate();
    setIsDeleteAproved(false);
  }
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
