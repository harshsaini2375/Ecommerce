import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from '@/lib/mongodb';


const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000, // Increase timeout to 10 seconds
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider == "github" || account.provider == "google") {

        // establishing connections
        const client = await clientPromise;
        const db = client.db("ecommerce")
        const collection = db.collection("buyer")

        // uncomment it if you want to insert products to your mongodb (first time only)
        // const collection2 = db.collection("product")

        // await collection2.insertMany([
        //   {
        //     "name": "AK 900 Wired Keyboard",
        //     "rating": "3",
        //     "price": "2000",
        //     "description": "Ergonomic AK-900 wired keyboard with mechanical switches for optimal g…",
        //     "img": "product8",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Electronics"
        //   },
        //   {
        //     "name": "Jr Zoom Soccer Cleats",
        //     "rating": "4",
        //     "price": "1200",
        //     "description": "Lightweight and durable Jr. Zoom soccer cleats designed for young athl…",
        //     "img": "product4",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Men"
        //   },
        //   {
        //     "name": "Kids Electric Car",
        //     "rating": "3",
        //     "price": "12000",
        //     "description": "Battery-operated kids electric car with remote control and realistic f…",
        //     "img": "product3",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Electronics"
        //   },
        //   {
        //     "name": "Quilted Satin Jacket",
        //     "rating": "5",
        //     "price": "3000",
        //     "description": "Fashionable quilted satin jacket perfect for winter wear, combining st…",
        //     "img": "product2",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Women"
        //   },
        //   {
        //     "name": "The North Coat",
        //     "rating": "5",
        //     "price": "8000",
        //     "description": "Premium North Coat made with waterproof materials and insulated for ex…",
        //     "img": "product1",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Men"
        //   },
        //   {
        //     "name": "Gucci Duffle Bag",
        //     "rating": "5",
        //     "price": "5000",
        //     "description": "Stylish and spacious Gucci duffle bag, ideal for travel or daily use.",
        //     "img": "product5",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Women"
        //   },
        //   {
        //     "name": "RGB Liquid CPU Cooler",
        //     "rating": "4",
        //     "price": "7000",
        //     "description": "High-performance RGB liquid CPU cooler for gaming setups.",
        //     "img": "product6",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Electronics"
        //   },
        //   {
        //     "name": "IPS LCD Gaming Monitor",
        //     "rating": "5",
        //     "price": "15000",
        //     "description": "IPS LCD gaming monitor with ultra-fast response time and vibrant color.",
        //     "img": "product7",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Electronics"
        //   },

        //   {
        //     "name": "iPhone 14 Pro",
        //     "rating": "5",
        //     "price": "120000",
        //     "description": "The latest iPhone 14 Pro with advanced camera system, A16 Bionic chip, and ProMotion display.",
        //     "img": "product17",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Electronics"
        //   },
        //   {
        //     "name": "iPhone 13",
        //     "rating": "4",
        //     "price": "90000",
        //     "description": "Powerful and sleek iPhone 13 with dual-camera system and long battery life.",
        //     "img": "product9",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Electronics"
        //   },
        //   {
        //     "name": "DSLR Camera Mark X",
        //     "rating": "5",
        //     "price": "180000",
        //     "description": "Professional-grade DSLR camera with 20MP sensor and 4K video recording.",
        //     "img": "product16",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Electronics"
        //   },
        //   {
        //     "name": "Luxury Smartwatch",
        //     "rating": "4",
        //     "price": "25000",
        //     "description": "Premium smartwatch with fitness tracking, AMOLED display, and long-lasting battery.",
        //     "img": "product15",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Electronics"
        //   },
        //   {
        //     "name": "Blue Evening Dress",
        //     "rating": "5",
        //     "price": "15000",
        //     "description": "Elegant blue evening dress designed for formal occasions, offering comfort and style.",
        //     "img": "product14",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Women"
        //   },
        //   {
        //     "name": "Fresh Bananas",
        //     "rating": "5",
        //     "price": "50",
        //     "description": "High-quality, fresh bananas ideal for a healthy diet and energy boost.",
        //     "img": "product12",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Groceries"
        //   },
        //   {
        //     "name": "Lays Classic Chips",
        //     "rating": "4",
        //     "price": "20",
        //     "description": "Crispy and delicious Lays Classic chips, perfect for snacking anytime.",
        //     "img": "product11",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Groceries"
        //   },
        //   {
        //     "name": "Black Cotton T-Shirt",
        //     "rating": "4",
        //     "price": "800",
        //     "description": "Comfortable and stylish black cotton t-shirt suitable for casual wear.",
        //     "img": "product10",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Men"
        //   },
        //   {
        //     "name": "Gray Full-Sleeve T-Shirt",
        //     "rating": "4",
        //     "price": "1000",
        //     "description": "Premium gray full-sleeve t-shirt, perfect for layering or standalone wear.",
        //     "img": "product13",
        //     "product": "verified",
        //     "addedincart": false,
        //     "category": "Men"
        //   }
        // ])

        // here we find in our database that the user with this email is available or not
        // if not we create the user
        const exist = await collection.findOne({ "name": user.name });

        if (!exist) {
          await collection.insertOne(
            {
              "name": user.name,
              "email": user.email
            }
          )
        }

      }
      // also return true to allow signIn
      return true
    },

    // this session callback is used to modify the session
    // async session({ session, token, user }) {

    //    // establishing connections
    //    const client = await clientPromise;
    //    const db = client.db("ecommerce")
    //    const collection = db.collection("buyer")

    //   let myuser = await collection.findOne({ "name": user.name })

    //   //  here we change the username as different user logged in
    //   // helps to modify our /[username] endpoint 
    //   session.user.name = myuser.name

    //   return session
    // }
  }
})

export { authoptions as GET, authoptions as POST };