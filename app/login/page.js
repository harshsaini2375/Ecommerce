"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import Image from 'next/image'
import Footer from '../Components/Footer'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

const page = () => {

  const { data: session } = useSession()
  const router = useRouter();


    useEffect(() => {

        if (session) {
            router.push(`/`)
           
        }
        

    }, [ session])


  return (
    <div>
      <Navbar />
      <div className="main justify-self-center flex flex-col md:flex-row mb-20 md:my-20 w-[90vw] md:w-[70vw] h-fit md:h-[62vh]  ">
        <div className="left relative w-full md:w-1/2 h-80 md:h-full">
            <Image src={"/loginpage.svg"} alt='login image' fill={true} className='object-cover' />
        </div>
        <div className="right mt-5 md:mt-0 w-full md:w-1/2 h-fit md:h-full flex flex-col justify-center items-center">
        <div className="loginbypassword space-y-5">
        <div className="intro space-y-1">
        <h1 className='font-light text-3xl'>Log in To Exclusive</h1>
        <span className='text-sm'>Enter your details below</span>
        </div>

        <input type="Email" className='outline-gray-500 md:w-[17vw] border-b-2 block rounded-sm border-gray-300 px-2 py-1 my-2' placeholder='Enter Your Email'/>
        <input type="password" className='outline-gray-500 md:w-[17vw] border-b-2 rounded-sm border-gray-300 px-2 py-1 ' placeholder='Enter Your Password'/>
        </div>

        <button className='cursor-pointer py-1 bg-[#db4444]  w-[35vw] md:w-[17vw] text-white rounded-sm mt-4'>Log in</button>
        <div className="mt-4 w-[80vw] md:w-[17vw]">
                        <a href="#" className="block">
                            <button onClick={() => {signIn("google") } } className="w-full cursor-pointer text-center py-2 my-3 border flex items-center justify-center px-2 rounded-lg text-slate-700 bg-white border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                                <Image width={20} height={20}  src="https://www.svgrepo.com/show/355037/google.svg" className="object-cover w-5 h-5 mr-2" alt="Google Icon" />
                                <span className="dark:text-gray-300">Login with Google</span>
                            </button>
                        </a>

                        <a href="#" className="block">
                            <button onClick={() => {signIn("github") } }  className=" w-full cursor-pointer text-center py-2 my-3 border flex items-center justify-center  rounded-lg bg-white text-slate-700 px-2 border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2 dark:text-white">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                <span className="dark:text-gray-300">Login with Github</span>
                            </button>
                        </a>
                    </div>

                    <div className="already text-sm space-x-2">
                        <span className='text-gray-500'>Need an account&#63;</span>
                       <Link href={"/signup"}> <button className='cursor-pointer'>Sign up</button> </Link>
                    </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default page
