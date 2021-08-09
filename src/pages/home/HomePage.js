import React from 'react'
import BurgerIngredients from '../../components/BurgerIngredients'
import BurgerConstructor from '../../components/BurgerConstructor'
import styles from './HomePage.module.css'

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  )
}
