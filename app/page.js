"use client"

import Image from "next/image";
import Navbar from "./Components/Navbar";
import Link from "next/link";
import Product from "./Components/Product";
import Footer from "./Components/Footer";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { allproducts } from "@/actions/useractions";
import { useState } from "react";


export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  const [productarr, setproductarr] = useState([]);


  useEffect(() => {
    if (!session) {
      router.push('/login')
    }

  }, [session])

  useEffect(() => {
    getallproducts();
  }, [])



  // always call this server component function in a useeffect to prevent it from a badstate
  const getallproducts = async () => {
    const res = await allproducts();
    setproductarr(res);
  }


  return (
    <div className="homepage w-screen h-fit">

      <Navbar />

      <div className="navigation w-full h-fit md:h-[40vh] md:flex ">
        <div className="left w-screen md:w-1/4 md:h-full md:border-r-2 border-gray-500 pt-3 md:pt-5 mb-3 md:mb-0 md:pr-5 flex md:justify-end">
          <ul className="flex md:flex-col w-full justify-around md:justify-start md:w-[58%]  md:gap-3 md:text-base text-sm">
            <Link href="/category?type=Women">Women Fashion</Link>
            <Link href="/category?type=Men">Men Fashion</Link>
            <Link href="/category?type=Electronics">Electronics</Link>
            <Link href="/category?type=Groceries">Groceries</Link>
          </ul>
        </div>
        <div className="right ad h-[20vh] md:h-full w-full md:w-3/4 px-2 md:pl-10 md:pr-[153px]">
          <Link href={"/iPhone 13"}> <div className="relative h-full ">
            <Image src={"/iphonead3.svg"} alt="advertisement" fill={true} className="object-cover" />
          </div> </Link>
        </div>
      </div>

      <div className="separation w-[80vw] h-[1.5px] bg-gray-500 my-7 md:my-10 justify-self-center"></div>



      <div className="browsebycategory w-[80vw]  justify-self-center ">
        <div className="redinfo mb-3 flex text-[#db4444] text-sm items-center gap-3">
          <div className="h-9 w-4 bg-[#db4444] rounded-sm "></div>
          <span>Categories</span>
        </div>
        <span className="text-2xl font-bold ">Browse By Category</span>


        <div className="products mt-5 md:mt-10 flex md:justify-between md:gap-0 gap-2 flex-wrap">
          <div className="box h-[12vh] md:h-[15vh] w-[25vw] md:w-[10vw] border-2 border-gray-500 rounded-sm flex  flex-col items-center justify-center md:gap-3">
            <Image src={"/mobile.svg"} alt="mobile" height={50} width={50} />
            <span className="text-xs md:text-base">Mobile</span>
          </div>
          <div className="box h-[12vh] md:h-[15vh] w-[25vw] md:w-[10vw] border-2 border-gray-500 rounded-sm flex  flex-col items-center justify-center md:gap-3">
            <Image src={"/computer.svg"} alt="computer" height={50} width={50} />
            <span className="text-xs md:text-base">Computer</span>
          </div>
          <div className="box h-[12vh] md:h-[15vh] w-[25vw] md:w-[10vw] border-2 border-gray-500 rounded-sm flex  flex-col items-center justify-center md:gap-3">
            <Image src={"/smartwatch.svg"} alt="smartwatch" height={50} width={50} />
            <span className="text-xs md:text-base">Smartwatch</span>
          </div>
          <div className="box h-[12vh] md:h-[15vh] w-[25vw] md:w-[10vw] border-2 border-gray-500 rounded-sm flex  flex-col items-center justify-center md:gap-3">
            <Image src={"/camera.svg"} alt="camera" height={50} width={50} />
            <span className="text-xs md:text-base">Camera</span>
          </div>
          <div className="box h-[12vh] md:h-[15vh] w-[25vw] md:w-[10vw] border-2 border-gray-500 rounded-sm flex  flex-col items-center justify-center md:gap-3">
            <Image src={"/headphone.svg"} alt="headphone" height={50} width={50} />
            <span className="text-xs md:text-base">Headphones</span>
          </div>
          <div className="box h-[12vh] md:h-[15vh] w-[25vw] md:w-[10vw] border-2 border-gray-500 rounded-sm flex  flex-col items-center justify-center md:gap-3">
            <Image src={"/game.svg"} alt="game" height={50} width={50} />
            <span className="text-xs md:text-base">Gaming</span>
          </div>
        </div>

      </div>


      <div className="separation w-[80vw] h-[1.5px] bg-gray-500 my-10 justify-self-center"></div>



      <div className="bestsellingproduct w-[80vw]  justify-self-center ">
        <div className="redinfo mb-3 flex text-[#db4444] text-sm items-center gap-3">
          <div className="h-9 w-4 bg-[#db4444] rounded-sm "></div>
          <span>This Month</span>
        </div>
        <span className="text-2xl font-bold ">Best Selling Products</span>

        <div className="products mt-10 flex md:flex-row flex-col gap-5 md:gap-0 md:justify-between items-center md:justify-items-normal">
          {/* slice make a new array from index 3 to index 6 */}
          {productarr.slice(3, 7).map((item) => {
            return <Product key={item._id} name={item.name} price={item.price} image={item.img} isadded={item.addedincart} />
          })
          }
        </div>
      </div>



      <div className="advertisement w-[95vw]  md:w-[80vw] h-[20vh]  md:h-[55vh] justify-self-center border-2 border-slate-500 my-10 md:my-16 relative">
        <Image src={"/speakerad.svg"} alt="advertisement" fill={true} className="object-cover" />
      </div>


      <div className="allproducts w-[80vw] flex flex-col justify-self-center">
        <div className="redinfo mb-3 flex text-[#db4444] text-sm items-center gap-3">
          <div className="h-9 w-4 bg-[#db4444] rounded-sm "></div>
          <span>Our Products</span>
        </div>
        <span className="text-2xl font-bold ">Explore Our Products</span>

        <div className="products w-full mt-10 flex flex-col items-center md:justify-items-normal md:flex-row gap-5  md:gap-15 flex-wrap mb-10">


          {productarr.slice(7, 15).map((item) => {
            return <Product key={item._id} name={item.name} price={item.price} image={item.img} isadded={item.addedincart} />
          })
          }

        </div>

        <Link href={"/allproducts"} className="self-center" ><button className="cursor-pointer viewall px-5 py-2 bg-[#db4444] rounded-sm text-sm text-white ">View All Products</button></Link>
      </div>



      <div className="separation w-[80vw] h-[1.5px] bg-white my-5 md:my-10 justify-self-center"></div>



      <div className="quality w-[60vw] md:h-[20vh] gap-5 md:gap-0 justify-self-center flex flex-col md:flex-row justify-between">

        <div className="first w-full md:w-[16vw] h-full  flex justify-center items-center flex-col gap-2">
          <div className="h-fit w-fit bg-black rounded-full p-2 border-8 border-gray-400"><Image src={"/delivery.svg"} alt="delivery" height={25} width={25} /></div>
          <span className="block font-bold ">FREE AND FAST DELIVERY</span>
          <span className="text-sm text-center">Free delivery for all orders over &#36;140</span>
        </div>
        <div className="second w-full md:w-[16vw] h-full  flex justify-center items-center flex-col gap-2">
          <div className="h-fit w-fit bg-black rounded-full p-2 border-8 border-gray-400"><Image src={"/headphonewhite.svg"} alt="headphone" height={25} width={25} /></div>
          <span className="block font-bold ">24&#47;7 CUSTOMER SERVICE</span>
          <span className="text-sm">Friendly 24&#47;7 customer support</span>
        </div>
        <div className="third w-full md:w-[16vw] h-full  flex justify-center items-center flex-col gap-2">
          <div className="h-fit w-fit bg-black rounded-full p-2 border-8 border-gray-400"><Image src={"/guarantee.svg"} alt="guarantee" height={25} width={25} /></div>
          <span className="block font-bold ">MONEY BACK GUARANTEE</span>
          <span className="text-sm">We reurn money within 30 days</span>
        </div>

      </div>


      <div className="separation  w-[80vw] h-[1.5px] bg-white  my-10 justify-self-center"></div>


      <Footer />

    </div>
  );
}
