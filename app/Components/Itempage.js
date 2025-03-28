"use client"
import React from 'react'
import Navbar from '../Components/Navbar'
import Image from 'next/image'
import Product from '../Components/Product'
import Footer from '../Components/Footer'
import { allproducts } from '@/actions/useractions'
import { useEffect } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { createwishlist } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { getwishliststatus } from '@/actions/useractions'

const Itempage = ({ productname }) => {

    const { data: session } = useSession()

    const [curritem, setcurritem] = useState({})
    const [relateditemarr, setrelateditemarr] = useState([])
    const [wishlistactive, setwishlistactive] = useState()
    
    useEffect(() => {
        getallproducts();
        getstatus();
    }, [])


    const getallproducts = async () => {
        const productarr = await allproducts();
        setrelateditemarr(productarr);
        const currobj = productarr.find(obj => obj.name === productname)
        setcurritem(currobj);
    }

    const handlefavourite = () => {
        setwishlistactive(!wishlistactive);
        
        if(session){
            createwishlist( session?.user?.name , productname, wishlistactive)
        }
        
    }

    const getstatus = async() => {
        
            const status = await getwishliststatus( session?.user?.name , productname)
            setwishlistactive(status);
    }
    

    return (
        <>
            <Navbar />

            <div className="product justify-self-center w-[95vw] md:w-[80vw] h-fit md:h-[65vh] flex-col md:flex-row mt-5 md:mt-0 flex  md:my-10 ">
                <div className="left w-full  h-[50vh] md:w-1/2 md:h-full relative">
                    <Image src={`/${curritem.img}.svg`} alt='productimage' fill={true} className='object-contain' />
                </div>
                <div className="right w-full md:w-1/2 h-fit md:h-full space-y-2 px-5 md:px-16 pt-5">
                    <h1 className='nameofproduct font-bold'>{curritem.name}</h1>
                    <div className="stars flex gap-5">
                        <div className='rating space-x-2 inline'>
                            <Image className='inline' src={"/star.svg"} alt='rating star' height={15} width={15} />
                            <Image className='inline' src={"/star.svg"} alt='rating star' height={15} width={15} />
                            <Image className='inline' src={"/star.svg"} alt='rating star' height={15} width={15} />
                            <Image className='inline' src={"/star.svg"} alt='rating star' height={15} width={15} />

                        </div>
                        <div className='text-[#66ffa3]'>In Stock</div>
                    </div>
                    <div className="price">Rs {curritem.price}</div>
                    <div className="description w-full md:w-[70%] h-fit md:h-[10vh] overflow-y-hidden ">{curritem.description}</div>
                    <div className="separation w-full md:w-[27vw] h-[1.5px] bg-gray-500 my-5 justify-self-start"></div>
                    <div className="colors flex gap-3">
                        <div>Colors</div>
                        <div className='h-5 w-5 rounded-full border-2 border-black bg-gray-300'></div>
                        <div className='h-5 w-5 rounded-full border-2 border-black bg-black'></div>
                    </div>
                    <div className="buy flex gap-4 md:gap-8">
                        {/* <div className="count flex h-8 ">
                            <button className='h-full w-10 border-2 border-black'>p</button>
                            <div className="number w-14 flex justify-center items-center h-full border-y-2 border-black">2</div>
                            <button className='h-full w-10 border-2 border-black'>m</button>
                        </div> */}
                        <Link href={`/checkout?name=${encodeURIComponent(productname)}`}>
                            <button className="buy px-12 py-1 bg-[#db4444] rounded-sm text-white cursor-pointer">Buy</button>
                        </Link>

                        {wishlistactive ? <button onClick={() => { handlefavourite() }} className=" cursor-pointer favourite border-2 border-gray-400 rounded-sm flex justify-center items-center px-1"><Image src={"/redheart.svg"} alt='favourite' height={25} width={25} /></button> :  <button onClick={() => { handlefavourite() }} className=" cursor-pointer favourite border-2 border-gray-400 rounded-sm flex justify-center items-center px-1"><Image src={"/heart.svg"} alt='favourite' height={25} width={25} /></button>}
                        
                    </div>
                    <div className="features mt-5">
                        <div className="freedelivery  py-2 px-2 rounded-sm flex gap-7 border-2 border-gray-400 w-full md:w-[27vw]">
                            <Image className='invert' src={"/delivery.svg"} alt='freedelivery' height={35} width={35} />
                            <div className='space-y-2'>
                                <div>Free Delivery</div>
                                <div className='text-sm underline'>Enter your postal code for Delivery Availability</div>
                            </div>
                        </div>
                        <div className="return mt-2 py-2 px-2 rounded-sm flex gap-7 border-2 border-gray-400 w-full md:w-[27vw]">
                            <Image src={"/return.svg"} alt='freedelivery' height={30} width={30} />
                            <div className='space-y-2'>
                                <div>Return Delivery</div>
                                <div className='text-sm underline'>Free 30 Days Delivery Returns&#46; Details</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>




            <div className="relatedproduct w-[80vw] my-5 md:my-20  justify-self-center ">
                <div className="redinfo mb-3 flex text-[#db4444] text-sm items-center gap-3">
                    <div className="h-9 w-4 bg-[#db4444] rounded-sm "></div>
                    <span>Related Items</span>
                </div>
                
                <div className="products mt-5 md:mt-10 flex flex-col md:flex-row items-center gap-5 md:gap-0 justify-between md:mb-0 mb-20">
                    {/* slice make a new array from index 3 to index 6 */}
                    {relateditemarr.slice(1, 5).map((item) => {
                        return <Product key={item._id} name={item.name} price={item.price} image={item.img} isadded={item.addedincart} />
                    })
                    }
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Itempage


