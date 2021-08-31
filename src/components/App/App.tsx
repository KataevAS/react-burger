import React, { useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom'

import AppHeader from '../AppHeader'
import LoginPage from '../../pages/login'
import RegistrationPage from '../../pages/registration'
import ForgotPasswordPage from '../../pages/forgot-password'
import ResetPasswordPage from '../../pages/reset-password'
import FeedPage from '../../pages/feed'
import ProfilePage from '../../pages/profile'
import IngredientsPage from '../../pages/ingredients'
import { ProtectedRoute } from '../ProtectedRoute'
import HomePage from '../../pages/home'
import IngredientDetails from '../IngredientDetails'
import Modal from '../Modal'
import OrderInfo from '../OrderInfo'
import { initStore } from '../../services/redux/store'
import { setIngredients, getUser, wsConnect, wsConnectionClosed } from '../../services/redux/actions'
import { useSelector, useDispatch } from '../../utils/typedHooks'

export const App = () => {
  return (
    <>
      <Provider store={initStore}>
        <Router>
          <AppWrapper />
        </Router>
      </Provider>
    </>
  )
}

interface IBackgroundLocation {
  background: {
    pathname: string
    search: string
    hash: string
    state: undefined
    key: string
  }
}

const AppWrapper = () => {
  const location = useLocation<IBackgroundLocation | undefined>()
  const history = useHistory()
  const dispatch = useDispatch()

  const isAuth = useSelector((store) => store.user.isAuth)

  let background

  if (history.action === 'PUSH') {
    background = location.state && location.state.background
  }

  useEffect(() => {
    if (!isAuth) {
      dispatch(getUser())
    }
  }, [dispatch, isAuth])

  useEffect(() => {
    dispatch(wsConnect())
    dispatch(setIngredients())
    return () => {
      dispatch(wsConnectionClosed())
    }
  }, [dispatch])

  const closeModal = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()
    history.goBack()
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/' exact>
          <DndProvider backend={HTML5Backend}>
            <HomePage />
          </DndProvider>
        </Route>
        <Route path='/login' exact>
          <LoginPage />
        </Route>
        <Route path='/register' exact>
          <RegistrationPage />
        </Route>
        <Route path='/forgot-password' exact>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password' exact>
          <ResetPasswordPage />
        </Route>
        <Route path='/feed/:id?' exact>
          <FeedPage />
        </Route>
        <ProtectedRoute path='/profile'>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/profile'>
          <OrderInfo type='page' />
        </ProtectedRoute>
        <Route path='/ingredients/:id'>
          <IngredientsPage />
        </Route>
      </Switch>
      {background && (
        <Switch>
          <Route path='/ingredients/:id'>
            <Modal title={'Детали ингредиента'} onHandleClose={closeModal}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path='/feed/:id'>
            <Modal onHandleClose={closeModal}>
              <OrderInfo type='modal' />
            </Modal>
          </Route>
          <ProtectedRoute path='/profile/orders/:id'>
            <Modal onHandleClose={closeModal}>
              <OrderInfo type='modal' />
            </Modal>
          </ProtectedRoute>
        </Switch>
      )}
    </>
  )
}
