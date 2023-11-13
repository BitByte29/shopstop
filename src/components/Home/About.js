import Metadata from "../layout/Metadata";
import React from "react";
import { FaRegPaperPlane } from "react-icons/fa6";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-lg text-gray-700 flex items-center justify-center min-h-[90vh] gap-10 flex-col md:flex-row">
      <Metadata title={`About`} />
      <section className="mb-8 md:w-1/2 w-full flex-center text-center">
        <h2 className="text-3xl font-semibold mb-4">Welcome to ShopStop</h2>
        <p className="text-lg text-center">
          Discover a world of endless possibilities with our curated selection
          of products.
        </p>
        <Link
          to="/"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Explore Now
        </Link>
      </section>

      <section className="flex items-center justify-center flex-col">
        <div className="flex-center md:-mt-10 ">
          <span className="text-6xl ">
            <FaRegPaperPlane />
          </span>

          <h3 className="text-xl font-semibold">Get in Touch</h3>
        </div>

        <div className="text-center">
          <p className="text-lg">Have questions or need assistance?</p>
          <p className="text-lg">
            Contact us at:{" "}
            <span className="font-bold">shopstophelper@gmail.com</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
