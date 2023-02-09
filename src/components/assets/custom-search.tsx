import React, { ChangeEventHandler } from "react";

interface Props {
  hasFilters?: boolean;
  placeholder: string;
  searchValue: string;
  sortType?: string;
  handleSort?: Function;
  handleSearch: ChangeEventHandler<HTMLInputElement>;
}

const CustomSearch: React.FC<Props> = ({
  hasFilters,
  placeholder,
  searchValue,
  sortType,
  handleSort,
  handleSearch,
}) => {
  return (
    <div className="custom__search   flex-col py-4 px-0 w-full">
      {/* {hasFilters && (
        <div className="flex justify-evenly text-white">
          <p>الترتيب حسب:</p>
          <label
            className={`flex gap-3 ${
              sortType === "alpha" ? "text-main-yellow" : ""
            }`}
            htmlFor="alpha-sort"
          >
            الأبجدية
            <input
              type="radio"
              id="alpha-sort"
              name="sort-type"
              checked={sortType === "alpha"}
              onChange={() => handleSort!("alpha")}
            />
          </label>
          <label
            className={`flex gap-3 ${
              sortType === "avg" ? "text-main-yellow" : ""
            }`}
            htmlFor="avg-sort"
          >
            المعدل
            <input
              type="radio"
              id="avg-sort"
              name="sort-type"
              checked={sortType === "avg"}
              onChange={() => handleSort!("avg")}
            />
          </label>
        </div>
      )} */}

      <input
        type="search"
        className="custom__search__input transition-all duration-300 focus:outline-0 border-main-border border focus:border-main-gray  focus:scale-105 block w-full md:w-2/3 mx-auto mt-4 p-1 font-md pr-3 bg-main-bg-color text-right text-xl sm:text-2xl  focus:outline-none py-2 px-3 rounded "
        aria-label="search"
        placeholder={placeholder}
        onChange={handleSearch}
        value={searchValue}
      />
    </div>
  );
};

export default CustomSearch;
