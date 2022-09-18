import React from 'react';
import { UserContext } from './UserContext'

const useUser = () => {
  const userContext = React.useContext(UserContext)
  return userContext;
}

export default useUser