import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import clientPromise from "@/lib/mongodb";

export const POST = async (req) => {
 

  let body = await req.formData()
  // return this
  // FormData {
  //   razorpay_payment_id: 'pay_P1ks2QiAhCj0jV',
  //   razorpay_order_id: 'order_P1krieDX6FD1tx',
  //   razorpay_signature: '290eac0641c6517ea8ea6b3543d474cc7c5266d6430ea7a2ce62feebdb6fdaf5'
  // }

  // make FormData an object
  body = Object.fromEntries(body)


  let secret = process.env.RazorpaySecret

  // verify payment
  let verify = validatePaymentVerification({
    "order_id": body.razorpay_order_id,
    "payment_id": body.razorpay_payment_id
  }, body.razorpay_signature, secret)

  if (!verify) {
    return NextResponse.json(
      { success: false, message: "Payment not verified" },
      { status: 400 }
    );
  }

  // Update order in MongoDB
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const myorders = db.collection("orders")
  await myorders.insertOne({
    orderId: body.razorpay_order_id,
    status: "paid",
    paymentId: body.razorpay_payment_id,
    createdAt: new Date() // Optional: To track when the payment was made
  });

  if (verify) {
    console.log("payment verified");
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`)
  }
  

}

