import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAdmin } from "../../App/features/productSlice";
import Loader from "../subs/Loader";
const Products = () => {
  const products = useSelector((s) => s.products);
  const { loading } = useSelector((s) => s.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsAdmin());
  }, []);

  return (
    <>
      <h1 className="text-center text-4xl font-semibold  text-slate-700 py-12">
        Products
      </h1>
      {/* {products.length > 0 && <p>{products[0].map}</p>} */}

      {loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <p>{products[0].name}</p>
      ) : (
        "nu"
      )}
    </>
  );
};

export default Products;
