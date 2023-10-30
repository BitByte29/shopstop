import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl text-red-600 font-extrabold">404</h1>
        <p className="text-2xl text-gray-700 font-semibold">Page Not Found</p>
        <p className="text-lg text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="text-cyan-600 hover:underline mt-4">
          Go back to the home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
