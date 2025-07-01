import React from 'react'
import Link from "next/link";

const Footer = () => {
  return (
    <div>
    <div className='w-screen md:flex md:mt-20 md:mb-0 mb-12  mt-5 md:h-[33vh] h-fit grid-cols-4  justify-evenly bg-black text-white '>
      <div className="first border-2 border-black md:flex hidden flex-col pt-10 items-center gap-2 w-[15vw]">
        <h1 className='font-bold text-lg'>Exclusive</h1>
        <div className='text-sm'>Subscribe</div>
        <div className='text-sm'>Get 10&#37; off your first order</div>
      </div>
      <div className="second border-2 border-black md:flex hidden flex-col pt-10 items-center gap-2 w-[15vw]">
      <h1 className='font-bold text-lg'>Support</h1> 
        <div className='text-sm'>Rohtak&#44; Haryana&#44; India&#46;</div>
        <div className='text-sm'>harshsaini2375@gmail&#46;com</div>
        <div className='text-sm'>88015&#45;88888&#45;9999</div>
      </div>
      <div className="third border-2 border-black md:flex hidden flex-col pt-10 items-center gap-2 w-[15vw] ">
        <h1 className='font-bold text-lg'>Account</h1>
        <div className='text-sm'>Login / Register</div>
        <Link href="/signup">SignUp</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/wishlist">Wishlist</Link>
      </div>
      <div className="fourth border-2 border-black flex-wrap flex md:flex-col pt-2 md:pt-10 items-center pl-8 md:pl-0 space-x-5 md:gap-2 md:w-[15vw] w-full">
        <h1  className='font-bold text-lg md:block hidden'>Quick Links</h1>
        <Link href="/privacypolicy">Privacy Policy</Link>
        <Link href="/terms">Terms &#38; Conditions</Link>
        <Link href="/shippingpolicy">Shipping Policy</Link>
        <Link href="/refunds">Cancellation &#38; Refunds</Link>
        
      </div>
      
    </div>
    <div className="copyright md:block hidden bg-black text-[#3d3d3d] text-center">Copyright Rimel 2022&#46; All right reserved</div>
    </div>
  )
}

export default Footer
