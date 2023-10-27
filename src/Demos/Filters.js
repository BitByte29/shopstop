import React from "react";
import { FaSearch } from "react-icons/fa";

const Filters = ({ sid, columnFilters, setColumnFilters }) => {
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
    <div>
      <input
        type="text"
        name=""
        id=""
        className="border-2"
        value={val}
        placeholder={`Search by ${sid}`}
        onChange={(e) => onFilterChange(`${sid}`, e.target.value)}
        autoFocus
      />
      <FaSearch />
    </div>
  );
};

export default Filters;
