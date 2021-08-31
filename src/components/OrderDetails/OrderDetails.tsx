import React, { FC } from 'react'
import image from '../../utils/images/done.png'
import styles from './OrderDetails.module.css'
import PropTypes from 'prop-types'

interface IOrderDetailsProps {
  order: number
}

export const OrderDetails: FC<IOrderDetailsProps> = ({ order }) => (
  <div className={styles.box}>
    <p className={`text text_type_digits-large mt-30`}>{order}</p>
    <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
    <img src={image} alt='done' className={`mt-15`} />
    <p className={`text text_type_main-default mt-15`}>Ваш заказ начали готовить</p>
    <p className={`text text_type_main-default text_color_inactive mt-2 mb-15`}>
      Дождитесь готовности на орбитальной станции
    </p>
  </div>
)

OrderDetails.propTypes = {
  order: PropTypes.number.isRequired,
}
