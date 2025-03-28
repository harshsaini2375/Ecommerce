"use client"
import React from 'react'
import Navbar from '../Components/Navbar'
import Image from 'next/image'
import Footer from '../Components/Footer'
import { useEffect } from 'react'
import { getcart, updatecart } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRef } from 'react'
import Link from 'next/link'

const page = () => {

  const { data: session } = useSession()
  // we use ? here as session takes time to load , before loading it is undefined which can cause issue
  // console.log(session?.user?.name);

  const [mycart, setmycart] = useState([])
  const carttotal = useRef(0);

  // we run this useeffect when session change , as our session takes time to load  
  useEffect(() => {

    const funcart = async () => {
      const currcart = await getcart(session?.user?.name);

      if (currcart && carttotal.current == 0) {
        currcart.forEach(obj => {
          const rupees = parseInt(obj.price, 10);
          carttotal.current = carttotal.current + rupees
        });
      }

      setmycart(currcart);
    }

    funcart();
  }, [session])


  const handledeletecart = async(itemname, itemprice) => {
    const newcart = await updatecart(session?.user?.name, itemname);
    // update amount of carttotal
    const deleteditemprice = parseInt(itemprice, 10);
    carttotal.current = carttotal.current - deleteditemprice;
    setmycart(newcart);
  }


  return (
    <div>
      <Navbar />
      <h1 className='text-xl my-5 ml-5 md:ml-[146px]'>Cart</h1>
      
      <div className="cart w-[95vw] md:w-[80vw] justify-self-center mb-20 md:mb-10">
        <div className="heading w-full h-[10vh] text-sm md:text-base rounded-sm px-2 md:px-5 flex justify-center items-center shadow shadow-gray-300">
          <div className='w-2/5 '>Product</div>
          <div className='w-1/5 '>Price</div>
          <div className='w-1/5 '>Quantity</div>
          <div className='w-1/5 '>Subtotal</div>
        </div>


        { mycart?.map((item) => {
          return <div key={item._id} className="product w-full h-[10vh] text-sm md:text-base  rounded-sm px-2 md:px-5 flex justify-center items-center shadow shadow-gray-300 mt-10">
            <div className='w-2/5 flex flex-col md:flex-row md:gap-4 items-start  md:items-center '>
              <div className='md:h-14 md:w-20 h-10 w-16 relative '><Image src={`/${item.img}.svg`} alt='productimage'fill={true} className='object-contain' /></div>
              <span className='w-full  pr-5 md:pr-0 whitespace-nowrap overflow-hidden overflow-ellipsis'>{item.name}</span>
            </div>
            <div className='w-1/5 '>{item.price}</div>
            <div className='w-1/5 '>1</div>
            <div className='w-1/5  flex justify-between items-center'>
              <div className=''>{item.price}</div>
              <button  onClick={() => { handledeletecart(item.name, item.price) }} className='delete cursor-pointer relative h-4 w-4 md:h-7 md:w-7'><Image src={"/delete.svg"} alt='delete' fill={true} className='object-cover' /></button>
            </div>

          </div> 

        })
        }



        <div className="returntoshop w-full mt-10 flex justify-between">
         <Link href={"/"}> <button className='cursor-pointer px-7 py-2 border-2 border-slate-500 rounded-sm'>Return To Shop</button></Link>
          
        </div>

        <div className="proceedtocheckout flex flex-col md:flex-row justify-between gap-5 md:gap-0 mt-10">
          <div className="left flex gap-2 md:gap-7 h-[6.5vh]">
            <input type="text" className='w-[58vw] md:w-[18vw] py-2 border-2 border-slate-500 rounded-sm outline-slate-500  px-5  ' placeholder='Coupon Code' />
            <button className='cursor-pointer px-3 md:px-7 py-2 bg-[#db4444] text-white rounded-sm'>Apply Coupon</button>
          </div>


          <div className="right border-2 px-5  border-black rounded-sm w-full md:w-[25vw] h-[40vh] flex flex-col items-center">
            <h1 className='py-5 w-full ' >Cart Total</h1>
            <div className="subtotal w-full flex justify-between ">
              <span>Subtotal&#58;</span>
              <span>{carttotal.current}</span>
            </div>

            <div className="separation full h-[2px] bg-gray-500 my-3 "></div>

            <div className="shipping w-full flex justify-between ">
              <span>Shipping&#58;</span>
              <span>Free</span>
            </div>

            <div className="separation w-full h-[1.5px] bg-gray-500 my-3 "></div>

            <div className="total w-full flex justify-between ">
              <span>Total&#58;</span>
              <span>{carttotal.current}</span>
            </div>
            {carttotal.current>0 ? <Link href={`/checkout?carttotal=${encodeURIComponent(carttotal.current)}`}>
              <button className='cursor-pointer px-7 py-3 mt-5 bg-[#db4444] text-white rounded-sm'>Proceed To Checkout</button>
            </Link> :  <button className='cursor-pointer px-7 py-3 mt-5 bg-[#e05b5b] text-white rounded-sm'>Proceed To Checkout</button>
            }
            
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default page
