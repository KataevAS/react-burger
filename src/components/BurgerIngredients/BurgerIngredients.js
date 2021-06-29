import React, { useState } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css';
import IngredientsCard from '../IngredientsCard';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';


const BurgerIngredients = (props) => {

  const [current, setCurrent] = useState('bun');

  const [modalStatus, setModalStatus] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);

  const onCloseModal = () => {
    setModalStatus(false);
  }

  const onIngredientCardClick = (name, image, calories, proteins, carbohydrates, fat) => {
    setCurrentIngredient({
      name,
      image,
      calories,
      proteins,
      carbohydrates,
      fat
    })
    setModalStatus(true);
  }

  const onHandleClick = (name) => {
    setCurrent(name);
  }

  const buns = React.useMemo(() => props.ingredients.filter(item => item.type === 'bun'), [props.ingredients]);
  const sauce = React.useMemo(() => props.ingredients.filter(item => item.type === 'sauce'), [props.ingredients]);
  const mains = React.useMemo(() => props.ingredients.filter(item => item.type === 'main'), [props.ingredients]);

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


BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "type": PropTypes.string.isRequired,
    "proteins": PropTypes.number,
    "fat": PropTypes.number,
    "carbohydrates": PropTypes.number,
    "calories": PropTypes.number,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string,
    "image_mobile": PropTypes.string,
    "image_large": PropTypes.string,
    "__v": PropTypes.number,
  }))
};


export { BurgerIngredients };