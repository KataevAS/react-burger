import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react'
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';


const BurgerConstructor = (props) => {

  return (
    <section className={`${styles.box} ml-10 pl-4 pr-4`}>
      <div className={`mt-25`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
        <div className={`${styles.scrollBox} pr-2`}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li className={`${styles.constructorElem}`}>
              <div className={`${styles.dragIcon}`}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={props.ingredients[3].name}
                price={props.ingredients[3].price}
                thumbnail={props.ingredients[3].image}
              />
            </li>
            <li className={`${styles.constructorElem}`}>
              <div className={`${styles.dragIcon}`}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={props.ingredients[4].name}
                price={props.ingredients[4].price}
                thumbnail={props.ingredients[4].image}
              />
            </li>
            <li className={`${styles.constructorElem}`}>
              <div className={`${styles.dragIcon}`}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={props.ingredients[5].name}
                price={props.ingredients[5].price}
                thumbnail={props.ingredients[5].image}
              />
            </li>
            <li className={`${styles.constructorElem}`}>
              <div className={`${styles.dragIcon}`}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={props.ingredients[6].name}
                price={props.ingredients[6].price}
                thumbnail={props.ingredients[6].image}
              />
            </li>
          </ul>
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
        />
      </div>
      <div className={`${styles.totalPrice} mt-10`}>
        <div className={`${styles.totalPriceBox} mr-10`}>
          <span className={`text text_type_digits-medium mr-2`}>123</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}


BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
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
  }))
};


export { BurgerConstructor };