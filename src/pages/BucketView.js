import useBucket from '../contexts/useBucket'
import { Button, Snackbar, TextareaAutosize, TextField } from '@mui/material'
import ProductRead from '../components/ProductRead'
import axios from 'axios'
import { useState } from 'react'
import { Config } from '../setup'

let BucketView = () => {
  const {bucket, removeProduct} = useBucket()
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("")

  const getBucketValue = () => {
    let value = 0
    Object.values(bucket).forEach(({amount, price}) =>  value += amount * price)
    return value
  }

  const confirmOrder = () => {
    axios.post(Config.api_url + '/orders', {
      products: Object.values(bucket).map(product => product.id),
      price: getBucketValue(),
      deliveryAddress: deliveryAddress
    }).then(
      setSnackbarMsg('Zamówienie potwierdzone!')
    ).catch((err) => {
      setSnackbarMsg('Zamówienie nieudane. Proszę spróbuj ponownie.')
    })
  }

  const handleSnackbarClose = () => {
    setSnackbarMsg(null)
  }

  const handleOrderClick = () => {
    if (getBucketValue() <= 0.01) {
      setSnackbarMsg("Dodaj produkty do koszyka.")
      return;
    }
    if (!deliveryAddress) {
      setSnackbarMsg("Podaj adres dostawy.")
      return;
    }
    confirmOrder()
  }

  return (
    <>
      <p>Cena: {getBucketValue()}</p>
      <div>
        <TextareaAutosize
          minRows={3}
          placeholder="Adres dostawy"
          style={{ width: 200 }}
          value={deliveryAddress}
          onChange={event => setDeliveryAddress(event.target.value)}
        />
      </div>
      <Button onClick={handleOrderClick}>Zatwierdź zamówienie</Button>
      <h3>Produkty</h3>
      {Object.values(bucket).map(product => (
        <>
          <ProductRead key={product.id} product={product} onRemove={() => removeProduct(product.name)}/>
        </>
      ))}
      <Snackbar
        open={!!snackbarMsg}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMsg}
      />
    </>
  )
}
export default BucketView