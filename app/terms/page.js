import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
const page = () => {
  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <Navbar/>
      <main className="flex-grow max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms &#38; Conditions</h1>
        <p className="italic bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
           This website is a personal project created for job interviews.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-base">
           <li>All transactions are simulated. No real products or services are exchanged.</li>
          <li>By using this demo&#44; you acknowledge it is not a real Ecommerce service.</li>
        </ul>
      </main>
      <Footer/>
    </div>
  )
}

export default page
