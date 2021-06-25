import React from 'react';
import AppHeader from '../AppHeader';
import BurgerConstructor from '../BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients';
import styles from './App.module.css';
import {  data  } from '../../utils/data.js';

export const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>       
        <BurgerConstructor ingredients={data} />
        <BurgerIngredients />
      </main>
    </>
  )
}