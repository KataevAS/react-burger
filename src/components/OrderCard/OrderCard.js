import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { formatDate } from '../../utils/functions/formatDate'
import styles from './OrderCard.module.css'

export const OrderCard = React.memo(({ orderNumber, name, ingredients, createdAt, status, price }) => {
  const date = formatDate(createdAt)

  return (
    <div className={`${styles.card} p-6 mt-4`}>
      <h3 className={`${styles.orderInfo} text text_type_digits-default`}>
        {orderNumber}
        <span className={`text_type_main-default text_color_inactive`}>{date}</span>
      </h3>
      <h2 className={`text text_type_main-medium mt-6`}>{name}</h2>
      {status && <p className={`text text_type_main-default mt-2`}>{status}</p>}
      <div className={`${styles.preview} mt-6`}>
        <div className={`${styles.images}`}>
          {ingredients.map(
            (image, index) =>
              index >= 0 &&
              index < 6 && (
                <img
                  alt={name}
                  src={image}
                  className={`${styles.img} ${index > 0 && styles.nextImg}`}
                  key={index}
                  style={{ zIndex: 10 - index }}
                />
              )
          )}
          {ingredients.length > 6 && (
            <span className={`${styles.moreImg} text text_type_digits-default`}>+{ingredients.length - 6}</span>
          )}
        </div>
        <div className={`${styles.totalPrice} text text_type_digits-default`}>
          <span className={`mr-2`}>{price}</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
})
