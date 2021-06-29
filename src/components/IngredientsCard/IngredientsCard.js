import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientsCard.module.css';
import PropTypes from 'prop-types';


export const IngredientsCard = (props) => {
  const { name, image, price, __v, calories, proteins, carbohydrates, fat } = props.ing;

  const onHandleClick = () => {
    props.onIngredientCardClick(name, image, calories, proteins, carbohydrates, fat);
  }


  return (
    <>
      <div className={styles.box} onClick={onHandleClick}>
        {__v > 0 && <Counter count={__v} />}
        <div className={`${styles.ingredientsCard}`}>
          <img src={image} alt={name} className={`ml-4 mr-4`} />
          <div className={`${styles.price} mt-1 mb-1`}>
            <span className={`text text_type_digits-default mr-1`}>{price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${styles.cardName} text text_type_main-default`}>
            {name}
          </p>
        </div>
      </div>
    </>

  )
}


IngredientsCard.propTypes = {
  ing: PropTypes.shape({
    "_id": PropTypes.string,
    "name": PropTypes.string.isRequired,
    "type": PropTypes.string,
    "proteins": PropTypes.number,
    "fat": PropTypes.number,
    "carbohydrates": PropTypes.number,
    "calories": PropTypes.number,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string,
    "image_mobile": PropTypes.string,
    "image_large": PropTypes.string,
    "__v": PropTypes.number,
  }).isRequired,
  onIngredientCardClick: PropTypes.func.isRequired
};