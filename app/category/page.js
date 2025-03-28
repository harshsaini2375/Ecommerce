"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useState } from 'react'
import { categoryproducts } from '@/actions/useractions'
import { useEffect } from 'react'
import Product from '../Components/Product'
import { useSearchParams } from 'next/navigation'
import { allproducts } from '@/actions/useractions'
import Image from 'next/image'

const Page = () => {
    const searchParams = useSearchParams();
    const categorytype = searchParams.get("type");

    const [categoryarr, setcategoryarr] = useState([])
    const [justforyouarr, setjustforyouarr] = useState([])


    useEffect(() => {
        getdata();
        justforyou();

    }, [])

    const getdata = async () => {
        const data = await categoryproducts(categorytype)
        setcategoryarr(data);
    }

    const justforyou = async () => {
        const productarr = await allproducts();
        setjustforyouarr(productarr);
    }


    return (
        <div className='category'>
            <Navbar />
            <h1 className='text-xl my-5 ml-5 md:ml-[146px]'>{categorytype}</h1>
            <div className="main justify-self-center flex my-10 w-[90vw] md:w-[80vw]  h-fit ">
                <div className="categoryproducts w-full justify-self-center flex flex-col md:flex-row items-center flex-wrap gap-5 md:gap-14">
                    {categoryarr?.map((item) => {
                        return <Product key={item._id} name={item.name} price={item.price} image={item.img} isadded={item.addedincart} />
                    })}
                </div>
            </div>

            <div className="advertisement w-[95vw]  md:w-[80vw] h-[20vh]  md:h-[55vh]  justify-self-center border-2 border-slate-500 mb-20 md:my-16 relative">
                <Image src={"/speakerad.svg"} alt="advertisement" fill={true} className="object-cover" />
            </div>

            <div className='justfor md:block hidden mt-15 you w-[80vw] justify-self-center '>
                <div className="redinfo mb-8 flex text-[#db4444] text-sm items-center gap-3">
                    <div className="h-9 w-4 bg-[#db4444] rounded-sm "></div>
                    <span>Just For You</span>
                </div>
                <div className="products flex gap-15 flex-wrap">
                    {/* slice make a new array from index 3 to index 6 */}
                    {justforyouarr?.slice(5, 9).map((item) => {
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
