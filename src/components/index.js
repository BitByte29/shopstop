import Footer from "./layout/Footer";
import Home from "./Home/Home";
import Navbar from "./layout/Navbar";
import Products from "./Products/Products";
import ProductPage from "./Products/ProductPage";
import Auth from "./Auth/Auth";
import axios from "axios";

axios.defaults.withCredentials = true;

export { Navbar, Home, Footer, Products, ProductPage, Auth };
