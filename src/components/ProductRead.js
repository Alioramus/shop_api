import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'

const ProductRead = ({product, onRemove}) => {

  return (
    <Card>
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {product.name}
        </Typography>
        <p>Ilość: {product.amount}</p>
        <p>Cena: {product.amount * product.price}</p>
      </CardContent>
      <CardActions>
        <Button onClick={onRemove}>Usuń</Button>
      </CardActions>
    </Card>
  )
}

export default ProductRead