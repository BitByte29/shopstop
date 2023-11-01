import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteProduct,
  getAllProductsAdmin,
  editProduct,
  updateProducts,
  setproductInserted,
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
  FaRupeeSign,
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

const Products = ({ role }) => {
  const [shouldHideFirstColumn, setShouldHideFirstColumn] = useState(
    window.innerWidth <= 800
  );
  const { products, loading, productInserted } = useSelector((s) => s.admin);
  const [columnFilters, setColumnFilters] = useState([]);
  const [newprice, setNewprice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [newstock, setNewstock] = useState(0);
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
    if (products.length < 1 || productInserted) {
      dispatch(getAllProductsAdmin());
      dispatch(setproductInserted(false));
    }
    // eslint-disable-next-line
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
    setDiscount(product.discount);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      productEditing.stock === newstock &&
      productEditing.price === newprice &&
      productEditing.discount === discount
    ) {
      setEditBox(false);
      return;
    }

    let p = {
      ...productEditing,
      price: newprice,
      stock: newstock,
      discount: Number(discount),
    };
    if (discount !== productEditing.discount) {
      if (discount === "0") {
        p = { ...p, onSale: false };
      } else {
        p = { ...p, onSale: true };
      }
    }
    let updatedProductList = products.filter(
      (product) => product._id !== editId
    );
    updatedProductList.push(p);
    // console.log(p);
    //Local store
    dispatch(updateProducts(updatedProductList));
    //API call
    dispatch(editProduct({ id: p._id, productData: p }));
    setEditBox(false);
    setEditId(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setShouldHideFirstColumn(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const columns = [
    {
      accessorKey: "name",
      header: "Product Name",
      cell: (props) => <p>{props.getValue()}</p>,
      enableSorting: false,
      show: false,
    },
    {
      accessorKey: "images",
      header: "Product Image",
      cell: (props) => (
        <div className="w-full h-20 flex-center" key={props.getValue()[0].url}>
          <div className={`w-24 h-24 flex-center bg-white p-2`}>
            <img
              src={props.getValue()[0].url}
              className="w-full h-full object-contain"
              alt="product"
            />
          </div>
        </div>
      ),
      enableSorting: false,
      // show: false,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (props) => <p>&#8377;{props.getValue().toLocaleString("hi-IN")}</p>,
    },
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
        <div className="gap-4 flex items-center justify-center flex-col sm:flex-row">
          <button
            className="text-blue-500 hover:text-blue-700"
            title="Edit Product"
          >
            {role === "admin" ? (
              <FaEdit onClick={() => handleEdit(props.getValue())} />
            ) : (
              <FaEdit
                onClick={() =>
                  toast.warning("Visitor's not allowed this action.")
                }
              />
            )}
          </button>

          <button
            className="text-red-500 hover:text-red-700"
            title="Delete Product"
          >
            {role === "admin" ? (
              <FaTrash onClick={() => handleDelete(props.getValue())} />
            ) : (
              <FaTrash
                onClick={() =>
                  toast.warning("Visitor's not allowed this action.")
                }
              />
            )}
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

  const adjustedColumns = shouldHideFirstColumn
    ? columns.slice(0, 1).concat(columns.slice(2, 5))
    : columns;
  const table = useReactTable({
    data: products,
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
            <div class="mt-4">
              <label for="stock" class="block font-medium text-cyan-700">
                Stock:
              </label>
              <input
                type="number"
                id="stock"
                placeholder="Stock"
                onChange={(e) => setNewstock(e.target.value)}
                value={newstock}
                class="w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div class="mt-4">
              <label for="price" class="block font-medium text-cyan-700">
                Price:
              </label>
              <div class="flex items-center">
                <FaRupeeSign class="text-cyan-700 mr-2" />
                <input
                  type="number"
                  id="price"
                  placeholder="Price"
                  onChange={(e) => setNewprice(e.target.value)}
                  value={newprice}
                  class="w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
            <div class="mt-4">
              <label for="discount" class="block font-medium text-cyan-700">
                Discount:
              </label>
              <input
                type="number"
                id="discount"
                placeholder="Discount percentage"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                class="w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <input
              type="submit"
              className=" px-4 py-2 cursor-pointer hover:-translate-y-3 transition-all mt-4 block w-full text-center text-white font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring focus:ring-cyan-200"
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
        <div className="my-12 text-2xl text-center text-slate-600">
          No products found.
        </div>
      )}
    </>
  );
};

export default Products;
