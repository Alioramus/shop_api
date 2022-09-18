import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Config } from '../setup'

export const UserContext = React.createContext({user: {}, refresh: () => {}})

const UserProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [toRefresh, setToRefresh] = useState(false)
  const refresh = () => {
    setToRefresh(true)
  }

  useEffect(() => {
    axios(
      Config.api_url + '/me'
    ).then(result => {
      setUser(result.data)
      setToRefresh(false)
    })
  }, [])

  return <UserContext.Provider value={{user, refresh}}>{children}</UserContext.Provider>
}

export default UserProvider