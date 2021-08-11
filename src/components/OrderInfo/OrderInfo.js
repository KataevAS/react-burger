import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import { formatDate } from '../../utils/functions/formatDate'
import styles from './OrderInfo.module.css'

export const OrderInfo = ({ type }) => {
  return (
    <article className={`${styles.OrderInfo} text text_type_main-default mt-15`}>
      <p className={`${type === 'page' && styles.titleForPage} text_type_digits-default`}>#034533</p>
      <h2 className={`text_type_main-medium mt-10`}>Black Hole Singularity острый бургер</h2>
      <p className={`${styles.statusText} text_type_main-default mt-3`}>Выполнен</p>
      <h2 className={`mt-10`}>Состав:</h2>
      <div className={`${styles.cards} mt-6 pr-6 mb-10`}>
        <div className={`${styles.card} mb-4`}>
          <img className={`${styles.cardImg} mr-4`} src='https://code.s3.yandex.net/react/code/bun-01.png' alt='img' />
          <p className={`mr-4`}>Флюоресцентная булка R2-D3</p>
          <p className={`${styles.price}`}>
            <span className={`mr-2 text_type_digits-default`}>2 x 20</span>
            <CurrencyIcon />
          </p>
        </div>
        <div className={`${styles.card} mb-4`}>
          <img className={`${styles.cardImg} mr-4`} src='https://code.s3.yandex.net/react/code/bun-01.png' alt='img' />
          <p className={`mr-4`}>Флюоресцентная булка R2-D3</p>
          <p className={`${styles.price}`}>
            <span className={`mr-2 text_type_digits-default`}>2 x 20</span>
            <CurrencyIcon />
          </p>
        </div>
        <div className={`${styles.card} mb-4`}>
          <img className={`${styles.cardImg} mr-4`} src='https://code.s3.yandex.net/react/code/bun-01.png' alt='img' />
          <p className={`mr-4`}>Флюоресцентная булка R2-D3</p>
          <p className={`${styles.price}`}>
            <span className={`mr-2 text_type_digits-default`}>2 x 20</span>
            <CurrencyIcon />
          </p>
        </div>
        <div className={`${styles.card} mb-4`}>
          <img className={`${styles.cardImg} mr-4`} src='https://code.s3.yandex.net/react/code/bun-01.png' alt='img' />
          <p className={`mr-4`}>Флюоресцентная булка R2-D3</p>
          <p className={`${styles.price}`}>
            <span className={`mr-2 text_type_digits-default`}>2 x 20</span>
            <CurrencyIcon />
          </p>
        </div>
        <div className={`${styles.card} mb-4`}>
          <img className={`${styles.cardImg} mr-4`} src='https://code.s3.yandex.net/react/code/bun-01.png' alt='img' />
          <p className={`mr-4`}>Флюоресцентная булка R2-D3</p>
          <p className={`${styles.price}`}>
            <span className={`mr-2 text_type_digits-default`}>2 x 20</span>
            <CurrencyIcon />
          </p>
        </div>
      </div>
      <div className={`${styles.totalPrice}`}>
        <p className={`text_color_inactive`}>{formatDate('2021-06-23T14:43:22.587Z')}</p>
        <p className={`${styles.price}`}>
          <span className={`mr-2 text_type_digits-default`}>510</span>
          <CurrencyIcon />
        </p>
      </div>
    </article>
  )
}
