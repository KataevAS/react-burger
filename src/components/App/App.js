import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { compose } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../../services/reducers';
import AppHeader from '../AppHeader';
import styles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';



const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);



export const App = () => {

  return (
    <>
      <AppHeader />
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      </Provider>
    </>
  )
}