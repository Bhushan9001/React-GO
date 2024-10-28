import React from 'react'

const DetailsSkeleton = () => {
    return (
        <div className='animate-pulse'>
            <div className='md:flex w-full '>

                <div className='px-6 md:px-12 pt-4 pb-7 w-full md:w-2/6'>

                    <div class="h-5 bg-gray-300 rounded-full w-52 mb-4 my-9"></div>

                    <div className='text-3xl font-barlow-condensed font-normal py-4 flex space-x-4'>
                        <div class="h-4 bg-gray-300 rounded-full w-44 mb-4"></div>
                        <div class="h-4 bg-gray-300 rounded-full w-44 mb-4"></div>
                    </div>

                    <div class="h-3 bg-gray-300 rounded-full w-[95%] mb-3 mt-2"></div>
                    <div class="h-3 bg-gray-300 rounded-full w-[65%] mb-6"></div>


                    <div class="flex items-center justify-center w-96 md:w-[95%] h-60 md:h-96 bg-gray-300 rounded sm:w-96 dark:bg-gray-300">
                        <svg class="w-12 h-12 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>

                </div>

                <div className='px-6 md:px-0 py-7 w-full md:w-4/6'>
                    <div>
                        <div class="h-5 bg-gray-300 rounded-full w-52 mb-4 my-9"></div>
                        <div className='py-4 px-4'>

                            <div className='flex space-x-5 my-4'>
                                <div className='w-32 bg-gray-300 h-3 rounded-full'></div>
                                <div className='w-32 bg-gray-300 h-3 rounded-full'></div>
                            </div>
                            <div className='flex space-x-5 my-4'>
                                <div className='w-32 bg-gray-300 h-3 rounded-full'></div>
                                <div className='w-32 bg-gray-300 h-3 rounded-full'></div>
                            </div>
                            <div className='flex space-x-5 my-4'>
                                <div className='w-32 bg-gray-300 h-3 rounded-full'></div>
                                <div className='w-32 bg-gray-300 h-3 rounded-full'></div>
                            </div>

                        </div>
                    </div>

                    <div className='pe-0 md:pe-24'>
                        <div class="h-5 bg-gray-300 rounded-full w-52 mb-4 my-9"></div>

                        <div className='m-6 p-6 rounded-lg border-2 border-gray-300 text-xl font-poppins font-normal'>
                            <div class="w-full">
                                <div class="h-3 bg-gray-300 rounded-full w-48 mb-3"></div>
                                <div class="h-3 bg-gray-300 rounded-full w-[50%] mb-3"></div>
                                <div class="h-3 bg-gray-300 rounded-full w-[40%] mb-3"></div>
                                <div class="h-3 bg-gray-300 rounded-full w-[70%] mb-3"></div>
                                <div class="h-3 bg-gray-300 rounded-full w-[80%] mb-3"></div>
                                <div class="h-3 bg-gray-300 rounded-full w-[30%] mb-3"></div>
                                <div class="h-3 bg-gray-300 rounded-full w-[75%] mb-3"></div>
                            </div>
                        </div>

                        <div className='md:flex justify-between px-7 items-center'>

                            <div class="h-10 bg-gray-300 rounded-full w-60 mb-4"></div>

                            <div className='flex flex-col items-end h-20 w-[50%]'>
                                <div className='h-3 bg-gray-300 rounded-full mb-3 w-[30%]'></div>
                                <div className='h-3 bg-gray-300 rounded-full mb-3 w-[20%]'></div>
                            </div>

                        </div>

                    </div>
                </div>


            </div>

            <div className='px-10 md:px-24'>
                <div class="h-5 bg-gray-300 rounded-full w-52 mb-4 my-9"></div>

                <div className='pt-3 pb-3 flex flex-col space-y-2'>
                    <div className='flex space-x-4 items-center'>
                        <svg class="w-12 h-12 me-3 text-gray-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <div class="h-7 bg-gray-300 rounded-full w-[60%]"></div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default DetailsSkeleton