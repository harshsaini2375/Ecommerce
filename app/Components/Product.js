"use client"
import React from 'react'
import Image from 'next/image'
import { addtocart } from '@/actions/useractions'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useState } from 'react'

const Product = (props) => {

  const { data: session } = useSession()
  const [tempadded, settempadded] = useState(false)

  const added = () => {
    addtocart(session.user.name, props.name);
    // this is for temporary showing that our product is added, bcz first our database updates then we refresh then it shows added , it takes time
    settempadded(true);
  }


  return (
    <div className=' w-[70vw] md:w-[17vw] h-[44vh] border-2 border-gray-500 rounded-sm px-2 pt-2'>
      <Link href={`/${props.name}`}>
        <div className="photo h-[60%] w-full border-b-2 border-gray-500 relative">
          <Image src={`/${props.image}.svg`} alt='product image' fill={true} className='object-contain' />
        </div>
        <span className='productname block font-bold h-12 w-full break-words overflow-hidden'>{props.name}</span>
      </Link>

      <div className='price text-[#db4444] mr-3 inline text-xl'>Rs {props.price}</div>
      <div className='rating space-x-2 inline'>
        <Image className='inline' src={"/star.svg"} alt='rating star' height={15} width={15} />
        <Image className='inline' src={"/star.svg"} alt='rating star' height={15} width={15} />
        <Image className='inline' src={"/star.svg"} alt='rating star' height={15} width={15} />
        <Image className='inline' src={"/star.svg"} alt='rating star' height={15} width={15} />

      </div>
    {props.isadded || tempadded ? <button className='text-sm cursor-pointer mt-2 block bg-[#ffd814] rounded-full px-3 py-2'>Added</button> : <button onClick={() => { added() }} className='text-sm cursor-pointer mt-2 block bg-[#ffd814] rounded-full px-3 py-2'>Add To Cart</button>}
      


    </div>
  )
}

export default Product
