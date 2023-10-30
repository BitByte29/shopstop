import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SearchFilter from "../Admin/SearchFilter";
import { myOrders } from "../../App/features/orderSlice";
import { FaSort, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../subs/Loader";
import { formatDateFromTimestamp } from "../../utils/functions";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((s) => s.orders);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({
    pageSize: 5,
    pageIndex: 0,
  });
  const pnext = () => {
    let page = {
      pageSize: 5,
      pageIndex: pagination.pageIndex + 1,
    };
    setPagination(page);
  };

  const ppre = () => {
    let page = {
      pageSize: 5,
      pageIndex: pagination.pageIndex - 1,
    };
    setPagination(page);
  };
  const columns = [
    // {
    //   accessorKey: "user.name",
    //   header: "User Name",
    //   cell: (props) => <p>{props.getValue()}</p>,
    //   enableSorting: false,
    //   show: false,
    // },

    {
      accessorKey: "_id",
      header: "Order ID",
      enableSorting: false,
      cell: (props) => (
        <Link
          to={`/orders/${props.getValue()}`}
          className="text-blue-700 underline text-sm"
        >
          View
        </Link>
      ),
    },
    {
      accessorKey: "totalPrice",
      header: "Amount",
      cell: (props) => (
        <p className="font-semibold">
          &#8377;{props.getValue().toLocaleString("hi-IN")}
        </p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (props) => <p>{formatDateFromTimestamp(props.getValue())}</p>,
    },
    {
      accessorKey: "orderStatus",
      header: "Status",
      cell: (props) => (
        <p
          className={`${
            props.getValue() === "Delivered"
              ? "text-green-700"
              : "text-orange-500"
          } font-semibold`}
        >
          {props.getValue()}
        </p>
      ),
      // ceil: (props) => <p>hi</p>,
    },
  ];

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(myOrders());
    }
  }, []);
  const table = useReactTable({
    data: orders,
    columns: columns,
    state: {
      columnFilters,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="md:px-24 px-4 min-h-[90vh]">
      <h1 className="text-center text-4xl font-semibold  text-slate-700 py-4">
        Your Order's
      </h1>

      <SearchFilter
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
        sid={"orderStatus"}
      />

      {loading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <>
          <div className="bg-white rounded-lg shadow-lg  mb-5 overflow-x-auto">
            <table className="w-full table-fixed bg-slate-300 text-sm sm:text-lg">
              <thead>
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
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`${
                      row.id % 2 === 0 ? "bg-white" : ""
                    } text-center`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className=" py-3 px-2 sm:py-4 sm:px-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex-center py-4 bg-slate-600 font-semibold text-white">
              <p className="flex gap-5 flex-row">
                <button
                  onClick={() => ppre()}
                  disabled={!table.getCanPreviousPage()}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  {"<"}
                </button>
                {"Page "}
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
                <button
                  onClick={() => pnext()}
                  disabled={!table.getCanNextPage()}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  {">"}
                </button>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>No orders</>
      )}
    </div>
  );
};

export default Orders;
