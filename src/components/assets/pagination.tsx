import React from "react";

// START // styles for pagination section
const paginationContainerStyle =
  "flex justify-between w-2/3 mt-8 lg:w-1/3 lg:border lg:border-white lg:rounded-md py-2 lg:px-4 mx-auto mb-3 mt-auto";
const numberStyle =
  "block text-white cursor-pointer rounded-lg w-[20px]  bg-main-blue  text-center hover:bg-secandary-blue duration-200 selcet-none ";
const textStyle =
  "block text-white cursor-pointer rounded p-1 text-white bg-main-blue  hover:bg-secandary-blue duration-200 selcet-none";
const currentStyle =
  "block bg-main-blue text-white  duration-200 rounded-3xl  w-[20px] text-center selcet-none";
const disabledStyle = "cursor-not-allowed bg-main-gray hover:bg-main-gray  ";
// END // styles for pagination section

interface Props {
  currentPageNumber: number;
  totalPages: number;
  paginate: Function;
  isPending?: boolean;
  itemsPerPage: number;
}

const Pagination: React.FC<Props> = ({
  currentPageNumber,
  paginate,
  totalPages,
  itemsPerPage,
  isPending,
}) => {
  const maxPageNumber = Math.ceil(totalPages / itemsPerPage);
  return (
    <div
      className={
        paginationContainerStyle +
        ` ${
          isPending ? "w-full absolute bottom-6 translate-x-2/4 -left-1/2" : ""
        }`
      }
    >
      {!isPending && (
        <button
          className={`${numberStyle} ${
            currentPageNumber === 1 ? disabledStyle : ""
          }`}
          onClick={() => paginate(1)}
          disabled={currentPageNumber === 1}
        >
          1
        </button>
      )}
      <button
        className={`${textStyle} ${
          currentPageNumber === 1 ? disabledStyle : ""
        } `}
        onClick={() => paginate(currentPageNumber - 1)}
        disabled={currentPageNumber === 1}
      >
        {isPending ? <i className="bi bi-arrow-left"></i> : "السابق"}
      </button>
      <button className={currentStyle}>{currentPageNumber}</button>
      <button
        className={`${textStyle} ${
          currentPageNumber === maxPageNumber ? disabledStyle : ""
        }`}
        onClick={() => paginate(currentPageNumber + 1)}
        disabled={currentPageNumber === maxPageNumber}
      >
        {isPending ? <i className="bi bi-arrow-right"></i> : "التالي"}
      </button>
      {!isPending && (
        <button
          className={`${numberStyle} ${
            currentPageNumber === maxPageNumber ? disabledStyle : ""
          }`}
          onClick={() => paginate(maxPageNumber)}
          disabled={currentPageNumber === maxPageNumber}
        >
          {maxPageNumber}
        </button>
      )}
    </div>
  );
};

export default Pagination;
