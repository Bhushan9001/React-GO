import React from 'react'

function CardSkeleton() {
  return (
    <>
      <div className='m-7 p-5 rounded-lg hover:cursor-pointer card animate-pulse border-gray-200  ' style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px', transition: 'box-shadow 0.3s' }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.4) 0px 24px 50px -12px'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px'}>
        <div className='grid grid-cols-1 gap-3 space-y-5 py-5 px-10'>
          <div className='flex justify-center bg-gray-300 rounded px-20 py-10'>
            {/* <img className='rounded-[3%] w-48 h-40' /> */}
            <svg className=" w-16 h-16 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          
          <div className='md:flex space-x-10 justify-center'>
          <div className='h-2 bg-gray-200 rounded-full w-20' style={{ fontWeight: '100' }}></div>
          <div className='h-2 bg-gray-200 rounded-full w-20' style={{ fontWeight: '100' }}></div>
          </div>
          <div className='flex justify-center'>
          <div className='h-2 bg-gray-200 rounded-full w-40 justify-center' style={{ fontWeight: '100' }}></div>
          </div>
          
        </div>
      </div>
    </>

  )
}

export default CardSkeleton
