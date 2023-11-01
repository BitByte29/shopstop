import React, { useState } from "react";

import { TbTournament } from "react-icons/tb";
import { BiRename } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { MdDescription } from "react-icons/md";

import { useDispatch } from "react-redux";
import { createProduct } from "../../App/features/adminSlice";
import { toast } from "react-toastify";

const AddProduct = ({ role }) => {
  // const { loading } = useSelector((s) => s.admin);
  const categoryList = [
    "Mobile",
    "Laptop",
    "Computer",
    "Gaming",
    "Audio",
    "TV",
    "Accessories",
    "All",
  ];
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagesPreviews] = useState([]);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // setuploading(true);
    const myForm = new FormData();
    myForm.set("name", product.name);
    myForm.set("price", product.price);
    myForm.set("stock", product.stock);
    myForm.set("category", product.category);
    myForm.set("description", product.description);
    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };
  const handleDataChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    // console.log(product);
  };

  const imageDataChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreviews([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImages((old) => [...old, reader.result]);
        setImagesPreviews((old) => [...old, reader.result]);
      };
    });
  };

  return (
    <>
      <h1 className="text-center text-4xl font-semibold  text-slate-700 py-12">
        Create Product
      </h1>
      <div className="flex flex-col md:flex-row gap-2 h-auto items-center">
        <div className="md:w-1/2 w-full">
          <form
            action=""
            className="bg-slate-200 rounded-lg shadow-lg p-6 space-y-4"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            {/* Product Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700">
                Product Name
              </label>
              <div className="flex items-center border border-gray-300 p-2 rounded-md focus:outline-none bg-white  focus:border-cyan-400">
                <BiRename className="text-gray-500 mr-2" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full h-full text-lg  focus:outline-none"
                  required
                  onChange={handleDataChange}
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-gray-700">
                Description
              </label>
              <div className="flex items-start border border-gray-300 p-2 rounded-md focus:outline-none bg-white focus:border-cyan-400">
                <MdDescription className="text-gray-500 mr-2" />
                <textarea
                  id="description"
                  name="description"
                  className="w-full h-full text-lg  focus:outline-none"
                  required
                  onChange={handleDataChange}
                  rows="3"
                />
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label htmlFor="price" className="text-gray-700">
                Price (in Rupees)
              </label>
              <div className="flex items-center border border-gray-300 p-2 rounded-md focus:outline-none bg-white focus:border-cyan-400">
                <FaRupeeSign className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="w-full h-full text-lg  focus:outline-none"
                  required
                  onChange={handleDataChange}
                />
              </div>
            </div>

            {/* Stock */}
            <div className="flex flex-col">
              <label htmlFor="stock" className="text-gray-700">
                Stock
              </label>
              <div className="flex items-center border border-gray-300 p-2 rounded-md focus:outline-none bg-white focus:border-cyan-400">
                <AiFillDatabase className="text-gray-500 mr-2" />
                <input
                  type="number"
                  id="stock"
                  className="w-full h-full text-lg  focus:outline-none"
                  name="stock"
                  required
                  onChange={handleDataChange}
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-gray-700">
                Category
              </label>
              <div className="flex items-center border border-gray-300 p-2 rounded-md focus:outline-none bg-white focus:border-cyan-400">
                <TbTournament className="text-gray-500 mr-2" />
                <select
                  id="category"
                  name="category"
                  className="w-full h-full text-lg  focus:outline-none"
                  required
                  onChange={handleDataChange}
                >
                  <option value="">Select Category</option>
                  {categoryList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Images */}
            <div className="flex flex-col">
              <label htmlFor="images" className="text-gray-700">
                Product Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={imageDataChange}
              />
            </div>

            {/* Create Product Button */}
            {role === "admin" ? (
              <button
                type="submit"
                className="bg-cyan-400 text-white py-2 rounded-md px-3  hover:bg-cyan-500 transition-colors"
              >
                Create Product
              </button>
            ) : (
              <button
                onClick={() =>
                  toast.warning("visitor's not allowed this action.")
                }
                className="bg-cyan-400 text-white py-2 rounded-md px-3  hover:bg-cyan-500 transition-colors"
              >
                Create Product
              </button>
            )}
          </form>
        </div>

        <div className="w-full md:w-1/2">
          {images.length > 0 ? (
            <div className="flex flex-wrap gap-x-5 gap-y-5 p-5 justify-center max-h-[60vh]  overflow-y-scroll relative">
              {imagePreviews.map((img) => {
                return (
                  <div className="hover:fixed hover:w-[400px] hover:h-[400px] w-[200px] top-[200px] border-2 border-black h-[200px] bg-white">
                    <img
                      key={img}
                      src={img}
                      className="h-full w-full hover:z-30 hover:scale-110 hover:border-2 hover:border-black transition-all"
                      alt="the products"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-4xl font-semibold  text-slate-700 py-12">
              Images will appear here.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddProduct;
