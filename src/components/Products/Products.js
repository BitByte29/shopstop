import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../App/features/productSlice";
import { toast } from "react-toastify";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ReactStars from "react-rating-stars-component";
import Loader from "../subs/Loader";
import Product from "./Product";
import Slider from "react-slider";
// import PriceFilter from "./PriceFilter";

const Products = () => {
  const MIN = 0;
  const MAX = 125000;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data.products);
  const totalPagesHere = useSelector((state) => state.products.data.totalPages);
  const loading = useSelector((state) => state.products.loading);
  const toSearch = useSelector((state) => state.vars.toSearch);
  const categories = useSelector((s) => s.vars.categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingValue, setRatingValue] = useState(0);
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState([MIN, MAX]);
  const [range, setRange] = useState([MIN, MAX]);
  const cartSize = useSelector((s) => s.cart.cartSize);
  useEffect(() => {
    const filters = {
      keyword: toSearch,
      rating: ratingValue,
      currentPage,
      priceRange: range,
      category,
    };
    dispatch(getAllProducts(filters));
  }, [dispatch, toSearch, ratingValue, currentPage, range, category, cartSize]);

  const resetFilters = () => {
    setRatingValue(0);
    setCategory("All");
    setRange([MIN, MAX]);
    setPrice([MIN, MAX]);
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
            {/* ___________price fiter________________ */}
            <h2 className="filter-header">Price</h2>
            <div className="relative flex flex-col gap-4 pb-4">
              <div>
                <span>&#8377;{price[0]}</span>
                {` to `}
                <span>&#8377;{price[1]}</span>
              </div>
              <Slider
                className="price-slider"
                step={100}
                value={price}
                min={MIN}
                pearling
                max={MAX}
                onChange={setPrice}
                onAfterChange={() => {
                  setRange(price);
                }}
              />
            </div>
            <hr />
            {/* ___________ratings fiter________________ */}
            <h2 className="filter-header">Ratings</h2>
            <ReactStars
              {...options}
              value={ratingValue}
              key={ratingValue === 0 ? "rating-key" : null}
              onChange={(newRating) => {
                setRatingValue(newRating);
                setCurrentPage(1);
              }}
            />
            <p>{ratingValue}+ and up.</p>

            <hr />
            {/* ___________category fiter________________ */}
            {/* Can make a subcomponent */}
            {/* <CategoryFilter categories={categories} setCategory={setCategory}/> */}
            <h2 className="filter-header">Category</h2>
            <ul>
              {categories.map((val) => {
                return (
                  <div
                    key={val}
                    className={`flex items-center gap-2 cursor-pointer hover:tracking-wider ${
                      category === val ? "font-semibold" : ""
                    }`}
                  >
                    <li
                      onClick={() => {
                        setCategory(val);
                        console.log(val);
                      }}
                      value={val}
                    >
                      {val}
                    </li>
                    <IoMdCheckmarkCircleOutline
                      className={`w-[20px] h-[20px]  ${
                        category === val ? "text-green-500" : "text-transparent"
                      }`}
                    />
                  </div>
                );
              })}
            </ul>

            <br />

            <button
              className="px-3 py-2 font-semibold text-black transition-all hover:text-white hover:bg-cyan-600 hover:-translate-y-2 bg-cyan-300"
              onClick={resetFilters}
            >
              Clear all filters
            </button>
          </div>
        </div>

        <div className="relative flex flex-col items-center  md:w-[75%] border-2">
          {loading ? (
            <Loader />
          ) : products && products.length > 0 ? (
            <div className="text-center">
              <div className="py-4 mb-4 text-3xl">Available Products</div>
              <div className="flex flex-wrap items-center justify-center gap-4 ">
                {products.map((pro, index) => {
                  return <Product product={pro} key={index} />;
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-3xl">
              No matching products found.
            </div>
          )}
        </div>
      </div>
      {products && products.length > 0 && (
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
                onClick={() => toast("Last page reached")}
              >
                {`Next >`}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
