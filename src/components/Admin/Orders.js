import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SearchFilter from "./SearchFilter";
import {
  FaSort,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaEdit,
  FaWindowClose,
  FaShare,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getAllOrders,
  updateOrder,
  updateOrders,
} from "../../App/features/adminSlice";
import Loader from "../subs/Loader";
import { formatDateFromTimestamp } from "../../utils/functions";
import { Link } from "react-router-dom";

const Orders = () => {
  const { loading, orders } = useSelector((s) => s.admin);
  const [columnFilters, setColumnFilters] = useState([]);
  const [status, setStatus] = useState("");
  const [orderEditing, setOrderEditing] = useState();
  const [editBox, setEditBox] = useState(false);
  const [editId, setEditId] = useState();
  const dispatch = useDispatch();
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

  useEffect(() => {
    // if (orders.length < 1) {
    dispatch(getAllOrders());
    // }
  }, []);

  const handleDelete = (id) => {
    const updatedOrderList = orders.filter((order) => order._id !== id);
    dispatch(updateOrders(updatedOrderList));
    dispatch(deleteOrder({ id }));
  };
  const handleEdit = (id) => {
    setEditBox(true);
    setEditId(id);
    const order = orders.find((item) => item._id === id);
    setOrderEditing(order);
    setStatus(order.orderStatus);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (orderEditing.orderStatus === status) {
      setEditBox(false);
      return;
    }
    const p = { ...orderEditing, orderStatus: status };

    let updatedOrderList = orders.filter((order) => order._id !== editId);
    updatedOrderList.push(p);
    // console.log(p);
    dispatch(updateOrders(updatedOrderList));
    dispatch(updateOrder({ ...p }));

    setEditBox(false);
    setEditId(null);
  };

  const columns = [
    {
      accessorKey: "user.name",
      header: "User Name",
      cell: (props) => <p>{props.getValue()}</p>,
      enableSorting: false,
      show: false,
    },
    {
      accessorKey: "totalPrice",
      header: "Amount",
      cell: (props) => <p>&#8377;{props.getValue().toLocaleString("hi-IN")}</p>,
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
    {
      accessorKey: "_id",
      header: "Actions",
      enableSorting: false,
      cell: (props) => (
        <div className="sm:space-x-2 flex items-center justify-center flex-col sm:flex-row">
          {props.row.original.orderStatus !== "Delivered" && (
            <button
              className="text-blue-500 hover:text-blue-700"
              title="Edit Order"
            >
              <FaEdit onClick={() => handleEdit(props.getValue())} />
            </button>
          )}
          {props.row.original.orderStatus === "Delivered" && (
            <p className="opacity-0" title="Edit Order">
              <FaEdit />
            </p>
          )}
          <button
            className="text-red-500 hover:text-red-700"
            title="Delete Order"
          >
            <FaTrash onClick={() => handleDelete(props.getValue())} />
          </button>
          <Link
            className="text-blue-800 hover:text-cyan-500"
            title="View Order Details"
            to={`/admin/order/${props.getValue()}`}
          >
            <FaShare />
          </Link>
        </div>
      ),
    },
  ];
  const [shouldHideFirstColumn, setShouldHideFirstColumn] = useState(
    window.innerWidth <= 800
  );

  useEffect(() => {
    const handleResize = () => {
      setShouldHideFirstColumn(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const adjustedColumns = shouldHideFirstColumn ? columns.slice(1, 5) : columns;
  const table = useReactTable({
    data: orders,
    columns: adjustedColumns,
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
    <>
      <h1 className="text-center text-4xl font-semibold  text-slate-700 py-12">
        Orders
      </h1>

      <SearchFilter
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
        sid={"totalPrice"}
      />
      {editBox && (
        <div
          className="fixed-center-cover flex p-4"
          // onClick={() => setEditBox(false)}
        >
          <form
            onSubmit={submitHandler}
            className="bg-cyan-200 text-xl px-12 py-8 rounded-lg relative"
          >
            <span
              className="absolute top-0 right-0 p-4 rounded cursor-pointer"
              onClick={() => setEditBox(false)}
            >
              <FaWindowClose />
            </span>
            <h1 className="font-semibold">
              Update status for order of &#8377;
              {orderEditing.totalPrice.toLocaleString("hi-IN")}
            </h1>

            <select
              name="role"
              id=""
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {status === "Processing" ? (
                <>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                </>
              ) : (
                <>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </>
              )}
            </select>
            <input
              type="submit"
              className="bg-red-200 px-4 py-2 cursor-pointer hover:-translate-y-[3px] transition-all"
            />
          </form>
        </div>
      )}

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
                {/* <button
                  onClick={() => table.previousPage()}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="cursor-pointer"
                >
                  {"<"}
                </button> */}
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
    </>
  );
};

export default Orders;
