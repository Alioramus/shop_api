import { useEffect, useState } from 'react'
import axios from 'axios'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Config } from '../setup'

let OrdersList = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    axios(
      Config.api_url + '/orders'
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
              <TableCell>Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{new Date(Date.parse(order.purchase_time)).toString()}</TableCell>
                <TableCell component="th" scope="row">{order.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </>
)
}
export default OrdersList
