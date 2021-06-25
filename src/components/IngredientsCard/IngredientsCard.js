import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientsCard.module.css';


export const IngredientsCard = (props) => {
  const { name, image, price, _id } = props.ing;

  return (
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
  )
}