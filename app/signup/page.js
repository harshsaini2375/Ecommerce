import React from 'react'
import Navbar from '../Components/Navbar'
import Image from 'next/image'
import Footer from '../Components/Footer'
import Link from 'next/link'

const page = () => {
    return (
        <div>
            <Navbar />
            <div className="main flex flex-col md:flex-row mt-5 mb-20 md:my-20 w-[90vw] justify-self-center  md:w-[70vw] h-fit md:h-[62vh] ">
                <div className="left relative w-full md:w-1/2 h-80 md:h-full">
                    <Image src={"/loginpage.svg"} alt='login image' fill={true} className='object-cover' />
                </div>
                <div className="right mt-5 md:mt-0 w-full md:w-1/2 h-fit md:h-full flex flex-col justify-center items-center">
                    <div className="loginbypassword space-y-5">
                        <div className="intro space-y-1">
                            <h1 className='font-light text-3xl'>Create an account</h1>
                            <span className='text-sm'>Enter your details below</span>
                        </div>

                        <input type="text" className='outline-gray-500  md:w-[17vw] border-b-2 block rounded-sm border-gray-300 px-2 py-1 my-2' placeholder='Name' />
                        <input type="Email" className='outline-gray-500  md:w-[17vw] border-b-2 block rounded-sm border-gray-300 px-2 py-1 my-2' placeholder='Email' />
                        <input type="password" className='outline-gray-500  md:w-[17vw] border-b-2 rounded-sm border-gray-300 px-2 py-1 ' placeholder='Password' />
                    </div>

                    <button className=' py-1 bg-[#db4444] w-[35vw] md:w-[17vw] text-white rounded-sm my-4'>Create Account</button>

                    <div className="already text-sm space-x-2">
                        <span className='text-gray-500'>Already have account?</span>
                       <Link href={"/login"}> <button className='cursor-pointer'>Log in</button> </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
