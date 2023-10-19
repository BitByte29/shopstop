import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Home, Footer, Products, ProductPage } from "./components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllProducts } from "./App/features/productSlice";
import { updateCategories } from "./App/features/variablesSlice";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(updateCategories(category));
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

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
