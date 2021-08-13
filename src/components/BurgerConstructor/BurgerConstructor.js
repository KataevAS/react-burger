import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './BurgerConstructor.module.css'
import Modal from '../Modal'
import OrderDetails from '../OrderDetails'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeCurrentItemIndex,
  deleteCurrentIngredients,
  getOrder,
  setCurrentIngredients,
} from '../../services/redux/actions'
import { useDrop } from 'react-dnd'
import DraggableIngredient from '../DraggableIngredient'

export const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [dropIndex, setDropIndex] = useState(null)
  const [modalStatus, setModalStatus] = useState(false)

  const isAuth = useSelector((store) => store.user.isAuth)
  const { bun, ingredients, order } = useSelector((store) => ({
    bun: store.currentIngredients.bun,
    ingredients: store.currentIngredients.all,
    order: store.currentIngredients.order,
  }))

  const totalPrice = bun?.price * 2 + ingredients.reduce((acc, item) => (acc += item.price), 0)

  const onCloseModal = () => {
    setModalStatus(false)
  }

  const onOpenModal = () => {
    if (!isAuth) {
      history.push('/login')
    }
    setModalStatus(true)
    dispatch(getOrder([bun.id, bun.id, ...ingredients.map((item) => item.id)]))
  }

  const onHandleClose = (uniqId) => {
    dispatch(deleteCurrentIngredients(uniqId))
  }

  const [, dropTarget] = useDrop({
    accept: ['ingredient', 'currentIngredient'],
    drop(item) {
      if (item.type !== 'currentIngredient') {
        dispatch(setCurrentIngredients(item.type, item.price, item.id, item.name, item.image))
      }
    },
    canDrop: (item, collect) => {
      if (item.type === 'currentIngredient' && item.index !== dropIndex && collect.isOver()) {
        setDropIndex(item.index)
        dispatch(changeCurrentItemIndex(item))
      }
      return item
    },
  })

  const renderBunTop = useMemo(() => {
    if (bun) {
      return (
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )
    }
  }, [bun])

  const renderBunBot = useMemo(() => {
    if (bun) {
      return (
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${bun.name} (низ)}`}
          price={bun.price}
          thumbnail={bun.image}
        />
      )
    }
  }, [bun])

  return (
    <>
      {modalStatus && order && (
        <Modal onHandleClose={onCloseModal}>
          <OrderDetails order={order} />
        </Modal>
      )}
      <section className={`${styles.box} ml-10 pl-4 pr-4`} ref={dropTarget}>
        {(bun || ingredients) && (
          <>
            <div
              className={`${styles.constructor} mt-25`}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {bun && renderBunTop}
              <div className={`${styles.scrollBox} pr-2`}>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {ingredients.map((ing, index) => (
                    <DraggableIngredient
                      key={ing.uniqId}
                      uniqId={ing.uniqId}
                      index={index}
                      name={ing.name}
                      price={ing.price}
                      image={ing.image}
                      onHandleClose={onHandleClose}
                    />
                  ))}
                </ul>
              </div>
              {bun && renderBunBot}
            </div>
            <div className={`${styles.totalPrice} mt-10`}>
              <div className={`${styles.totalPriceBox} mr-10`}>
                <span className={`text text_type_digits-medium mr-2`}>{totalPrice || 0}</span>
                <CurrencyIcon type='primary' />
              </div>
              <Button type='primary' size='large' onClick={onOpenModal}>
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </section>
    </>
  )
}
