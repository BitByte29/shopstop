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
import Account from "./components/Account/Account";
import Profile from "./components/Account/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import EditProfile from "./components/Account/EditProfile";

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

  const { isAuthenticated, user } = useSelector((s) => s.users);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(getUserDetails());
    }
    dispatch(updateCategories(category));
    dispatch(getAllProducts());
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
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Home />} />
          {/* <ProtectedRoute path="/account" element={<Profile />} /> */}
          <Route
            path="/account"
            element={<ProtectedRoute element={Profile} />}
          />

          <Route path="/*" element={<div>Page not found</div>} />
        </Routes>
        {/* </div> */}

        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
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
