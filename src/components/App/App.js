import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppHeader from '../AppHeader';
import styles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';



export const App = () => {

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </>
  )
}