import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsAdmin,
  editProduct,
  updateProducts,
} from "../../App/features/adminSlice";
import Loader from "../subs/Loader";
import {
  FaSort,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaEdit,
  FaWindowClose,
  FaShare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SearchFilter from "./SearchFilter";

const Products = () => {
  const { products, loading } = useSelector((s) => s.admin);
  const [columnFilters, setColumnFilters] = useState([]);
  const [newprice, setNewprice] = useState();
  const [newstock, setNewstock] = useState();
  const dispatch = useDispatch();
  const [productEditing, setProductEditing] = useState();
  const [editBox, setEditBox] = useState(false);
  const [editId, setEditId] = useState();
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
    if (products.length < 1) {
      dispatch(getAllProductsAdmin());
    }
  }, [dispatch]);
  const handleDelete = (id) => {
    const updatedProductList = products.filter((product) => product._id !== id);
    dispatch(updateProducts(updatedProductList));
    dispatch(deleteProduct({ id }));
  };
  const handleEdit = (id) => {
    setEditBox(true);
    setEditId(id);
    const product = products.find((item) => item._id === id);
    setProductEditing(product);
    setNewprice(product.price);
    setNewstock(product.stock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      productEditing.stock === newstock &&
      productEditing.price === newprice
    ) {
      setEditBox(false);
      return;
    }
    let p = { ...productEditing, price: newprice };
    p = { ...p, stock: newstock };
    let updatedProductList = products.filter(
      (product) => product._id !== editId
    );
    updatedProductList.push(p);
    console.log(p);
    //Local store
    dispatch(updateProducts(updatedProductList));
    //API call
    dispatch(editProduct({ id: p._id, productData: p }));
    setEditBox(false);
    setEditId(null);
  };
  const columns = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: (props) => <p>{props.getValue()}</p>,
      enableSorting: false,
      show: false,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (props) => <p>&#8377;{props.getValue().toLocaleString("hi-IN")}</p>,
    },
    // {
    //   accessorKey: "createdAt",
    //   header: "Date",
    //   cell: (props) => <p>{formatDateFromTimestamp(props.getValue())}</p>,
    // },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: (props) => (
        <p
          className={`${
            props.getValue() > 10 ? "text-green-700" : "text-orange-500"
          } font-semibold`}
        >
          {props.getValue()}
        </p>
      ),
    },
    {
      accessorKey: "_id",
      header: "Actions",
      enableSorting: false,
      cell: (props) => (
        <div className="sm:space-x-2 flex items-center justify-center flex-col sm:flex-row">
          <button
            className="text-blue-500 hover:text-blue-700"
            title="Edit Product"
          >
            <FaEdit onClick={() => handleEdit(props.getValue())} />
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            title="Delete Product"
          >
            <FaTrash onClick={() => handleDelete(props.getValue())} />
          </button>
          <Link
            className="text-blue-800 hover:text-cyan-500"
            title="View Product Details"
            to={`/products/${props.getValue()}`}
          >
            <FaShare />
          </Link>
        </div>
      ),
    },
  ];

  // const adjustedColumns = shouldHideFirstColumn ? columns.slice(1, 5) : columns;
  const table = useReactTable({
    data: products,
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
    <>
      <h1 className="text-center text-4xl font-semibold text-slate-700 py-12">
        Products
      </h1>
      <SearchFilter
        setColumnFilters={setColumnFilters}
        columnFilters={columnFilters}
        sid={"name"}
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
              Update {productEditing.name}'s Price and Stock
            </h1>

            <input
              type="number"
              placeholder="Stock"
              onChange={(e) => setNewstock(e.target.value)}
              value={newstock}
            />
            <input
              type="number"
              placeholder="Price"
              onChange={(e) => setNewprice(e.target.value)}
              value={newprice}
            />
            <input
              type="submit"
              className="bg-red-200 px-4 py-2 cursor-pointer hover:-translate-y-[3px] transition-all"
            />
          </form>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
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
        <>No Products</>
      )}
    </>
  );
};

export default Products;
