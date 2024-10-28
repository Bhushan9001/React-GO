import React from 'react'

const Contact = () => {

    const sendEmail = () => {
        console.log("Submit");
    };

    return (
        <div className='' name="Contact">

            <div className='flex space-x-4 justify-center mb-2 md:my-4 pt-28 md:pt-32 pb-5 md:pb-8'>
                <div className='text-5xl font-barlow-condensed font-semibold'>Get In Touch</div>
            </div>


            <div className='py-6'>

                <form onSubmit={sendEmail} className='flex flex-col items-center' >

                    <input className='my-3 py-3 font-poppins text-xl border-2 rounded-lg border-[#59c857] px-4 outline-none w-[70%] md:w-[50%]' type='text' placeholder='Enter your name' required />

                    <input className='my-3 py-3 font-poppins text-xl border-2 rounded-lg border-[#59c857] px-4 outline-none w-[70%] md:w-[50%]' type='email' placeholder='Enter your Email' required />


                    <textarea className='my-3 py-3 font-poppins text-xl border-2 rounded-lg border-[#59c857] px-4 outline-none w-[70%] md:w-[50%]' placeholder='Enter your message' required rows={6}></textarea>

                    <button type='submit' className='bg-[#68F665] px-6 md:px-10 py-3 md:py-4 font-medium font-poppins mt-5 md:mt-7 rounded-lg'>
                        Submit
                    </button>

                </form>
            </div>



        </div>
    )
}

export default Contact