import React, { useEffect, useReducer } from 'react';
import AppHeader from '../AppHeader';
import styles from './App.module.css';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';
import { IngredientsContext } from '../../services/igredientsContext';


const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';


export const App = () => {

  function reducer(state, action) {
    switch (action.type) {

      case "setIngredients":
        const IndexInitialBun = action.ingredients.findIndex(i => i.type === 'bun');
        return ([
          ...action.ingredients.slice(0, IndexInitialBun),
          { ...action.ingredients[IndexInitialBun], counter: 1 },
          ...action.ingredients.slice(IndexInitialBun + 1, action.ingredients.length)
        ])

      case "incrementIngredients":
        return state.map(item => item._id === action.id ? { ...item, counter: item.counter + 1 } : item);

      case "decrementIngredients":
        return state.map(item => item._id === action.id ? { ...item, counter: item.counter > 0 ? item.counter - 1 : 0 } : item);

      case "changeBun":
        return state.map(item => {
          if (item.type === 'bun' && item._id === action.id) {
            return { ...item, counter: 1 }
          } else if (item.type === 'bun' && item._id !== action.id) {
            return { ...item, counter: 0 }
          } else {
            return item
          }
        })

      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [ingredients, setIngredients] = useReducer(reducer, []);




  useEffect(() => {

    const getData = async () => {
      try {
        const res = await fetch(URL_INGREDIENTS);
        if (!res.ok) {
          throw new Error('Ошибка HTTP: ' + res.status);
        }
        const data = await res.json();
        setIngredients({ type: 'setIngredients', ingredients: data.data.map(ing => ({ ...ing, counter: 0 })) });
      } catch (error) {
        console.log('Возникла проблема с fetch запросом: ', error.message);
      }
    }

    getData();

  }, [])

  return (
    <>
      <AppHeader />
      <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
        {
          ingredients.length > 0 &&
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        }
      </IngredientsContext.Provider>
    </>
  )
}