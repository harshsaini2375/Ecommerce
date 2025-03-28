import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (req) => {
 
  try {
  let body = await req.formData()
  // return this
  // FormData {
  //   razorpay_payment_id: 'pay_P1ks2QiAhCj0jV',
  //   razorpay_order_id: 'order_P1krieDX6FD1tx',
  //   razorpay_signature: '290eac0641c6517ea8ea6b3543d474cc7c5266d6430ea7a2ce62feebdb6fdaf5'
  // }

  // make FormData an object
  body = Object.fromEntries(body)

  // check if pending payment exists in our database
//   let pay = await Payment.findOne({ oid: body.razorpay_order_id })

//   if (!pay) {
//     return NextResponse.json({ success: false, message: "payment object not found" })
//   }

  // fetching razorpaysecret from the User in database
//   let u = await User.findOne({name:pay.to_user})
  let secret = process.env.RazorpaySecret
  console.log(secret);
  

  // verify payment
  let verify = validatePaymentVerification({
    "order_id": body.razorpay_order_id,
    "payment_id": body.razorpay_payment_id
  }, body.razorpay_signature, secret)
  console.log(verify);

  // update payment pending payment that exists in our database to done: true
  if (verify) {

    // let updated = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: true }, { new: true })

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`)
    // return NextResponse.redirect(`${process.env.HOST}/${updated.to_user}?paymentdone=true`)

  }
  else {
    return NextResponse.json({ success: false, message: "payment not verified" })

  }

}
catch (error) {
  console.error("Error processing payment:", error.message);
  return NextResponse.json({ success: false, message: error.message });
}

}
