import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Config } from '../setup'
import useUser from '../contexts/useUser'
import { TextField } from '@mui/material'

let PromotionsList = () => {
  const [promotions, setPromotions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [error, setError] = useState(null)
  const [newName, setNewName] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const {user} = useUser()

  useEffect(() => {
    setIsLoading(true)
    axios(
      Config.api_url + '/promotions'
    ).then(result => {
      setPromotions(result.data)
      setIsLoading(false)
      setRefresh(false)
    }).catch(reson => {
      setIsLoading(false);
      setError(reson);
    })
  }, [refresh])

  const addPromotion = () => {
    axios.post(Config.api_url + "/promotions", {name: newName, description: newDescription}).then(result => {
      setNewName("")
      setNewDescription("")
      setRefresh(true)
    })
  }

  return (
    <>
      <h2>Promotions</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error &&
      <div>
        {promotions.map(promotion =>
          <div><h3 key={promotion.id}>
            {promotion.name + ": " + promotion.description}
          </h3></div>)}
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
        <Button onClick={addPromotion}>Dodaj</Button>
      </div>}
    </>
  )
}
export default PromotionsList
