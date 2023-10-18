import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { getAllProducts } from "../../App/features/productSlice";
import Loader from "../subs/Loader";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";

const Products = () => {
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = useState(0);
  const products = useSelector((state) => state.products.data.products);
  const totalPagesHere = useSelector((state) => state.products.data.totalPages);
  // const [category, setCategory] = useState('')
  const loading = useSelector((state) => state.products.loading);
  const toSearch = useSelector((state) => state.vars.toSearch);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filters = {
      keyword: toSearch,
      rating: ratingValue,
      currentPage,
    };

    dispatch(getAllProducts(filters));
  }, [dispatch, toSearch, ratingValue, currentPage]);

  const resetFilters = () => {
    setRatingValue(0);
  };
  const options = {
    edit: true,
    activeColor: "tomato",
    size: 25,
    isHalf: true,
  };

  return (
    <>
      <div className="flex flex-col  gap-4 md:flex-row md:px-[5vh]">
        <div className="w-full md:w-[25%] ">
          <div className="sticky px-4 py-4 border-2 rounded-lg md:px-14 top-20 ">
            <h2>Price</h2>
            {/* <progress min="20" max="50" value={20} draggable /> */}
            {/* <range min="20" max="50" value={20} draggable /> */}
            <input type="range" name="price" id="" min={20} max={100} />

            <hr />
            <h2>Ratings</h2>
            <div>
              <ReactStars
                {...options}
                // key={ratingValue}
                value={ratingValue}
                key={ratingValue === 0 ? "rating-key" : null}
                onChange={(newRating) => {
                  setRatingValue(newRating);
                  setCurrentPage(1);
                }}
              />
            </div>
            <p>{ratingValue}+ and up.</p>

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
            <button className="px-3 py-2 bg-cyan-600" onClick={resetFilters}>
              Clear all filters
            </button>
          </div>
        </div>

        <div className="relative flex flex-col items-center  md:w-[75%] border-2">
          <div className="py-4 mb-4 text-3xl">Available Products</div>

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
      <div className="flex items-center justify-center gap-0 py-5">
        <div className="flex items-center justify-center gap-0 bg-slate-200">
          {currentPage > 1 ? (
            <button
              className="px-3 py-2 hover:bg-slate-400 w-[100px] "
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {`< Pre`}
            </button>
          ) : (
            <button
              className="px-3 py-2 hover:bg-slate-400 w-[100px] text-slate-500 cursor-not-allowed"
              onClick={() => toast("First page reached")}
            >
              {`< Pre`}
            </button>
          )}
          <p className="px-3 py-2 font-bold bg-slate-400">
            {currentPage}/{totalPagesHere}
          </p>
          {currentPage < totalPagesHere ? (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-2 hover:bg-slate-400 w-[100px]"
            >
              {`Next >`}
            </button>
          ) : (
            <button
              className="px-3 py-2 hover:bg-slate-400 w-[100px] text-slate-500 cursor-not-allowed"
              onClick={() => toast("First page reached")}
            >
              {`Next >`}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
