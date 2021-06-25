import React from 'react';
import AppHeader from '../AppHeader';
import styles from './App.module.css';
import {  data  } from '../../utils/data.js';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';


export const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>       
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor />
      </main>
    </>
  )
}