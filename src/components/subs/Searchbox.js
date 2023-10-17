import React, { useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  closeSearchBox,
  updateQueryObj,
} from "../../App/features/variablesSlice";
// import { getAllProducts } from "../../App/features/productSlice";

const Searchbox = () => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const loading = useSelector((s) => s.products.loading);

  const handleSubmit = (e) => {
    e.preventDefault();

    // const query = `?keyword=${keyword.trim()}`;
    const h = {
      keyword,
    };
    dispatch(updateQueryObj(h));
    navigate(`/products`);
  };
  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="relative flex items-center justify-center w-full py-2">
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit}
        className="sm:w-[80%] w-[90%] "
      >
        <div className="sticky top-0">
          <div className="flex items-center w-full gap-3 px-4 py-2 border-2 rounded-full border-cyan-800">
            <input
              type="text"
              name="value"
              id="value"
              onChange={onChange}
              value={keyword}
              className="w-full px-1 py-1 outline-none "
            />
            <button type="submit">
              <FaSearch onClick={handleSubmit} className="text-2xl" />
            </button>
            <button type="">
              <FaWindowClose
                onClick={() => dispatch(closeSearchBox())}
                className="text-2xl"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbox;
