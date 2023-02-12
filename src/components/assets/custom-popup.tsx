import React from "react";

interface props {
  title: string;
  setIsPopupShown: any;
  setIsApproved: any;
}
const CustomPopup: React.FC<props> = ({
  title,
  setIsPopupShown,
  setIsApproved,
}) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0  bg-[#ffffffbc] flex justify-center z-50 items-center has-bg-color">
      <div className="w-3/4 sm:w-2/4 lg:w-1/4 bg-white border-2 border-main-blue flex flex-col p-7   rounded">
        <h2 className="mb-4">{title}</h2>
        <div className="mr-auto mt-3 text-white">
          <button
            onClick={() => {
              setIsPopupShown(false);
              setIsApproved(true);
            }}
            className="ml-1 focus:outline-none  px-4 py-1 mb-1 rounded bg-green-400 hover:bg-green-500 "
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
    </div>
  );
};

export default CustomPopup;
