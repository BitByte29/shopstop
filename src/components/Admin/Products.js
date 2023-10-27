import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProductsAdmin,
} from "../../App/features/adminSlice";
import Loader from "../subs/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Products = () => {
  const { products, loading } = useSelector((s) => s.admin);
  const [currentPage, setCurrentPage] = useState(1);
  const [products2, setProducts2] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id }));
  };

  const handleEdit = () => {};

  const perPage = 8;
  const totalPages = Math.ceil(products.length / perPage);

  const paginate = (val) => {
    if (val === "previous") {
      if (currentPage === 1) {
        toast("Starting Page Reached");
        return;
      }
      setCurrentPage((prevPage) => prevPage - 1); // Use the callback function
    } else {
      if (currentPage === totalPages) {
        toast("Last Page Reached");
        return;
      }
      setCurrentPage((prevPage) => prevPage + 1); // Use the callback function
    }
  };

  useEffect(() => {
    const newStartingIndex = (currentPage - 1) * perPage;
    const newEndingIndex = Math.min(
      newStartingIndex + perPage,
      products.length
    );
    const newProducts2 = products.slice(newStartingIndex, newEndingIndex);
    setProducts2(newProducts2);
  }, [loading, currentPage, products]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProductsAdmin());
    }
  }, [dispatch, products]);

  useEffect(() => {
    // Initialize products2 with the products for the first page
    const initialProducts2 = products.slice(0, perPage);
    setProducts2(initialProducts2);
  }, [loading, products]);

  return (
    <>
      <h1 className="text-center text-4xl font-semibold text-slate-700 py-12">
        Products
      </h1>

      {!loading && products.length > 0 ? (
        <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-slate-600 text-white">
              <tr>
                <th className="py-3 px-2 sm:py-4 sm:px-3">Name</th>
                <th className="py-3 px-2 sm:py-4 sm:px-3">Stock</th>
                <th className="py-3 px-2 sm:py-4 sm:px-3">Price</th>
                <th className="py-3 px-2 sm:py-4 sm:px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products2.map((item) => (
                <tr className="text-center" key={item._id}>
                  <td className="py-3 px-2 sm:py-4 sm:px-3">
                    <Link
                      to={`/products/${item._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.name.length > 15
                        ? `${item.name.slice(0, 15)}...`
                        : item.name}
                    </Link>
                  </td>
                  <td>
                    <p>{item.stock}</p>
                  </td>
                  <td>
                    <p>&#8377;{item.price.toLocaleString("hi-IN")}</p>
                  </td>
                  <td>
                    <div className="space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit onClick={handleEdit} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash onClick={() => handleDelete(item._id)} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div className="text-center flex gap-7 justify-center">
              <button onClick={() => paginate("previous")}>{"< "}</button>

              {currentPage === totalPages
                ? `${(currentPage - 1) * perPage + 1}-${products.length} of ${
                    products.length
                  }`
                : `${(currentPage - 1) * perPage + 1}-${
                    currentPage * perPage
                  } of ${products.length}`}
              <button onClick={() => paginate("next")}>{">"}</button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Products;
