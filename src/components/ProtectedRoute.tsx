import React, { FC } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from '../utils/typedHooks'

interface IProtectedRoute {
  path: string | undefined
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const { isAuth } = useSelector((store) => ({ isAuth: store.user.isAuth }))

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
