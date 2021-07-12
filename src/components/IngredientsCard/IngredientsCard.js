import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './IngredientsCard.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


function areEqual(prevProps, nextProps) {
  return (
    prevProps.type === nextProps.type &&
    prevProps.index === nextProps.index &&
    prevProps.name === nextProps.name &&
    prevProps.image === nextProps.image &&
    prevProps.id === nextProps.id
  )
}


export const IngredientsCard = React.memo(({ type, index, name, image, price, id, onIngredientCardClick }) => {

  const counter = useSelector(store => {
    if (type === 'bun' && store.currentIngredients.bun?.id === id) {
      return 1;
    } else {
      let count = 0;
      store.currentIngredients.all.forEach(item => {
        item.id === id && ++count;
      });
      return count
    }
  });

  const onHandleClick = (e) => {
    e.stopPropagation();
    onIngredientCardClick(type, index, price, id, name, image);
  }


  return (
    <>
      <div className={styles.box} onClick={onHandleClick}>
        {counter > 0 && <Counter count={counter} />}
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
}, areEqual)


IngredientsCard.propTypes = {

  "type": PropTypes.string.isRequired,
  "index": PropTypes.number.isRequired,
  "name": PropTypes.string.isRequired,
  "image": PropTypes.string,
  "price": PropTypes.number.isRequired,
  "id": PropTypes.string.isRequired,
  onIngredientCardClick: PropTypes.func.isRequired
};