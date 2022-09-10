import React, { useState } from 'react'

export const BucketContext = React.createContext({bucket: {}, addProduct: () => {}, removeProduct: () => {}})

const BucketProvider = ({children}) => {
  const [bucket, setBucket] = useState({})
  const addProduct = (product, newAmount) => {
    let newBucket = {...bucket }
    newBucket[product.name] = {...product, amount: product.name in bucket ? bucket[product].amount + newAmount : newAmount}
    setBucket(newBucket)
  }
  const removeProduct = (productName) => {
    let newBucket = {...bucket }
    delete newBucket[productName]
    setBucket(newBucket)
  }

  return <BucketContext.Provider value={{bucket, addProduct, removeProduct}}>{children}</BucketContext.Provider>
}

export default BucketProvider