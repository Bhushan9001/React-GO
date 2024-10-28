import React from 'react'
import logo from '../assets/logo.png';
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <div className='bg-[#9bfc99] font-barlow-condensed px-6 mt-10'>
            <div className='md:flex pt-10 pb-24 border-b border-[#808080]'>

                <div className='w-full md:w-1/3 flex flex-col'>
                    <img className="w-24 h-16 md:w-32 md:h-20" src={logo} alt="Logo" />
                    <div className='py-2 ps-5 text-xl pe-44'>
                        {/* Rasoi is a premier recipe website dedicated to providing easy-to-follow, delicious, and nutritious recipes. It aims to inspire home cooks of all levels with a variety of dishes, from classic comfort foods to modern culinary twists, ensuring there's something for everyone. */}

                        Rasoi is a premier recipe website offering easy-to-follow, delicious, and nutritious recipes for home cooks of all levels.
                    </div>
                </div>

                <div className='w-full md:w-2/3 flex justify-evenly pt-4 md:pt-0'>
                    <div className='px-4'>
                        <div className='text-2xl'>Navigation</div>
                        <div className='flex flex-col space-y-0 text-xl pt-4'>
                            <div><Link to="/">Home</Link></div>
                            <div><Link to="/recipes">Recipes</Link></div>
                            <div><Link to="/">About us</Link></div>
                            <div><Link to="/">Contact</Link></div>
                        </div>
                    </div>

                    <div className='px-4'>
                        <div className='text-2xl'>Getting Started</div>
                        <div className='flex flex-col text-xl pt-4'>
                            <div><Link to="/signin">Login</Link></div>
                            <div><Link to="/signup">Sign up</Link></div>
                            <div>Forgot Password</div>
                        </div>
                    </div>

                    <div className='px-4'>
                        <div className='text-2xl'>Social</div>
                        <div className='flex text-xl pt-4 space-x-1'>
                            <FaFacebookF size={25} className='hover:cursor-pointer' />
                            <IoLogoInstagram size={25} className='hover:cursor-pointer' />
                            <FaXTwitter size={25} className='hover:cursor-pointer' />
                        </div>
                    </div>
                </div>

            </div>

            <div className='md:flex pb-6 pt-5'>
                <div className='w-full md:w-1/3 ps-5'>
                    Copyright @ 2024 Rasoi. All rights reserved.
                </div>

                <div className='w-full md:w-2/3 flex md:justify-evenly ps-5 md:ps-96 space-x-4 pt-2 md:pt-0'>
                    <div>Privacy Policy</div>
                    <div>Terms of Services</div>
                </div>
            </div>

        </div>
    )
}

export default Footer
