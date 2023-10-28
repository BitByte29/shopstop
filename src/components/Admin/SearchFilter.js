import React from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const SearchFilter = ({ sid, columnFilters, setColumnFilters }) => {
  //Can compare string values.
  const val = columnFilters.find((f) => f.id === sid)?.value || "";
  const onFilterChange = (id, value) => {
    //To set multiple filter one by searching other by selecting
    //It changes the filter by creating new [] with other filter objects then appending the searched filter to it
    // setColumnFilters((prev) =>
    //   prev.filter((f) => f.id !== id).concat({ id, value })
    // );
    //Only gonna apply search for now.
    setColumnFilters([{ id, value }]);
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg md:w-2/4 lg:w-1/4 py-2 my-4 px-4">
      <span className="">
        <FaSearch />
      </span>
      <input
        type="text"
        name=""
        id=""
        className="focus:outline-none w-full"
        value={val}
        placeholder={`Search by ${sid}`}
        onChange={(e) => onFilterChange(`${sid}`, e.target.value)}
        autoFocus
      />
    </div>
  );
};

export default SearchFilter;
