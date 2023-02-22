import React, { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import { fetchApi } from "../../assets/js/helpers";
import PageLoader from "./page-loader";

interface props {
  title: string;
  setIsPopupShown: any;
  asyncFunc: Function;
  isAttach?: boolean;
  setTeacherId?: Function;
  teacherId?: number;
}
const CustomPopup: React.FC<props> = ({
  title,
  setIsPopupShown,
  isAttach,

  asyncFunc,
}) => {
  const fetchTeachers = fetchApi("teachers", "GET", undefined);
  const { isLoading, data } = useQuery(["teachers"], () => fetchTeachers, {
    enabled: !!isAttach,
  });
  console.log(data?.data);
  const [id, setId] = useState<number | string>(0);
  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-[#ffffffbc] flex justify-center z-50 items-center has-bg-color">
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="w-3/4 sm:w-2/4 lg:w-1/4 bg-white border-2 border-main-blue flex flex-col p-7 rounded">
          <h2 className="mb-4">{title}</h2>
          {isAttach && (
            <select
              value={id}
              className="w-full text-black border border-main-gray focus:outline-none rounded"
              onChange={(e: ChangeEvent) => {
                const { value } = e.target as HTMLSelectElement;
                console.log(value);
                setId!(value);
              }}
            >
              <option value={""}>اختر استاذاً</option>
              {data?.data.map((item: any) => (
                <option key={item.teacher_id} value={item.teacher_id}>
                  {item.user.first_name + " " + item.user.last_name}
                </option>
              ))}
            </select>
          )}
          <div className="mr-auto mt-3 text-white">
            <button
              disabled={!!!id && isAttach}
              onClick={() => {
                setIsPopupShown(false);
                if (isAttach) asyncFunc({ teacher_id: id });
                else asyncFunc();
              }}
              className="ml-1 focus:outline-none transition-all duration-300  px-4 py-1 mb-1 rounded bg-green-400 hover:bg-green-500 disabled:bg-main-gray "
            >
              تأكيد
            </button>
            <button
              onClick={() => {
                setIsPopupShown(false);
              }}
              className="ml-1 focus:outline-none  px-4 mb-1 py-1 rounded bg-main-red hover:bg-secandary-red"
            >
              رفض
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPopup;
