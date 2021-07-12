import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';

import styles from './BurgerConstructor.module.css';
import Modal from '../Modal';
import OrderDetails from '../OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCurrentIngredients, getOrder } from '../../services/actions';



const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [modalStatus, setModalStatus] = useState(false);

  const { bun, ingredients, order } = useSelector(store => ({
    bun: store.currentIngredients.bun,
    ingredients: store.currentIngredients.all,
    order: store.currentIngredients.order
  }));

  const totalPrice = (bun?.price * 2) + ingredients.reduce((acc, item) => acc += item.price, 0);

  const onCloseModal = () => {
    setModalStatus(false);
  }

  const onOpenModal = () => {
    setModalStatus(true);
    dispatch(getOrder([bun.id, bun.id, ...ingredients.map(item => item.id)]));
  }

  const onHandleClose = (uniqId) => {
    dispatch(deleteCurrentIngredients(uniqId));
  }


  return (
    <>
      {
        modalStatus && order &&
        <Modal onHandleClose={onCloseModal} >
          <OrderDetails order={order} />
        </Modal>
      }
      <section className={`${styles.box} ml-10 pl-4 pr-4`}>
        {
          (bun || ingredients) &&
          <>
            <div className={`${styles.constructor} mt-25`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {
                bun &&
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              }
              <div className={`${styles.scrollBox} pr-2`}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {ingredients.map(ing => (
                    <li className={`${styles.constructorElem}`} key={ing.uniqId}>
                      <div className={`${styles.dragIcon}`}>
                        <DragIcon type="primary" />
                      </div>
                      <ConstructorElement
                        text={ing.name}
                        price={ing.price}
                        thumbnail={ing.image}
                        handleClose={() => onHandleClose(ing.uniqId)}
                      />
                    </li>
                  ))
                  }
                </ul>
              </div>
              {
                bun &&
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              }
            </div>
            <div className={`${styles.totalPrice} mt-10`}>
              <div className={`${styles.totalPriceBox} mr-10`}>
                <span className={`text text_type_digits-medium mr-2`}>
                  {
                    totalPrice || 0
                  }
                </span>
                <CurrencyIcon type="primary" />
              </div>
              <Button type="primary" size="large" onClick={onOpenModal}>
                Оформить заказ
              </Button>
            </div>
          </>
        }
      </section>
    </>
  )
}


export { BurgerConstructor };