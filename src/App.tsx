import React from 'react';
import AppHeader from './components/AppHeader';
import BurgerConstructor from './components/BurgerConstructor';
import BurgerIngredients from './components/BurgerIngredients';
import styles from './App.module.css';
import {  data  } from './utils/data.js';

function App() {
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

export default App;