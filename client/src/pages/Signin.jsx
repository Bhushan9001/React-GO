import InputElement from "../components/InputElement";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(axios.post(`/users/login`, {
        email: email,
        password: password,
      }), {
        pending: 'User Signing in!!',
        success: 'User Signin Successfull!!',
        error: 'Error while log in!!'
      }, 
      { theme: "dark",
        autoClose: 2000 });
      if (response) {
        console.log(response)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.user.name);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer transition={Bounce} />
      <div className="h-screen flex items-center justify-center bg-white/50">
        <div className="w-full  max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
          <form className="space-y-6" action="#" onSubmit={login}>
            <h5 className="text-xl font-medium text-gray-900 ">
              Sign in to our platform
            </h5>
            <InputElement
              onChange={handleEmailChange}
              placeholder="name@ternaengg.ac.in"
              type="email"
              label="Your email"
            />
            <InputElement
              onChange={handlePasswordChange}
              placeholder="••••••••"
              type="password"
              label="Your password"
            />

            <div className="flex items-start">
              <a
                href="#"
                className="ms-auto text-sm text-black  hover:underline "
              >
                Lost Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-500 hover:bg-black/50 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Login to your account
            </button>
            <div className="text-sm font-medium text-gray-500 ">
              Not registered?{" "}
              <a href="/signup" className="text-black hover:underline ">
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
