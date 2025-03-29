"use server"

import Razorpay from "razorpay";
import clientPromise from "@/lib/mongodb";

export const initiate = async (amount) => {


  // first create instanc
  // second create options
  // third with the help of instance and options create generateorder
  // then return generateorder


  var instance = new Razorpay({ key_id: process.env.RazorpayID, key_secret: process.env.RazorpaySecret })

  let options = {
    "amount": Number.parseInt(amount) * 100,
    "currency": "INR"
  }

 
  let generateorder = await instance.orders.create(options)

  // create new payment in our database like we create new user before

  // await Payment.create({
  //     'oid': generateorder.id,
  //     'name': paymentform.name,
  //     'message': paymentform.message,
  //     'to_user': to_user,
  //     'amount': amount,
  //     "done": isdone,
  // })


  return generateorder;
}

export const allproducts = async () => {
  // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const collection = db.collection("product")

  //   we use await here because toarray() returns a promise immediately , so we await until productarr becomes a array then we map it
  let productarr = await collection.find({ product: "verified" }).toArray();

  const transformedProducts = productarr.map(product => ({
    ...product,
    _id: product._id.toString(), // Convert ObjectId to plain string
  }));



  return transformedProducts;
}

export const addtocart = async (username, item) => {
  // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")

  const collectionproduct = db.collection("product")
  await collectionproduct.updateOne(
    { name: item }, // Find the document
    { $set: { addedincart: true } }
  );
  let productobj = await collectionproduct.findOne({ name: item })

  const currentproduct = {
    ...productobj,
    _id: productobj._id.toString(), // Convert ObjectId to plain string
  };

  const collectionbuyer = db.collection("buyer")

  // Add currentproduct to the cart only if it doesn't already exist
  await collectionbuyer.updateOne(
    { name: username }, // Find the document
    { $addToSet: { cart: currentproduct } } // Use $addToSet to avoid duplicates
  );
}


export const getcart = async (username) => {
  // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const collection = db.collection("buyer")

  //  use await while using fondone other wise it returns pending promise
  const obj = await collection.findOne({ name: username })
  //  console.log("obj");
  //  console.log(obj);

  //  as i see this code runs two times firs time obj is null, second time it has data , this is why i use if condition
  if (obj) {
    const mycart = obj.cart
    return mycart;
  }

}


export const updatecart = async (username, item) => {
  // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const collection = db.collection("buyer")
  // change key {addedincart: "true"} to {addedincart: "false"} in my products collection
  const collectionproduct = db.collection("product")
  await collectionproduct.updateOne(
    { name: item }, // Find the document
    { $set: { addedincart: false } }
  );

  // updates cart in user's cart
  await collection.updateOne(
    { name: username }, // Find the document
    { $pull: { cart: { name: item } } }// Use $addToSet to avoid duplicates
  );

  //  use await while using fondone other wise it returns pending promise
  const obj = await collection.findOne({ name: username })
  if (obj) {
    const mycart = obj.cart
    return mycart;
  }

}



export const getsearchdata = async (searchdata) => {
  // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const collection = db.collection("product")


  // Using $regex to find products with matching names
  const results = await collection.find({
    name: { $regex: searchdata, $options: 'i' } // 'i' makes the search case-insensitive
  }).limit(5).toArray();

  const transformedresults = results.map(product => ({
    ...product,
    _id: product._id.toString(), // Convert ObjectId to plain string
  }));

  return transformedresults;

}

export const createwishlist = async (username, item, status) => {

  // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const collectionproduct = db.collection("product")
  const collectionbuyer = db.collection("buyer")

  // we toggle status as state in itempage takes time to update so, we dont get status as what we expect
  if (!status) {
    let productobj = await collectionproduct.findOne({ name: item })

    productobj.addedinwishlist = true;

    const currentproduct = {
      ...productobj,
      _id: productobj._id.toString(), // Convert ObjectId to plain string
    };


    // Add currentproduct to the cart only if it doesn't already exist
    await collectionbuyer.updateOne(
      { name: username }, // Find the document
      { $addToSet: { wishlist: currentproduct } } // Use $addToSet to avoid duplicates
    );
  }
  else {
    await collectionbuyer.updateOne(
      { name: username }, // Find the document
      { $pull: { wishlist: { name: item } } }// Use $addToSet to avoid duplicates
    );
  }

}

export const getwishliststatus = async (username, item) => {
  // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const collection = db.collection("buyer")

  const user = await collection.findOne({ name: username })

  if (user) {
    const productexist = user.wishlist?.some((wishlistItem) => wishlistItem.name === item);
    if (productexist) {
      return true;
    }
    else {
      return false;
    }
  }
}


export const getwishlist = async (username) => {
  // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const collection = db.collection("buyer")

  const obj = await collection.findOne({ name: username })

  if (obj) {
    const mycart = obj.wishlist
    return mycart;
  }

}


export const categoryproducts = async (categorytype) => {
     // establishing connections
  const client = await clientPromise;
  const db = client.db("ecommerce")
  const collection = db.collection("product")

  let categoryarr = await collection.find({ category: categorytype }).toArray();

  const transformedProducts = categoryarr.map(product => ({
    ...product,
    _id: product._id.toString(), // Convert ObjectId to plain string
  }));

  return transformedProducts

}