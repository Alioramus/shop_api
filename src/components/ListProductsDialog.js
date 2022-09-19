import * as React from 'react'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, } from '@mui/material'
import { Config } from '../setup'
import axios from 'axios'
import ProductRead from './ProductRead'

const ListProductsDialog = ({orderId, open, onClose}) => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [productDetails, setProductDetails] = useState({})

  useEffect(() => {
    const getProductDetails = (productId, check) => {
      axios(
        Config.api_url + '/products/' + productId
      ).then(result => {
        productDetails[productId] = result.data
        setProductDetails(productDetails)
        if (Object.keys(productDetails).length === check) {
          setIsLoading(false)
        }
        }
      )
    }
    axios(
      Config.api_url + '/orders/' + orderId + '/products'
    ).then(result => {
      setProducts(result.data.products)
      let check = result.data.products.length
      result.data.products.forEach(product => getProductDetails(product.productId, check))
    }).catch(reson => {
    })
  }, [orderId])

  return (

    <Dialog open={!!open} onClose={onClose}>
      <DialogTitle>Produkty</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Produkty z zamówienia.
        </DialogContentText>
        {!isLoading && products.map(product => <ProductRead key={product.productId} product={{
          name: productDetails[product.productId]?.name,
          price: productDetails[product.productId]?.price,
          amount: product.amount
        }}/>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  )
}
export default ListProductsDialog