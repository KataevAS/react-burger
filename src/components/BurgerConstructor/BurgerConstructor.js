import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useContext, useState } from 'react';

import styles from './BurgerConstructor.module.css';
import Modal from '../Modal';
import OrderDetails from '../OrderDetails';
import { IngredientsContext } from '../../services/igredientsContext';


const URL_GET_ORDER = 'https://norma.nomoreparties.space/api/orders';


const BurgerConstructor = () => {

  const [order, setOrder] = useState('');
  const [modalStatus, setModalStatus] = useState(false);

  const { ingredients } = useContext(IngredientsContext);

  const currentBun = React.useMemo(() => ingredients.filter(item => (item.type === 'bun' && item.counter > 0))[0], [ingredients]);
  const currentIngredients = React.useMemo(() => ingredients.filter(item => (item.type !== 'bun' && item.counter > 0)), [ingredients]);
  const totalPrice = React.useMemo(() => currentIngredients.reduce((acc, item) => acc += item.price * item.counter, 0), [currentIngredients]) + currentBun.price * 2;

  // Функции обработчики
  const onCloseModal = () => {
    setModalStatus(false);
  }

  const onOpenModal = async () => {
    setModalStatus(true);

    try {
      const res = await fetch(URL_GET_ORDER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
          ingredients: [
            currentBun._id,
            currentBun._id,
            ...currentIngredients.reduce((acc, item) => {
              for (let i = 0; i < item.counter; i++) {
                acc.push(item._id);
              }
              return acc
            }, [])
          ]
        })
      });
      if (!res.ok) {
        throw new Error('Ошибка HTTP: ' + res.status);
      }
      const data = await res.json();
      setOrder(data.order.number);
    } catch (error) {
      console.log('Возникла проблема с fetch запросом: ', error.message);
    }
  }

  // Вспомогательные функции для построения JSX
  const renderCurrentIngredients = React.useMemo(() => {
    return currentIngredients.reduce((acc, ing) => {
      const addIng = (ing, count) => (
        <li className={`${styles.constructorElem}`} key={`${ing._id}${count}`}>
          <div className={`${styles.dragIcon}`}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text={ing.name}
            price={ing.price}
            thumbnail={ing.image}
          />
        </li>
      )

      if (ing.counter > 1) {
        for (let i = 0; i < ing.counter; i++) {
          acc.push(addIng(ing, i));
        }
      } else {
        acc.push(addIng(ing, 0));
      }

      return acc
    }, [])
  }, [currentIngredients])


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
          (currentBun || currentIngredients) &&
          <>
            <div className={`${styles.constructor} mt-25`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {
                currentBun &&
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${currentBun.name} (верх)`}
                  price={currentBun.price}
                  thumbnail={currentBun.image}
                />
              }
              <div className={`${styles.scrollBox} pr-2`}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {currentIngredients.length > 0 && renderCurrentIngredients}
                </ul>
              </div>
              {
                currentBun &&
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${currentBun.name} (низ)`}
                  price={currentBun.price}
                  thumbnail={currentBun.image}
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