import * as React from 'react';
import useUser from '../contexts/useUser'


const LoggedInOnly = ({children}) => {
  const {user} = useUser();

  return (
    <>
      {user.isLoggedIn ? children : <p>Zaloguj się aby zobaczyć tą stronę.</p>}
    </>
  );
};
export default LoggedInOnly;