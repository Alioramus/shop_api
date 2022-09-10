import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Product from '../components/Product'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useBucket from '../contexts/useBucket'
import { useSearchParams } from 'react-router-dom'
import { Config } from '../setup'

const ItemList = styled(Grid)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3)
}))
let ProductsList = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const {addProduct} = useBucket()
  const [searchParams,] = useSearchParams()

  useEffect(() => {
    setIsLoading(true)
    const category = searchParams.get('category')
    axios(
      Config.api_url + '/products' + (category != null ? '?category=' + category : ''),
    ).then(result => {
      setProducts(result.data)
      setIsLoading(false)
    }).catch(reson => {
      setIsLoading(false);
      setError(reson);
    })
  }, [searchParams])

  return (
    <>
      {error
      && (<p>{error}</p>)}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error &&
      <ItemList container spacing={4}>
        {products.map(product =>
          <Grid item xs={3} key={product.name}>
            <Product product={product} onBuy={addProduct} key={product.name}/>
          </Grid>
        )}
      </ItemList>}
    </>
)
}
export default ProductsList
