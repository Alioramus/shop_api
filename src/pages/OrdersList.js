import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Config } from '../setup'
import ListProductsDialog from '../components/ListProductsDialog'

let OrdersList = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    axios(
      Config.api_url + '/me/orders'
    ).then(result => {
      setOrders(result.data)
      setIsLoading(false)
    }).catch(reson => {
      setIsLoading(false);
      setError(reson);
    })
  }, [])

  return (
    <>
      {error
      && (<p>{error}</p>)}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error &&
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Czas</TableCell>
              <TableCell>Adres dostawy</TableCell>
              <TableCell>Płatność</TableCell>
              <TableCell>Produkty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{new Date(Date.parse(order.date)).toString()}</TableCell>
                <TableCell component="th" scope="row">{order.deliveryAddress}</TableCell>
                <TableCell component="th" scope="row">
                  {order.paymentStatus === "open" ? <Button href={order.paymentUrl}>Zapłać</Button> : order.paymentStatus}
                </TableCell>
                <TableCell component="th" scope="row"><Button onClick={() => setSelectedOrder(order.id)}>Wyświetl</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
      {!!selectedOrder && <ListProductsDialog orderId={selectedOrder} open={selectedOrder} onClose={() => setSelectedOrder(null)}></ListProductsDialog>}
    </>
)
}
export default OrdersList
