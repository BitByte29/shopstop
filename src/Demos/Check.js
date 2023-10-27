import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  FaSort,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { DATA } from "../utils/Data";
import Filters from "./Filters";
import { toast } from "react-toastify";

const Check = () => {
  const [data, setData] = useState(DATA.slice(1, 6));
  const [tableData, setTableData] = useState(DATA.slice(1, 6)); // Separate state for table data
  const [columnFilters, setColumnFilters] = useState([]);
  const [newG, setnewG] = useState("");
  const [editBox, setEditBox] = useState(false);
  const [editId, setEditId] = useState();

  const handleDelete = (id) => {
    toast.error(`Item ${id} deleted.`);
    const updatedData = data.filter((ele) => ele.id !== id);
    setData(updatedData);
    setTableData(updatedData); // Update table data
  };

  const handleEdit = (id) => {
    setEditBox(true);
    setEditId(id);
    setnewG(data.find((e) => e.id === id).gender);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const updatedData = data.map((obj) => {
      if (obj.id === editId) {
        return { ...obj, gender: newG };
      }
      return obj;
    });

    setData(updatedData);
    setTableData(updatedData); // Update table data

    setEditBox(false);
    setEditId(null);
  };

  useEffect(() => {}, [data]);

  useEffect(() => {}, [data]);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "first_name",
      header: "Name",
      // size: 50,
      cell: (props) => <p>{props.getValue()}</p>,
      enableSorting: false,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "car.brand",
      header: "Cars",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "id",
      header: "Actions",
      enableSorting: false,
      cell: (props) => (
        <div className="space-x-2">
          <button className="text-blue-500 hover:text-blue-700">
            <FaEdit onClick={() => handleEdit(props.getValue())} />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <FaTrash onClick={() => handleDelete(props.getValue())} />
          </button>
        </div>
      ),
    },
  ];
  // useEffect(() => {

  // }, [])
  const table = useReactTable({
    data: tableData, // Use tableData here
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div>
      <Filters
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
        sid={"gender"}
      />
      {editBox && (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={newG}
            onChange={(e) => setnewG(e.target.value)}
          />
          <input type="submit" />
        </form>
      )}
      <div className="bg-white rounded-lg shadow-lg pb-5 mb-5 overflow-x-auto">
        <table className="w-full table-fixed">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-slate-600 text-white">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-3 px-2 sm:py-4 sm:px-3">
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
                </th>
              ))}
            </tr>
          ))}

          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="text-center">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className=" py-3 px-2 sm:py-4 sm:px-3">
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
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Check;
