import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export function ProtectedRoute({ children, ...rest }) {
  const { isAuth } = useSelector((store) => ({ isAuth: store.user.isAuth }))

  // const init = async () => {
  //   await getUser()
  // }

  // useEffect(() => {
  //   init()
  // }, [])

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
