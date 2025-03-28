"use client"
import React from 'react'
import Navbar from '../Components/Navbar'
import Product from '../Components/Product'
import Footer from '../Components/Footer'
import { getwishlist } from '@/actions/useractions'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { allproducts } from '@/actions/useractions'

const Page = () => {
  const { data: session } = useSession()
  const [wishlistarr, setwishlistarr] = useState([])
  const [justforyouarr, setjustforyouarr] = useState([])
  const [wishlistcount, setwishlistcount] = useState(0)

  useEffect(() => {
    wishlist();
    justforyou();

  }, [session])

  useEffect(() => {
    setTimeout(() => {
      setwishlistcount(wishlistarr?.length)
    }, 300);
  }, [wishlistarr])
  

  const wishlist = async () => {
    const data = await getwishlist(session?.user?.name)
    setwishlistarr(data);

  }

  const justforyou = async () => {
    const productarr = await allproducts();
    setjustforyouarr(productarr);
  }


  return (
    <div>
      <Navbar />
      <h1 className='text-xl my-5 ml-5 md:ml-[146px]'>Wishlist &#x28; {wishlistcount} &#x29;</h1>
      <div className="wishlist w-[95vw] md:w-[80vw] justify-self-center mb-20 md:mb-10 ">
        <div className="mainproducts w-full flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0 flex-wrap">
          {wishlistarr?.map((item) => {
            return <Product key={item._id} name={item.name} price={item.price} image={item.img} isadded={item.addedincart} />
          })}

        </div>

      </div>

      <div className='md:block hidden justfor mt-20 you w-[80vw] justify-self-center '>
        <div className="redinfo mb-8 flex text-[#db4444] text-sm items-center gap-3">
          <div className="h-9 w-4 bg-[#db4444] rounded-sm "></div>
          <span>Just For You</span>
        </div>
        <div className="products flex gap-15 flex-wrap">
          {/* slice make a new array from index 3 to index 6 */}
          {justforyouarr?.slice(0, 4).map((item) => {
            return <Product key={item._id} name={item.name} price={item.price} image={item.img} isadded={item.addedincart} />
          })
          }
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Page
