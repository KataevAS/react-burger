import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react'
import styles from './BurgerConstructor.module.css';


const BurgerConstructor = () => {


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
            <li>
              <ConstructorElement
                text="Биокотлета из марсианской Магнолии"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
              />
            </li>
            <li>
              <ConstructorElement
                text="Соус Spicy-X"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/sauce-02.png"}
              />
            </li>
            <li>
              <ConstructorElement
                text="Мясо бессмертных моллюсков Protostomia"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/meat-02.png"}
              />
            </li>
            <li>
              <ConstructorElement
                text="Соус традиционный галактический"
                price={50}
                thumbnail={"https://code.s3.yandex.net/react/code/sauce-03.png"}
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


export { BurgerConstructor };