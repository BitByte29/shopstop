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
    <div className="relative flex items-center justify-center w-full bg-dp  py-2 transition-all">
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit}
        className="sm:w-[80%] bg-white px-0 py-0 rounded-full w-[90%] border-none shadow-none "
      >
        <div className="sticky top-0 w-full border-none shadow-none">
          <div className="flex items-center w-full gap-3 px-4 py-2 border-2 border-gray-500 rounded-full ">
            <input
              type="text"
              name="value"
              autoFocus
              id="value"
              onChange={onChange}
              value={keyword}
              className="w-full px-1 py-1 outline-none "
            />
            <ul className="flex gap-4">
              <button type="submit" className="hover:text-blue-500">
                <FaSearch onClick={handleSubmit} className="text-2xl " />
              </button>
              <button type="" className="hover:text-blue-500">
                <FaWindowClose
                  onClick={() => dispatch(closeSearchBox(true))}
                  className="text-2xl"
                />
              </button>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbox;
