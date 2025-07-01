import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <Navbar/>
      <main className="flex-grow max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="italic bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          This is a demo project for portfolio purposes only.
        </p>
        <ul className="list-disc pl-6 space-y-3 text-base">
          <li>No real user data is collected or stored permanently.</li>
          <li>This is not a commercial website.</li>
        </ul>
      </main>
      <Footer/>
    </div>
  )
}

export default page
