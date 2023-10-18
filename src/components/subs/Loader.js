import React from "react";

const Loader = () => {
  return (
    <div className="absolute top-0 left-0 grid w-full h-[100vh] place-items-center">
      <p className="border-[5px] h-[100px] w-[100px] border-b-0 border-l-0 animate-spin rounded-full border-black"></p>
    </div>
  );
};

export default Loader;
