import React, { useState } from "react";

import { TbTournament } from "react-icons/tb";
import { BiRename } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { AiFillDatabase } from "react-icons/ai";
import { MdDescription } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../App/features/adminSlice";

const AddProduct = () => {
  const { loading } = useSelector((s) => s.admin);
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
  const [uploading, setuploading] = useState(false);
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
    console.log(product);
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
            className={` bg-cyan-400/70 shadow-2xl transition-all py-12 flex-center`}
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="input-div w-[300px]">
              <BiRename />
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                required
                onChange={handleDataChange}
              />
            </div>

            <div className="input-div w-[300px]">
              <MdDescription />
              <input
                type="text"
                placeholder="Description"
                name="description"
                required
                onChange={handleDataChange}
              />
            </div>

            <div className="input-div w-[300px]">
              <FaRupeeSign />
              <input
                type="number"
                placeholder="Price"
                name="price"
                required
                onChange={handleDataChange}
              />
            </div>
            <div className="input-div w-[300px]">
              <TbTournament />
              <select
                className="focus:outline-none"
                name="category"
                id=""
                placeholder=""
                required
                onChange={handleDataChange}
              >
                <option onChange={handleDataChange}>Select Category</option>
                {categoryList.map((cat) => {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="input-div w-[300px]">
              <AiFillDatabase />
              <input
                type="number"
                placeholder="Stock"
                name="stock"
                required
                onChange={handleDataChange}
              />
            </div>

            <div id="productImages " className="p-0">
              <input
                type="file"
                name="images"
                accept="image/*"
                className="bg-white flex-col w-[300px]"
                multiple
                onChange={imageDataChange}
              />
            </div>

            <button
              type="submit"
              className={`px-3 py-3 w-[200px] bg-slate-100`}
            >
              Create Product
            </button>
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
