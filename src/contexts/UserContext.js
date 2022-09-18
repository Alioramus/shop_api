import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Config } from '../setup'

export const UserContext = React.createContext({user: {}})

const UserProvider = ({children}) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    axios(
      Config.api_url + '/me'
    ).then(result => {
      setUser(result.data)
    })
  }, [])

  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>
}

export default UserProvider