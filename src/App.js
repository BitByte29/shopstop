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
import { setApiKey, updateCategories } from "./App/features/variablesSlice";
import { getUserDetails } from "./App/features/userSlice";
import Profile from "./components/Account/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import EditProfile from "./components/Account/EditProfile";
import Shipping from "./components/Cart/Shipping";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Cart from "./components/Cart/Cart";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Success from "./components/Cart/Success";

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

  const getStripeApi = async () => {
    const res = await axios.get("http://localhost:3001/api/v1/stripeapikey");
    dispatch(setApiKey(res.data.stripeApiKey));
  };
  const { isAuthenticated, user, loading } = useSelector((s) => s.users);

  const dispatch = useDispatch();
  useEffect(() => {
    getStripeApi();
    if (isAuthenticated && !user) {
      dispatch(getUserDetails());
    }
    dispatch(updateCategories(category));
    dispatch(getAllProducts());
    // eslint-disable-next-line
  }, [dispatch, isAuthenticated, loading]);

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

          <Route path="/*" element={<div>Page not found</div>} />
        </Routes>
        {/* </div> */}

        <Footer />
        <ToastContainer
          position="bottom-left"
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
