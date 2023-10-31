import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import {
  Navbar,
  Home,
  Footer,
  Products,
  ProductPage,
  Auth,
} from "./components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "./App/features/productSlice";
import { updateCategories } from "./App/features/variablesSlice";
import { getUserDetails } from "./App/features/userSlice";
import Profile from "./components/Account/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import Shipping from "./components/Cart/Shipping";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Cart from "./components/Cart/Cart";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Success from "./components/Cart/Success";
import Orders from "./components/Account/Orders";
import Dashboard from "./components/Admin/Dashboard";

import NotFound from "./components/subs/NotFound";
import MyOrders from "./components/Auth/myOrders";
import About from "./components/Home/About";

function App() {
  const category = [
    "Mobile",
    "Laptop",
    "Computer",
    "Gaming",
    "Audio",
    "TV",
    "Accessories",
    "All",
  ];

  const { isAuthenticated, user, loading } = useSelector((s) => s.users);
  const { data } = useSelector((s) => s.products);
  const { categories } = useSelector((s) => s.vars);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUserDetails());
    }
    if (categories.length === 0) {
      dispatch(updateCategories(category));
    }
    if (!data) {
      dispatch(getAllProducts());
    }
    // eslint-disable-next-line
  }, [dispatch, isAuthenticated]);

  return (
    <div>
      <Router>
        <Navbar />
        {/* <div className="min-h-[100vh]"> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />

          <Route
            path="/profile"
            element={<ProtectedRoute element={Profile} />}
          />
          <Route
            path="/shipping"
            element={<ProtectedRoute element={Shipping} />}
          />
          <Route
            path="/confirmorder"
            element={<ProtectedRoute element={ConfirmOrder} />}
          />
          <Route
            path="/myorders"
            element={<ProtectedRoute element={Orders} />}
          />
          <Route
            path="/orders/:id"
            element={<ProtectedRoute element={MyOrders} />}
          />

          <Route
            path="/admin/dashboard"
            isAdmin={true}
            element={<ProtectedRoute element={Dashboard} />}
          />
          {/* <Route path="/*" element={<div>Page not found</div>} /> */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        {/* </div> */}

        <Footer />
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
}

export default App;
