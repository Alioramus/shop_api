import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { Config } from '../setup'
import useUser from '../contexts/useUser'
import { TextField } from '@mui/material'

let CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [error, setError] = useState(null)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const {user} = useUser()

  useEffect(() => {
    setIsLoading(true)
    axios(
      Config.api_url + '/categories'
    ).then(result => {
      setCategories(result.data)
      setIsLoading(false)
      setRefresh(false)
    }).catch(reson => {
      setIsLoading(false);
      setError(reson);
    })
  }, [refresh])

  const addCategory = () => {
    axios.post(Config.api_url + "/categories", {name: newName, description: newDescription}).then(result => {
      setNewName("")
      setNewDescription("")
      setRefresh(true)
    })
  }

  return (
    <>
      <h2>Kategorie</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error &&
      <div>
        {categories.map(category =>
          <Button key={category.id} component={Link} to={"/products?category=" + category.id}>
            {category.name + ": " + category.description}
          </Button>)}
      </div>
      }
      {user.isAdmin && <div>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Product name"
          fullWidth
          variant="standard"
          value={newName}
          onChange={event => setNewName(event.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Product description"
          fullWidth
          variant="standard"
          value={newDescription}
          onChange={event => setNewDescription(event.target.value)}
        />
        <Button onClick={addCategory}>Dodaj</Button>
      </div>}
    </>
  )
}
export default CategoriesList
