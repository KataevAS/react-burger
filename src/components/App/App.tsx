import React, { useEffect, useState } from 'react';
import AppHeader from '../AppHeader';
import styles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';

const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    
    const getData = async () => {
      try {
        const res = await fetch(URL_INGREDIENTS);
        if (!res.ok) {
          throw new Error('Ошибка HTTP: ' + res.status);
        }
        const data = await res.json();
        setIngredients(data.data);
      } catch (error) {
        console.log('Возникла проблема с fetch запросом: ', error.message);
      }      
    }

    getData();

  }, [])

  return (
    <>
      <AppHeader />
      {
        ingredients.length > 0 &&
        <main className={styles.main}>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients} />
        </main>
      }
    </>
  )
}