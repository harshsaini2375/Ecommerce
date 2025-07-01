"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from "next-auth/react"
import { getsearchdata } from '@/actions/useractions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const { data: session } = useSession()
  const router = useRouter();
  console.log(session);

  const [searchitems, setsearchitems] = useState([])
  const [currindex, setcurrindex] = useState(0)
  const [searchfocus, setsearchfocus] = useState()

  const handlechange = async (value) => {
    const data = await getsearchdata(value);
    if (data) {
      setsearchitems(data);
    }
    if (value == "") {
      setsearchitems([]);
    }
  }

  const handledefaultobj = () => {
    if (searchitems.length != 0) {
      const firstobj = searchitems[currindex]
      console.log(firstobj);

      router.push(`/${firstobj.name}`)
    }
  }

  // this is to navigate in our search list using arro keys
  const handlearrowkey = (e, value) => {
  if(searchitems.length>0 ) {
     if (e.key === 'ArrowDown' && currindex<4) {
      setcurrindex(currindex + 1);
    }
    if (e.key === 'ArrowUp' && currindex>0) {
      setcurrindex(currindex - 1);
    }
    if (e.key === 'Enter' && value != "") {
      const myobj = searchitems[currindex]
      router.push(`/${myobj.name}`)
    }
  }

  }

  const handlesearchonblur = () => {
    setTimeout(() => {
      setsearchfocus(false);
    }, 500);
  }
  



  return (
    <div>
      <div className="salenotice md:flex hidden w-full h-8 bg-black text-white  justify-center items-center">
      ⚠️ This is a portfolio project. Do not make any real transactions.
      </div>
      <div className='w-screen px-2 md:px-0 py-2 md:h-[13vh]  border-gray-500 border-b-2 flex items-center justify-around md:pt-5'>

        <ul className='md:h-full h-[7vh] w-full md:w-fit bottom-0 bg-white md:z-0 z-50 md:static fixed md:space-x-8 space-x-5 md:text-base text-sm flex justify-center items-center text-gray-600 md:border-0 border-t-[1px] border-gray-500'>
          <Link href="/">Home</Link>
          <Link href="/privacypolicy">Privacy Policy</Link>
          <Link href="/terms">Terms &#38; Conditions</Link>
          <Link href="/signup">Sign Up</Link>
        </ul>



        <div className="searching">
          <div className="search flex md:gap-3">

            <div className="search flex ">
              <input className='text-sm focus:outline-0 w-[62vw] md:w-[25vw] md:bg-slate-200 bg-slate-100 text-gray-600 px-5 py-1 rounded-bl-sm rounded-tl-sm' type="text" placeholder='What are you looking for?' onChange={(e) => { handlechange(e.target.value) }} onBlur={() => {handlesearchonblur()}} onFocus={() => { setsearchfocus(true)}}  onKeyDown={(e) => { handlearrowkey(e, e.target.value) }} />


              <button onClick={() => { handledefaultobj() }} className='bg-gray-300 cursor-pointer  rounded-br-sm rounded-tr-sm'><Image src={"/search.svg"} alt='search' height={30} width={30} /></button>
            </div>
            <Link className='flex justify-center items-center ml-4 md:ml-2 mr-2 md:mr-0' href={"/wishlist"}> <Image src={"/heart.svg"} alt='favourite' height={25} width={25} /> </Link>
            <Link className='flex justify-center items-center md:mr-0 mr-[10px]' href={"/cart"}> <Image src={"/cart.svg"} alt='cart' height={30} width={30} /> </Link>

          </div>
          <div className={`searchitems  h-fit absolute z-10 bg-white overflow-visible rounded-br-sm rounded-bl-sm `}>
            {searchfocus && searchitems?.map((obj, index) => {
              return <Link href={`/${obj.name}`} className='flex h-10  my-1' key={obj._id} >
               <div className='h-full w-11 relative'> <Image src={`/${obj.img}.svg`} alt='productimage' fill={true} className='object-contain' /> </div>
                {currindex==index ? <div className='w-[58vw] md:w-[22.2vw] px-5 py-1 hover:bg-gray-100 bg-gray-100 flex items-center'>{obj.name}</div> : <div className='w-[58vw] md:w-[22.2vw] px-5 py-1 hover:bg-gray-100 flex items-center'>{obj.name}</div>}
              </Link>
            })}
          </div>
        </div>



        {session && <div className="account flex  gap-1 justify-center items-center">
          <div className="img w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-slate-500 overflow-hidden relative">
            <Image src={session.user.image} alt='userimage' fill={true} className='object-cover ' />
          </div>
          <div className="username hidden md:block ">{session.user.name}</div>
          <button onClick={() => { signOut() }} className='ml-4 hidden md:block  py-1 bg-[#db4444] px-3 text-white rounded-sm cursor-pointer'>Log out</button>
        </div>}

      </div>
    </div>
  )
}

export default Navbar
