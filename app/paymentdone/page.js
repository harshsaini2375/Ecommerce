"use client"
// pages/payment/success.js
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";



export default function PaymentSuccess() {
      const searchParams = useSearchParams();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Payment Successful</title>
      </Head>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>
          <div className="mt-8">
            <p className="text-sm text-gray-500">
             { searchParams.get("oid")}
            </p>
          </div>
          <div className="mt-10">
            <Link href="/" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-xs mx-auto">Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}