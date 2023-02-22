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
import {
  getItemsBetweenTowIndexes,
  searchInArray,
} from "./../assets/js/helpers";
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
  const totalPages = data?.data.length || 1;
  // handel pagination
  const paginate = (current: number) => {
    setCurrentPageNumber(current);
  };
  //.............................................................

  // search handler .............................................

  const [searchValue, setSearchValue] = useState("");
  const searchConstrain = isBooks || isSubjects ? "name" : "full_name";
  const handleSearch = (event: ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;

    setSearchValue(value);
    setCurrentPageNumber(1);
  };
  let proccedData = !!searchValue
    ? searchInArray(data?.data, searchValue, searchConstrain)
    : data?.data;
  console.log(proccedData);
  // ............................................................

  // delete handle ..............................................
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

  // ............................................................

  return (
    <div className="management flex flex-col flex-1 p-3 ">
      <h1 className="text-main-blue text-4xl text-right mb-2 mx-auto ">
        إدارة
      </h1>
      <CustomSearch
        placeholder="ابحث .......... "
        searchValue={searchValue}
        handleSearch={handleSearch}
      />
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {proccedData.length === 0 ? (
            <h1 className="text-center">لا يوجد عناصر لعرضها</h1>
          ) : (
            <table className="  text-center text-sm sm:text-xl  ">
              <thead>
                <tr className=" p-4  font-bold h-16">
                  {(isStudents || isTeachers) && <th className=" ">الاسم</th>}
                  {isTeachers && <th className="">الرقم</th>}
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
                {getItemsBetweenTowIndexes(proccedData, min, max).map(
                  (item, i) => {
                    if (isStudents) {
                      return (
                        <ManagementCard
                          key={i}
                          _id={item.id}
                          {...props}
                          setIsPopupShown={setIsPopupShown}
                          setId={setDeleteId}
                          first_name={item.first_name}
                          last_name={item.last_name}
                        />
                      );
                    }
                    if (isTeachers) {
                      return (
                        <ManagementCard
                          key={i}
                          _id={item.teacher_id}
                          {...props}
                          setIsPopupShown={setIsPopupShown}
                          setId={setDeleteId}
                          first_name={item.user.first_name}
                          last_name={item.user.last_name}
                        />
                      );
                    }
                    if (isBooks || isSubjects) {
                      return (
                        <ManagementCard
                          key={i}
                          _id={item.id}
                          {...props}
                          setIsPopupShown={setIsPopupShown}
                          setId={setDeleteId}
                          name={item.name}
                          description={item.description}
                        />
                      );
                    }
                  }
                )}
              </tbody>
            </table>
          )}

          <Pagination
            currentPageNumber={currentPageNumber}
            totalPages={totalPages}
            paginate={paginate}
            itemsPerPage={ITEMS_PER_PAGE}
          />
          {isPopupShown && (
            <CustomPopup
              title="هل انتة متأكد من الحذف"
              asyncFunc={mutate}
              setIsPopupShown={setIsPopupShown}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Management;
