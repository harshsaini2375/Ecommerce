import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
const page = () => {
  return (
   <div className="min-h-screen flex flex-col text-gray-800">
            <Navbar />
            <main className="flex-grow max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6 text-center">Refund Policy</h1>
                <p className="italic bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
                   No real payments are processed. For testing&#44; use Razorpays test cards &#40;4111 1111 1111 1111&#41;. 
                </p>
                
            </main>
            <Footer />
        </div>
  )
}

export default page
