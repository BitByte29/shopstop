import React, { useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  closeSearchBox,
  updateCurrenPage,
  updateRating,
  updateToSearch,
} from "../../App/features/variablesSlice";
// import { getAllProducts } from "../../App/features/productSlice";

const Searchbox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(useSelector((s) => s.vars.toSearch));

  //How it started working again?? xD
  // useEffect(() => {
  //   console.log("Keyword updated:", keyword);
  // }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //When ever new item is searched we would make the page and rating  0
    dispatch(updateToSearch(keyword));
    dispatch(updateRating());
    dispatch(updateCurrenPage());

    navigate(`/products`);
  };
  const onChange = (e) => {
    console.log("keyword here:", keyword);
    setKeyword(e.target.value);
    // dispatch(updateToSearch(e.target.value));
    console.log("keyword here 2:", keyword);
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
              autoFocus
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
