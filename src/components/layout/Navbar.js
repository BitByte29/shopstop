import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaHamburger,
  FaWindowClose,
} from "react-icons/fa";
import Searchbox from "../subs/Searchbox";
import { useDispatch, useSelector } from "react-redux";

import UserOptions from "./UserOptions";
import { openSearchBox } from "../../App/features/variablesSlice";
import CartIcon from "./CartIcon";
import "./userOption.css";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const searchBoxOn = useSelector((s) => s.vars.searchBoxOn);
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  return (
    <>
      <nav className="fixed top-0 left-0 z-30 flex items-center justify-between w-full h-[10vh] px-8 md:px-8  text-2xl  bg-white text-black md:text-lg">
        <Link to="/home" className="h-full py-3 md:block hidden">
          <img src="/logo2.png" alt="" className="max-h-full" />
        </Link>

        <button onClick={() => setMobileNav(true)} className="md:hidden">
          <FaHamburger />
        </button>
        <ul className="justify-around hidden gap-8 md:flex uppercase tracking-wider font-light">
          <li className="border-b-2 border-transparent hover:border-slate-500">
            <Link to="/home">Home</Link>
          </li>
          <li className="border-b-2 border-transparent hover:border-slate-500">
            <Link to="/products">Products</Link>
          </li>
          <li className="border-b-2 border-transparent hover:border-slate-500">
            <Link to="/demo">About</Link>
          </li>
        </ul>

        <ul className="flex flex-row items-center justify-around gap-4 text-2xl ">
          <li>
            {searchBoxOn ? (
              <div className="w-[25px] text-transparent">o</div>
            ) : (
              <FaSearch onClick={() => dispatch(openSearchBox())} />
            )}
          </li>
          <li className="hover:text-red-600 relative">
            <Link to="/cart">
              <CartIcon />
            </Link>
          </li>

          {isAuthenticated && !loading && user ? (
            <UserOptions user={user} />
          ) : (
            <li className="hover:text-red-600">
              <Link to="/auth">
                <FaUser />
              </Link>
            </li>
          )}
        </ul>

        {mobileNav && (
          <div className="absolute top-0 left-0 z-20 flex w-full h-[100vh] bg-lp">
            <button
              onClick={() => setMobileNav(false)}
              className="fixed text-5xl right-[50px] top-4"
            >
              <FaWindowClose className="text-4xl" />
            </button>
            <ul className="flex flex-col items-center justify-center w-full mt-10 font-semibold gap-y-10 ">
              <li className="font-semibold hover:text-red-600 ">
                <Link to="/home" onClick={() => setMobileNav(false)}>
                  Home
                </Link>
              </li>
              <li className="font-semibold hover:text-red-600">
                <Link to="/products" onClick={() => setMobileNav(false)}>
                  Products
                </Link>
              </li>
              <li className="font-semibold hover:text-red-600">
                <Link to="/" onClick={() => setMobileNav(false)}>
                  About
                </Link>
              </li>

              <li>
                {searchBoxOn ? (
                  <></>
                ) : (
                  <FaSearch
                    onClick={() => dispatch(openSearchBox())}
                    className="text-3xl"
                  />
                )}
              </li>

              <li className="hover:text-red-600">
                <Link to="/auth" onClick={() => setMobileNav(false)}>
                  <FaUser className="text-3xl" />
                </Link>
              </li>
              <li className="hover:text-red-600">
                <Link to="/">
                  <FaShoppingCart className="text-3xl" />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className="h-[10vh] "></div>
      {searchBoxOn && <Searchbox />}
    </>
  );
};

export default Navbar;
