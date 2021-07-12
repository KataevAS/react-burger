import React from 'react';

import AppHeader from '../AppHeader';
import styles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';


export const App = () => {

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  )
}