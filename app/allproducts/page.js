"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { useState, useEffect } from 'react'
import { allproducts } from '@/actions/useractions'
import Product from '../Components/Product'

const Page = () => {

    const [productarr, setproductarr] = useState([]);


    useEffect(() => {
        getallproducts();
    }, [])

    const getallproducts = async () => {
        const res = await allproducts();
        setproductarr(res);
    }


    return (
        <div className='main'>
            <Navbar />
            <div className="main w-[90vw] md:w-[80vw] justify-self-center mb-20 md:mb-0 my-10 flex flex-col md:flex-row items-center flex-wrap gap-5 md:gap-14">

                {productarr.map((item) => {
                    return <Product key={item._id} name={item.name} price={item.price} image={item.img} isadded={item.addedincart} />
                })
                }

            </div>
            <Footer />
        </div>
    )
}

export default Page
