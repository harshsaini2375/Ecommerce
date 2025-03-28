import React from 'react'
import Itempage from '../Components/Itempage'

const page = async({params}) => {
    const name = (await params).productdetail
    // /%20/g , here g means it remove all %20
    const productname = name.replace(/%20/g, " ");
    return (
        <>
            <Itempage productname={productname} />
        </>
    )
}

export default page