import React, { useState, useEffect } from 'react';
import boy from '../assets/boy.png';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../atoms/userAtom';
import Avatar from './Avatar';
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);
  const [visible, setVisible] = useState();

  const [arrow, setArrow] = useState(false)

  const handleArrow = () => {
    setArrow(!arrow)
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUser(localStorage.getItem("name"));
    if (token) setLoggedIn(true)
    else setLoggedIn(false)
  }, [])
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="px-3 py-4 bg-white shadow-md w-full top-0 fixed z-50">
        <div className="flex justify-between md:justify-start items-center w-full">

          <div className="text-2xl font-bold w-[25%] flex justify-center">
            <img className="w-24 h-16 md:w-32 md:h-20" src={logo} alt="Logo" />
            {/* Rasoi */}
          </div>
          
          <div className="md:hidden flex justify-center items-center space-x-4">
            <button
              onClick={toggleNavbar}
              type="button"
              className="hover:text-gray-500 focus:outline-none focus:text-gray-500"
            >
              <svg
                className="h-8 w-8 mx-3 text-[#489c46] border-2 border-[#489c46] rounded"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center space-x-8 font-poppins font-normal text-xl w-[50%]">
            <Scroll to="Home" className="block px-4 py-2 md:px-6 md:py-3 border-2 border-white hover:border-b-[#59c857] hover:cursor-pointer" smooth duration={500}>
              Home
            </Scroll>
            <Link to="/all-recipes" className="block px-4 py-2 md:px-6 md:py-3 border-2 border-white hover:border-b-[#59c857] hover:cursor-pointer">
              Recipes
            </Link>
            <Scroll to="About" className="block px-4 py-2 md:px-6 md:py-3 border-2 border-white hover:border-b-[#59c857] hover:cursor-pointer" smooth duration={500}>
              About us
            </Scroll>
            <Scroll to="Contact" className="block px-4 py-2 md:px-6 md:py-3 border-2 border-white hover:border-b-[#59c857] hover:cursor-pointer" smooth duration={500}>
              Contact
            </Scroll>
          </div>


          <div className="hidden md:flex justify-center items-center space-x-5 font-poppins font-normal text-xl w-[25%]">

            <div>
              <div className='flex justify-center items-center space-x-1 cursor-pointer' onClick={handleArrow}>
                {
                  loggedIn && user ? <Avatar name={user} />
                    :
                    <div>
                      <img className="w-12 h-12" src={boy} alt="Landing" />
                    </div>
                }

                {
                  arrow ? (
                    <MdOutlineKeyboardArrowUp size={30} />
                  ) : (
                    <MdOutlineKeyboardArrowDown size={30} />
                  )
                }
              </div>

              {
                arrow && (
                  <div className='z-10 absolute mt-2 bg-white shadow-lg rounded-md dropdown w-44 mx-8'>
                    {
                      loggedIn ? (
                        <div className='space-y-5 py-5' style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px' }}>

                          <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'><Link to="/myRecipes">My Recipes</Link></div>
                          <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                            <Link to="/" className="" onClick={() => {
                              localStorage.clear();
                              setLoggedIn(false);
                            }}>
                              Logout
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className='space-y-5 py-5'>
                          <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                            <Link to="/signin" className="">
                              Login
                            </Link>
                          </div>
                          <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                            <Link to="/signup" className="">
                              Signup
                            </Link>
                          </div>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>

          </div>

        </div>


        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <div className="flex flex-col items-center space-y-4 font-poppins font-normal text-xl">
            <Scroll to="Home" className="block px-4 py-2 border-2 border-white hover:border-b-[#68F665]">
              Home
            </Scroll>
            <Link to="/recipes" className="block px-4 py-2 border-2 border-white hover:border-b-[#68F665]">
              Recipes
            </Link>
            <Scroll to="About" className="block px-4 py-2 border-2 border-white hover:border-b-[#68F665]">
              About us
            </Scroll>
            <Scroll to="Contact" className="block px-4 py-2 border-2 border-white hover:border-b-[#68F665]">
              Contact
            </Scroll>

            {
              loggedIn && user ? <Avatar name={user} />
                :
                <div>
                  <img className="w-12 h-12" src={boy} alt="Landing" />
                </div>
            }


            {
              loggedIn ? (
                <div className='flex flex-col items-center space-y-4'>
                  <div className='block px-4 py-2 border-2 border-white hover:border-b-[#68F665]'>My Recipes</div>
                  <div className='block px-4 py-2 border-2 border-white hover:border-b-[#68F665]'>
                    <Link to="/" className="" onClick={() => {
                      localStorage.clear();
                      setLoggedIn(false);
                    }}>
                      Logout
                    </Link>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col items-center space-y-4 '>
                  <div className='block px-4 py-2 border-2 border-white hover:border-b-[#68F665]'>

                    <Link to="/signin" className="">
                      Login
                    </Link>
                  </div>

                  <div className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                    <Link to="/signup" className="">
                      Signup
                    </Link>
                  </div>

                </div>
              )
            }

          </div>
        </div>
      </nav>


    </>
  );
};

function Dropdown() {
  return (
    <>

      {
        loggedIn ? <Link to="/" className="" onClick={() => {
          localStorage.clear();
          setLoggedIn(false);
        }}>
          Logout
        </Link> : <Link to="/signin" className="">
          Login
        </Link>
      }
    </>

  )
}

export default Navbar;
