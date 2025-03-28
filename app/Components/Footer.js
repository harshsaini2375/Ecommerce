import React from 'react'

const Footer = () => {
  return (
    <div>
    <div className='w-screen md:flex hidden mt-20 h-[33vh] grid-cols-4  justify-evenly bg-black text-white '>
      <div className="first border-2 border-black flex flex-col pt-10 items-center gap-2 w-[15vw]">
        <h1 className='font-bold text-lg'>Exclusive</h1>
        <div className='text-sm'>Subscribe</div>
        <div className='text-sm'>Get 10&#37; off your first order</div>
      </div>
      <div className="second border-2 border-black flex flex-col pt-10 items-center gap-2 w-[15vw]">
      <h1 className='font-bold text-lg'>Support</h1> 
        <div className='text-sm'>111 Bijoy sarani&#44; Dhaka&#44; Sector 14  DH 1515&#44; Rohtak&#44; Haryana&#44; India&#46;</div>
        <div className='text-sm'>exclusive@gmail&#46;com</div>
        <div className='text-sm'>88015&#45;88888&#45;9999</div>
      </div>
      <div className="third border-2 border-black flex flex-col pt-10 items-center gap-2 w-[15vw]">
        <h1 className='font-bold text-lg'>Account</h1>
        <div className='text-sm'>My Account</div>
        <div className='text-sm'>Login / Register</div>
        <div className='text-sm'>Cart</div>
        <div className='text-sm'>Wishlist</div>
      </div>
      <div className="fourth border-2 border-black flex flex-col pt-10 items-center gap-2 w-[15vw]">
        <h1 className='font-bold text-lg'>Quick Links</h1>
        <div className='text-sm'>Privacy Policy</div>
        <div className='text-sm'>Terms Of Use</div>
        <div className='text-sm'>FAQ</div>
        <div className='text-sm'>Contact</div>
        
      </div>
      
    </div>
    <div className="copyright md:block hidden bg-black text-[#3d3d3d] text-center">Copyright Rimel 2022&#46; All right reserved</div>
    </div>
  )
}

export default Footer
