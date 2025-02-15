import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputElement from "../components/InputElement";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const notify = () => {
    toast.error('Error while Signing up!!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  }
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(axios.post(`/users/signup`, {
        name: name,
        email: email,
        password: password,
      }), {
        pending: 'Signing Up',
        success: 'Successfully Signed up!!',
        error: 'Error while Signing up!!'
      })
      if (response) {
        console.log(response);
        alert("User Created");
        navigate("/signin");
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
          <form className="space-y-6" action="#" onSubmit={signUp}>
            <h5 className="text-xl font-medium text-gray-900 ">
              Signup in to our platform
            </h5>
            <InputElement
              onChange={handleNameChange}
              placeholder="Enter Your Full Name"
              type="text"
              label="Your name"
            />
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

            <button
              type="submit"
              className="w-full text-white bg-green-500 hover:bg-black/50 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Create your account
            </button>
            <div className="text-sm font-medium text-gray-500 ">
              Already registered?{" "}
              <a href="/signin" className="text-black hover:underline ">
                Go to signin page
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
