import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { Config } from '../setup'

let CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    axios(
      Config.api_url + '/categories'
    ).then(result => {
      setCategories(result.data)
      setIsLoading(false)
    }).catch(reson => {
      setIsLoading(false);
      setError(reson);
    })
  }, [])
  return (
    <>
      <h2>Categories</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error &&
      <div>
        {categories.map(category =>
          <Button key={category} component={Link} to={"/products?category=" + category}>
            {category}
          </Button>)}
      </div>
      }
    </>
  )
}
export default CategoriesList
