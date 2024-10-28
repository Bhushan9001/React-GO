import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = (props) => {
    const navigate = useNavigate();
    // console.log(props)
    // const imageurl = `${import.meta.env.VITE_BACKEND}${props.img}`;

    return (
        <>
            <div className='m-7 p-6 rounded-lg hover:cursor-pointer card ' style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px', transition: 'box-shadow 0.3s' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 24px 50px -12px'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px'}
                onClick={()=>{navigate(`/recipes/${props.id}`,{state:props.from})}}>
                <div className='grid grid-cols-1 gap-3'>
                    <div className='flex justify-center'>
                        <img className='rounded-[3%] w-60 h-40' src = {props.img} alt={props.title} />
                    </div>
                    <div className='flex justify-center items-center py-3 space-x-2'>
                        <div className='text-3xl font-barlow-condensed font-medium text-[#428C41] text-center w-48 truncate text-wrap'>{props.title}</div>
                        <div className='bg-[#68F665] px-3 py-2 rounded-full font-poppins inline-block mt-2 text-center w-28 truncate'>{props.cuisine}</div>
                    </div>
                    <div className='font-ubuntu italic text-center' style={{ fontWeight: '100' }}>
                        By {props.chef}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card