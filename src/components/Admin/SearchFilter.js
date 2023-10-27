import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchFilter = ({ sid, columnFilters, setColumnFilters }) => {
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
    <div className="flex items-center gap-2 bg-white rounded-lg w-1/4 py-2 px-4">
      <span className="">
        <FaSearch />
      </span>
      <input
        type="text"
        name=""
        id=""
        className="focus:outline-none"
        value={val}
        placeholder={`Search by ${sid}`}
        onChange={(e) => onFilterChange(`${sid}`, e.target.value)}
        autoFocus
      />
    </div>
  );
};

export default SearchFilter;
