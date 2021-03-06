import React from 'react'
import { useSelector } from 'react-redux'
import { useDrag } from 'react-dnd'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './IngredientsCard.module.css'
import PropTypes from 'prop-types'
import { useLocation, Link } from 'react-router-dom'

export const IngredientsCard = React.memo(({ type, index, name, image, price, id, onIngredientCardClick }) => {
  const location = useLocation()

  const counter = useSelector((store) => {
    if (type === 'bun' && store.currentIngredients.bun?.id === id) {
      return 2
    } else {
      let count = 0
      store.currentIngredients.all.forEach((item) => {
        item.id === id && ++count
      })
      return count
    }
  })

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { type, price, id, name, image },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  })

  return (
    <div onClick={() => onIngredientCardClick(type, index)} className={styles.box} ref={dragRef} data-cy={type + index}>
      <Link
        to={{
          pathname: `/ingredients/${id}`,
          state: { background: location },
        }}>
        {counter > 0 && <Counter count={counter} />}
        <div className={`${styles.ingredientsCard}`}>
          <img src={image} alt={name} className={`ml-4 mr-4`} />
          <div className={`${styles.price} mt-1 mb-1`}>
            <span className={`text text_type_digits-default mr-1`}>{price}</span>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`${styles.cardName} text text_type_main-default`}>{name}</p>
        </div>
      </Link>
    </div>
  )
})

IngredientsCard.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onIngredientCardClick: PropTypes.func.isRequired,
}
