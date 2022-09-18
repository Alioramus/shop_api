import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Product from '../components/Product'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useBucket from '../contexts/useBucket'
import { useSearchParams } from 'react-router-dom'
import { Config } from '../setup'
import useUser from '../contexts/useUser'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Select,
  Snackbar,
  TextField
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'

const ItemList = styled(Grid)(({theme}) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3)
}))
let ProductsList = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState({})
  const [categoriesList, setCategoriesList] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const {addProduct} = useBucket()
  const [snackbarMsg, setSnackbarMsg] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [categoryNew, setCategoryNew] = useState(null)
  const [price, setPrice] = useState(0)
  const [searchParams,] = useSearchParams()
  const {user} = useUser()

  useEffect(() => {
    setIsLoading(true)
    const category = searchParams.get('category')
    axios(
      Config.api_url + '/products' + (category != null ? '?category=' + category : ''),
    ).then(result => {
      setProducts(result.data)
      setIsLoading(false)
      setRefresh(false)
    }).catch(reson => {
      setIsLoading(false)
      setError(reson)
    })
  }, [searchParams, refresh])

  useEffect(() => {
    axios(
      Config.api_url + '/categories',
    ).then(result => {
      const test = new Map(result.data.map(i => [i.id, i.name]))
      setCategories(test)
      setCategoriesList(result.data)
    }).catch(reson => {
      setError(reson)
    })
  }, [])
  const handleClose = () => {
    setDialogOpen(false)
  }

  const addNewProduct = () => {
    axios.post(Config.api_url + '/products', {
      name: name,
      description: description,
      category: categoryNew,
      price: price
    }).then(() => {
        setDialogOpen(false)
        setRefresh(true)
        setSnackbarMsg('Produkt dodany')
    }
    ).catch((err) => {
      setDialogOpen(false)
      setSnackbarMsg('Nie udało się dodać produktu. Proszę spróbuj ponownie.')
    })
    setName("")
    setDescription("")
    setCategoryNew(null)
    setPrice(0)
  }

  const removeProduct = (id) => {
    axios.delete(Config.api_url + '/products/' + id).then(() => {
        setRefresh(true)
        setSnackbarMsg('Produkt usuniety')
      }
    ).catch((err) => {
      setSnackbarMsg('Nie udało się usunąć produktu. Proszę spróbuj ponownie.')
    })
  }

  return (
    <>
      {error
      && (<p>{error}</p>)}
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error &&
      <ItemList container spacing={4}>
        {products.map(product =>
          <Grid item xs={3} key={product.name}>
            <Product product={product} canRemove={user.isAdmin} onBuy={addProduct} onRemove={() => removeProduct(product.id)} key={product.name}/>
          </Grid>
        )}
      </ItemList>}
      {user.isAdmin && (<>
        <Button onClick={() => setDialogOpen(true)}>Add product</Button>
        {dialogOpen &&
        <Dialog open={dialogOpen} onClose={handleClose}>
          <DialogTitle>Add product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Here you can add a new product and set the price.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Product name"
              fullWidth
              variant="standard"
              value={name}
              onChange={event => setName(event.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Product description"
              fullWidth
              variant="standard"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryNew}
              label="Product category"
              fullWidth
              onChange={event => setCategoryNew(event.target.value)}
            >
              {categoriesList.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
            </Select>
            <TextField
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              value={price}
              onChange={event => setPrice(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addNewProduct}>Add</Button>
          </DialogActions>
        </Dialog>

        }
      </>)}
      <Snackbar
        open={!!snackbarMsg}
        autoHideDuration={6000}
        onClose={() => setSnackbarMsg(null)}
        message={snackbarMsg}
      />
    </>
  )
}
export default ProductsList
