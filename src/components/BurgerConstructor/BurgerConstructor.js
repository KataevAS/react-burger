import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react'
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import OrderDetails from '../OrderDetails';


const BurgerConstructor = (props) => {

  const [order] = useState('034536');
  const [modalStatus, setModalStatus] = useState(false);

  const onCloseModal = () => {
    setModalStatus(false);
  }

  const onOpenModal = () => {
    setModalStatus(true);
  }

  return (
    <>
      {
        modalStatus &&
        <Modal onHandleClose={onCloseModal} >
          <OrderDetails order={order} />
        </Modal>
      }
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
              {
                props.ingredients.map((ing, index) => {
                  if (index > 2 && index < 7) {
                    return (
                      <li className={`${styles.constructorElem}`} key={ing._id}>
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
                  } else {
                    return false;
                  }
                })
              }
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
          <Button type="primary" size="large" onClick={onOpenModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  )
}


BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ).isRequired
};


export { BurgerConstructor };