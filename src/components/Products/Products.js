import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { getAllProducts } from "../../App/features/productSlice";
import Loader from "../subs/Loader";
import ReactStars from "react-rating-stars-component";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data.products);
  const loading = useSelector((state) => state.products.loading);
  const h = useSelector((state) => state.vars.queryObj);

  useEffect(() => {
    console.log(h);

    // const h = {
    //   keyword: "acer",
    // };
    // dispatch(updateQueryObj(h));
    dispatch(getAllProducts(h));
  }, [dispatch, h]);

  const options = {
    edit: false,
    activeColor: "tomato",
    value: 4.3,
    size: 25,
    isHalf: true,
  };

  return (
    <>
      <div className="flex flex-col  gap-4 md:flex-row md:px-[5vh]">
        <div className="w-full md:w-[25%] ">
          <div className="sticky px-4 md:px-20 top-20 ">
            <h2>Price</h2>
            {/* <progress min="20" max="50" value={20} draggable /> */}
            {/* <range min="20" max="50" value={20} draggable /> */}
            <input type="range" name="price" id="" min={20} max={100} />

            <hr />
            <h2>Ratings</h2>
            <ReactStars {...options} />

            <hr />
            <h2>Category</h2>
            <input type="checkbox" name="models" id="models" />
            <label htmlFor="models">Mobile</label>
            <br />
            <input type="checkbox" name="laptpp" id="laptpp" />
            <label htmlFor="laptpp">Laptop</label>
            <br />

            <input type="checkbox" name="cam" id="cam" />
            <label htmlFor="cam">Camera</label>
            <br />
            <br />
            <button className="px-3 py-2 bg-cyan-600">Apply</button>
          </div>
        </div>

        <div className="relative flex flex-col items-start md:w-[75%]">
          <div className="">Some widgests htmlFor sorting up and down</div>

          {loading ? (
            <Loader />
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4 ">
              {products &&
                products.map((pro, index) => (
                  <Product product={pro} key={index} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
