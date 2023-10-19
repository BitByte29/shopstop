import React, { useEffect, useState } from "react";

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  return (
    <div className="h-[80vh] bg-red-300  flex items-center justify-center">
      <div className="h-[400px] w-[300px] bg-white flex flex-col">
        <div className="flex ">
          <button
            className="py-2 border-b-2 w-[50%]"
            onClick={() => setIsLoginPage(true)}
          >
            Login
          </button>
          <button
            className="py-2 border-b-2 w-[50%] bg-yellow-400"
            onClick={() => setIsLoginPage(false)}
          >
            SignUps
          </button>
        </div>
        <div
          className={`min-w-full bg-orange-600 ${
            isLoginPage ? "" : "-translate-x-[100%]"
          } transition-all h-full w-full flex overflow-x-visible`}
        >
          <form action="" className="min-w-[300px] bg-orange-300">
            Login
          </form>
          <form action="" className="min-w-[300px] bg-yellow-300">
            Signup
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
