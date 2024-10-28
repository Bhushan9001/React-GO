import React from 'react'
import palak from '../assets/palak.jpg';
import tiramisu from '../assets/tiramisu.jpg';
import french from '../assets/french.avif';
import chinese from '../assets/chinese.jpg';

const Categories = () => {
    return (
        <>
            <div className='text-5xl font-semibold font-barlow-condensed text-center pb-8 pt-20' name="Categories">
                Popular Categories
            </div>
            
            <div className='md:flex justify-center'>
                <div className='md:flex categories-left'>
                    <div className='p-10 flex flex-col justify-center items-center space-y-6'>
                        <img src={palak} className='w-56 h-52 rounded-lg' style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} />
                        <div className='text-4xl font-barlow-condensed font-semibold'>Indian</div>
                    </div>

                    <div className='p-10 flex flex-col justify-center items-center space-y-6'>
                        <img src={tiramisu} className='w-56 h-52 rounded-lg' style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} />
                        <div className='text-4xl font-barlow-condensed font-semibold'>Italian</div>
                    </div>
                </div>

                <div className='md:flex categories-right'>
                    <div className='p-10 flex flex-col justify-center items-center space-y-6'>
                        <img src={french} className='w-56 h-52 rounded-lg' style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} />
                        <div className='text-4xl font-barlow-condensed font-semibold'>French</div>
                    </div>

                    <div className='p-10 flex flex-col justify-center items-center space-y-6'>
                        <img src={chinese} className='w-56 h-52 rounded-lg' style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' }} />
                        <div className='text-4xl font-barlow-condensed font-semibold'>Chinese</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories