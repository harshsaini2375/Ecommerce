"use client"

import React from 'react'
import Navbar from '../Components/Navbar'
import Image from 'next/image'
import Footer from '../Components/Footer'
import { initiate } from '@/actions/useractions'
import Script from 'next/script'
import { useSearchParams } from 'next/navigation'
import { allproducts } from '@/actions/useractions'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { getcart } from '@/actions/useractions'
import { Suspense } from 'react'


const Page = () => {
    const searchParams = useSearchParams();
    const productname = searchParams.get("name");
    const carttotal = searchParams.get("carttotal");
    
    const [curritem, setcurritem] = useState({})
    const [cartitems, setcartitems] = useState([])
    
    const { data: session } = useSession()

    useEffect(() => {
        getallproducts();
    }, [])


      useEffect(() => {
    
          const funcart = async () => {
          const currcart = await getcart(session?.user?.name);    
          setcartitems(currcart);
        }
    
        funcart();
      }, [session])
    
    

    const getallproducts = async() => {
          const productarr = await allproducts();
          const currobj =  productarr.find(obj => obj.name === productname)
          setcurritem(currobj);
        }

// i did this from deepseek, because
// In Next.js App Router API routes:

// NextResponse.redirect() works fine in local development

// But fails with 405 errors in production because:

// Vercel serverless functions can't properly return redirect responses

// The client (browser) receives the redirect but can't follow it correctly
        const pay = async (amount) => {
          try {
            // 1. First generate order id
            let a = await initiate(amount);
            let oid = a.id;
            console.log(oid);
        
            // 2. Create Razorpay options
            var options = {
              "key": process.env.NEXT_PUBLIC_RazorpayID,
              "amount": Number.parseInt(amount) * 100, 
              "currency": "INR",
              "name": "Buy Me A Chai", 
              "description": "Test Transaction",
              "order_id": oid,
              // Remove callback_url - we'll handle it differently
              "handler": async function(response) {
                try {
                  // Send payment verification to your API
                  const verification = await fetch('/api/razorpay', {
                    method: 'POST',
                    body: new URLSearchParams({
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_signature: response.razorpay_signature
                    }),
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }
                  });
                  
                  const result = await verification.json();
                  
                  if (result.success) {
                    // Redirect on successful verification
                    window.location.href = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/paymentdone?oid=${oid}&amount=${amount}`;
                  } else {
                    alert("Payment verification failed");
                  }
                } catch (error) {
                  console.error("Payment error:", error);
                  alert("Payment processing failed");
                }
              },
              "prefill": { 
                name: 'Harsh Saini',
                email: 'harsh@example.com',
                contact: '9999999999'
              },
              "theme": {
                "color": "#3399cc"
              }
            };
        
            // 3. Open Razorpay payment window
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        
          } catch (error) {
            console.error("Payment initialization failed:", error);
            alert("Failed to initialize payment");
          }
        }

  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    <div>
      <Navbar />
      <h1 className='font-light text-3xl my-5 ml-5 md:ml-36'>Billing Details</h1>
      <div className="cart w-[90vw] md:mb-0 mb-20 md:w-[80vw] flex flex-col md:flex-row justify-self-center h-fit min-h-[73vh] ">
        <div className="left w-full md:w-1/2 h-fit md:h-full text-slate-500 text-sm">
        <form action="">
            <div className="name flex flex-col gap-1 mb-7 ">
            <label htmlFor="name">Full Name</label>
            <input className='outline-slate-400 w-full md:w-[25vw] bg-slate-100 rounded-sm py-2' type="text" name='name' id='name'/>
            </div>
            <div className="streetaddress flex flex-col gap-1 mb-7 ">
            <label htmlFor="streetaddress">Street Address</label>
            <input className='outline-slate-400 w-full md:w-[25vw] bg-slate-100 rounded-sm py-2' type="text" name='streetaddress' id='streetaddress'/>
            </div>
            <div className="city flex flex-col gap-1 mb-7 ">
            <label htmlFor="city">Town or City</label>
            <input className='outline-slate-400 w-full md:w-[25vw] bg-slate-100 rounded-sm py-2' type="text" name='city' id='city'/>
            </div>
            <div className="phone flex flex-col gap-1 mb-7 ">
            <label htmlFor="phone">Phone Number</label>
            <input className='outline-slate-400 w-full md:w-[25vw] bg-slate-100 rounded-sm py-2' type="phone" name='phone' id='phone'/>
            </div>
            <div className="email flex flex-col gap-1 mb-7 ">
            <label htmlFor="email">Email Address</label>
            <input className='outline-slate-400 w-full md:w-[25vw] bg-slate-100 rounded-sm py-2' type="email" name='email' id='email'/>
            </div>
        </form>
        </div>
        <div className="right w-full md:w-1/2 h-fit md:h-full md:pl-20">


    {curritem ? <div className="productinfo px-2 mb-5 flex justify-between items-center w-full md:w-[30vw] h-[7vh] border-2 border-black rounded-sm ">
            <div className='flex gap-2 justify-center items-center'>
            <div className='h-10 w-10 relative'><Image  src={`/${curritem.img}.svg`} alt='productimage' fill={true} className='object-contain' /></div>
            <div className="productname md:w-fit w-[40vw] whitespace-nowrap overflow-hidden overflow-ellipsis">{curritem.name}</div>
            </div>
            <div className="productprice">{curritem.price}</div>
        </div> : cartitems?.map((item) => { 
            return <div key={item._id} className="productinfo px-2 mb-5 flex justify-between items-center w-full md:w-[30vw] h-[7vh] border-2 border-black rounded-sm ">
            <div className='flex gap-2 justify-center items-center'>
            <div className='h-10 w-10 relative'><Image  src={`/${item.img}.svg`} alt='productimage' fill={true} className='object-contain' /></div>
            <div className="productname md:w-fit w-[40vw] whitespace-nowrap overflow-hidden overflow-ellipsis">{item.name}</div>
            </div>
            <div className="productprice">{item.price}</div>
        </div>
         } )
        }
        




        <div className="subtotal w-full md:w-[30vw] flex justify-between px-2">
            <span>Subtotal&#58;</span>
           {curritem ? <span>{curritem.price}</span> : <span>{carttotal}</span>} 
        </div>

        <div className="separation w-full md:w-[30vw] h-[2px] bg-gray-500 my-3 "></div>

        <div className="shipping w-full md:w-[30vw] flex justify-between px-2">
            <span>Shipping&#58;</span>
            <span>Free</span>
        </div>

        <div className="separation w-full md:w-[30vw] h-[1.5px] bg-gray-500 my-3 "></div>

        <div className="total w-full md:w-[30vw] flex justify-between px-2">
            <span>Total&#58;</span>
            {curritem ? <span>{curritem.price}</span> : <span>{carttotal}</span>} 
        </div>

        <div className="paymentoption mt-3 space-y-3">
            
            <div className="upioptions w-[30vw] flex justify-between items-center">

            <div className="option2 flex  items-center gap-2">
            <input type="radio" className='h-5 w-5' id='bank' name='payment' />
            <label htmlFor="bank">Bank</label>
            </div>
            <Image src={"/paymentoption.svg"} alt='paymentimage' width={200} height={200} />

            </div>

            <div className="option1 flex  items-center gap-2">
            <input defaultChecked type="radio" className='h-5 w-5' id='cash' name='payment' />
            <label htmlFor="cash">Cash on delivery</label>
            </div>

            <div className="coupon flex gap-2 md:gap-7 my-8">
                <input type="text" className='w-[53vw] md:w-[18vw] py-2 border-2 border-slate-500 rounded-sm outline-slate-500  px-5  ' placeholder='Coupon Code' />
                <button className='cursor-pointer px-3 md:px-7 py-2 bg-[#db4444] text-white rounded-sm'>Apply Coupon</button>
            </div>

            <button onClick={() => { pay(curritem? curritem.price :carttotal); } } className='cursor-pointer px-7 py-[10px] bg-[#db4444] text-white rounded-sm'>Place Order</button>

        </div>

        

        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}

const WrappedMyPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default WrappedMyPage;
