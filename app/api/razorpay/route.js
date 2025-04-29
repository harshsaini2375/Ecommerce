import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (req) => {
  

  let formData = await req.formData();
  // return this
  // FormData {
  //   razorpay_payment_id: 'pay_P1ks2QiAhCj0jV',
  //   razorpay_order_id: 'order_P1krieDX6FD1tx',
  //   razorpay_signature: '290eac0641c6517ea8ea6b3543d474cc7c5266d6430ea7a2ce62feebdb6fdaf5'
  // }

  // make FormData an object
  let body = Object.fromEntries(formData);


  let secret = process.env.RazorpaySecret

  // verify payment
  let verify = validatePaymentVerification({
    "order_id": body.razorpay_order_id,
    "payment_id": body.razorpay_payment_id
  }, body.razorpay_signature, secret)
  console.log("verify : " ,verify);

  if (verify) {
   
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}?paymentdone=success`)
  }
  else {
    return NextResponse.json({ success: false, message: "payment not verified" })

  }

}

