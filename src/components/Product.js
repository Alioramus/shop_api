import { Card, CardActions, CardContent, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useState } from 'react'

const Product = ({product, canRemove, onBuy, onRemove}) => {
  const [amount, setAmount] = useState(1)

  return (
    <Card>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {product.name}
        </Typography>
       <Button onClick={() => setAmount(amount + 1)}>+</Button>
        <p>{amount}</p>
        <Button onClick={() => {
          if (amount > 1) {
            setAmount(amount - 1)
          }
        }}>-</Button>
        <p>Cena: {amount * product.price}</p>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onBuy(product, amount)}>Dodaj do koszyka</Button>
        {canRemove &&<Button size="small" onClick={() => onRemove(product, amount)}>Usuń przedmiot</Button>}
      </CardActions>
    </Card>
  )
}

export default Product