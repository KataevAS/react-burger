import React, { FC } from 'react'
import { useSelector as selectorHook, TypedUseSelectorHook } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { RootState } from '../services/redux/store'

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

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
