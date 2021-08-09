import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { compose } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom'

import { rootReducer } from '../../services/reducers'
import AppHeader from '../AppHeader'
import LoginPage from '../../pages/login/'
import RegistrationPage from '../../pages/registration/'
import ForgotPasswordPage from '../../pages/forgot-password'
import ResetPasswordPage from '../../pages/reset-password'
import FeedPage from '../../pages/feed'
import ProfilePage from '../../pages/profile'
import IngredientsPage from '../../pages/ingredients'
import { ProtectedRoute } from '../ProtectedRoute'
import HomePage from '../../pages/home'
import IngredientDetails from '../IngredientDetails'
import Modal from '../Modal'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(rootReducer, enhancer)

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <AppWrapper />
        </Router>
      </Provider>
    </>
  )
}

const AppWrapper = () => {
  const location = useLocation()
  const history = useHistory()
  let background

  if (history.action === 'PUSH') {
    background = location.state && location.state.background
  }

  const closeModal = (e) => {
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
        <Route path='/ingredients/:id'>
          <IngredientsPage />
        </Route>
      </Switch>
      {background && (
        <Route path='/ingredients/:id'>
          <Modal title={'Детали ингредиента'} onHandleClose={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  )
}
