import React, { useEffect, useState } from 'react';
import landingImage from '../assets/new.png';
import landingBg from '../assets/landingBg.png';
import { Link } from 'react-router-dom';

const Landing = () => {

   
    return (
        <>

            <div className='pt-16 md:flex w-full justify-center items-center' name="Home">

                <div className='w-full md:w-1/2 flex justify-center p-7 '>
                    <div className='bg-[#9BFB99] w-36 md:w-44 h-60 md:h-72 animate__animated animate__rotateInDownLeft'></div>
                    <img className='w-60 md:w-72 h-64 md:h-80 -ml-12 md:-ml-24 mt-8 z-20 animate__animated animate__slideInDown' src={landingImage} alt='Landing' />
                    <div className='bg-[#B6B8B6] w-40 md:w-52 h-40 md:h-52 -ml-20 md:-ml-32 mt-48 -z-0 md:animate__animated md:animate__rotateInDownRight'></div>
                </div>

                <div className='w-full md:w-1/2 pt-8 md:pt-48 pb-8 md:pb-48 px-4 md:pr-60 text-center md:text-left'>
                    <div className='text-4xl md:text-6xl font-semibold pb-6 md:pb-10 font-barlow-condensed md:animate__animated md:animate__fadeInRight'>
                        The secret ingredient is always love.
                    </div>
                    <div className='font-poppins font-normal text-sm md:text-xl'>
                        From family heirloom recipes to modern culinary innovations, discover dishes made with love and care. Add your own recipes and be part of a community that celebrates the art of cooking.
                    </div>
                    <div className='flex justify-center items-center md:block'>
                        <button className='bg-[#68F665] px-6 md:px-10 py-3 md:py-4 font-medium font-poppins mt-5 md:mt-7 rounded-full'>
                            <Link to="/recipes">Explore Now</Link>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Landing;
