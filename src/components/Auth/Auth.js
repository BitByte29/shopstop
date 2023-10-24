import React, { useEffect, useState } from "react";
import { FaEnvelope, FaKey, FaUser } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import "./authStyle.css";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../App/features/userSlice";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, accountCreated } = useSelector((s) => s.users);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [pType, setpType] = useState("password");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [forgotPasswordPrompt, setforgotPasswordPrompt] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/user.jpg");
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: loginEmail, password: loginPass }));
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    if (avatar) {
      myForm.set("avatar", avatar);
    }
    dispatch(registerUser(myForm));
    setUser({
      name: "",
      email: "",
      password: "",
    });
    setIsLoginPage(true);
    navigate("/auth");
  };
  const registerDataChange = (e) => {
    console.log("data change");
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      //When files are uploaded they are done in a array as there can be many files so the 0 says the first file
      //When the avatar is changed we will read the uploaded file using filereader
      //using the filereader instance (reader) we will read the
      //ReadAsDataURL makes a url which can be used to view it on browser
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    setIsLoginPage(true);

    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <div className="h-[90vh] flex items-center justify-center">
      {forgotPasswordPrompt && (
        <ForgotPassword setforgotPasswordPrompt={setforgotPasswordPrompt} />
      )}
      <div className="h-[400px] w-[300px] bg-white flex flex-col">
        <div className="flex">
          <button
            className="py-2 bg-cyan-500 w-[50%] uppercase font-semibold"
            onClick={() => setIsLoginPage(true)}
          >
            Login
          </button>
          <button
            className="py-2  bg-yellow-300 w-[50%] uppercase font-semibold"
            onClick={() => setIsLoginPage(false)}
          >
            Sign up
          </button>
        </div>
        <div
          className={`min-w-full bg-white flex h-full w-full overflow-hidden`}
        >
          <form
            action=""
            className={`min-w-full bg-cyan-500 ${
              isLoginPage ? "" : "-translate-x-[100%]"
            } transition-all auth`}
            onSubmit={loginSubmit}
          >
            <div className="input-div">
              <FaEnvelope />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={loginEmail}
                required
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="input-div">
              <FaKey />
              <input
                type={pType}
                placeholder="Password"
                name="password"
                value={loginPass}
                required
                onChange={(e) => setLoginPass(e.target.value)}
              />
              <IoIosEye
                className={`absolute cursor-pointer right-4 ${
                  pType === "text" ? "" : "hidden"
                }`}
                onClick={() => setpType("password")}
              />
              <IoIosEyeOff
                className={`absolute cursor-pointer right-4 ${
                  pType === "text" ? "hidden" : ""
                }`}
                onClick={() => setpType("text")}
              />
            </div>

            {/* <Link to="/forgotpassword">Forgot Password</Link> */}
            <button type="submit">Login</button>

            <div className="text-center">
              <span
                className="text-right text-blue-800 underline cursor-pointer"
                onClick={() => setforgotPasswordPrompt(true)}
              >
                Forget Password?
              </span>

              <p>
                Create an account?{" "}
                <span onClick={() => setIsLoginPage(false)}>Signup</span>
              </p>
            </div>
          </form>

          {/* _____SignUp____ */}
          <form
            action=""
            className={`min-w-full bg-yellow-300 ${
              isLoginPage ? "" : "-translate-x-[100%]"
            } transition-all auth`}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="input-div">
              <FaUser />
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                value={user.name}
                onChange={registerDataChange}
              />
            </div>
            <div className="input-div">
              <FaEnvelope />
              <input
                type="text"
                placeholder="Email"
                name="email"
                required
                value={user.email}
                onChange={registerDataChange}
              />
            </div>
            <div className="input-div">
              <FaKey />
              <input
                type={pType}
                placeholder="Password"
                name="password"
                required
                value={user.password}
                onChange={registerDataChange}
              />
              <IoIosEye
                className={`absolute cursor-pointer right-4 ${
                  pType === "text" ? "" : "hidden"
                }`}
                onClick={() => setpType("password")}
              />
              <IoIosEyeOff
                className={`absolute cursor-pointer right-4 ${
                  pType === "text" ? "hidden" : ""
                }`}
                onClick={() => setpType("text")}
              />
            </div>

            <div id="registerImage" className="p-0">
              <img src={avatarPreview} alt="" className="rounded-full" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>

            <button>Signup</button>

            <p>
              Already a user?{" "}
              <span onClick={() => setIsLoginPage(true)}>Login</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
