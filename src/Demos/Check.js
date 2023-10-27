import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaArrowUp, FaArrowDown, FaTrash, FaPen } from "react-icons/fa";
import { DATA } from "../utils/Data";
import Filters from "./Filters";
import { toast } from "react-toastify";
// import {

//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
// } from "@tanstack/react-table";

const columns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "first_name",
    header: "Name",
    cell: (props) => <p>{props.getValue()}</p>,
    enableSorting: false,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "id",
    header: "Actions",
    enableSorting: false,

    cell: (props) => (
      <div>
        <button onClick={() => toast.success("Editing ", props.getValue())}>
          <FaPen />
        </button>{" "}
        <button onClick={() => toast.warning("Deleting ", props.getValue())}>
          <FaTrash />
        </button>
      </div>
    ),
  },
];

const Check = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // columnResizeMode: "onChange",
  });

  return (
    <div>
      <Filters
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
        sid={"gender"}
      />
      <table width={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-yellow-400 h-24">
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                <p className="flex-center flex-row">
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <FaSort
                      className="cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    />
                  )}
                  {
                    {
                      asc: <FaArrowUp />,
                      desc: <FaArrowDown />,
                    }[header.column.getIsSorted()]
                  }
                </p>
                {/* <div
                  className="h-full w-2  hover:opacity-100 active:bg-green-600 bg-cyan-400 absolute right-0 top-0 opacity-0 cursor-e-resize"
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                ></div> */}
              </th>
            ))}
          </tr>
        ))}

        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="bg-cyan-600 py-2 px-4 text-center
               border-2"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </table>
      <div className="flex-center">
        <p className="flex gap-5 flex-row">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Check;
