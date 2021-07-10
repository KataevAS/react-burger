import React, { useContext, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';
import IngredientsCard from '../IngredientsCard';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';
import { IngredientsContext } from '../../services/igredientsContext';


const BurgerIngredients = () => {

  const [current, setCurrent] = useState('bun');

  const [modalStatus, setModalStatus] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  const { ingredients, setIngredients } = useContext(IngredientsContext);

  const onCloseModal = () => {
    setModalStatus(false);
  }

  const onIngredientCardClick = (type, name, image, calories, proteins, carbohydrates, fat, _id) => {
    setCurrentIngredient({
      name,
      image,
      calories,
      proteins,
      carbohydrates,
      fat
    })
    setModalStatus(true);

    type === 'bun'
      ? setIngredients({ type: 'changeBun', id: _id })
      : setIngredients({ type: 'incrementIngredients', id: _id })
  }

  const onHandleClick = (name) => {
    setCurrent(name);
  }

  const buns = React.useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
  const sauce = React.useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);
  const mains = React.useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

  return (
    <>
      {
        modalStatus &&
        <Modal onHandleClose={onCloseModal} title={'Детали ингредиента'}>
          <IngredientDetails
            image={currentIngredient.image}
            name={currentIngredient.name}
            calories={currentIngredient.calories}
            proteins={currentIngredient.proteins}
            carbohydrates={currentIngredient.carbohydrates}
            fat={currentIngredient.fat}
          />
        </Modal>
      }
      <section className={styles.box}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
        <div className={`mb-10`} style={{ display: 'flex' }}>
          <Tab value="bun" active={current === 'bun'} onClick={onHandleClick}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={onHandleClick}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={onHandleClick}>
            Начинки
          </Tab>
        </div>
        <div className={`${styles.ingredientsBox}`}>
          <h2 className={`text text_type_main-medium`}>Булки</h2>
          <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
            {buns.map(item => <IngredientsCard ing={item} key={item._id} onIngredientCardClick={onIngredientCardClick} />)}
          </article>
          <h2 className={`text text_type_main-medium`}>Соусы</h2>
          <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
            {sauce.map(item => <IngredientsCard ing={item} key={item._id} onIngredientCardClick={onIngredientCardClick} />)}
          </article>
          <h2 className={`text text_type_main-medium`}>Начинки</h2>
          <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
            {mains.map(item => <IngredientsCard ing={item} key={item._id} onIngredientCardClick={onIngredientCardClick} />)}
          </article>
        </div>
      </section>
    </>

  )
}


export { BurgerIngredients };