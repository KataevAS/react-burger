import React, { useCallback, useMemo } from 'react'
import OrderCard from '../OrderCard'
import styles from './OrderFeed.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from '../../utils/typedHooks'

interface LooseObject {
  [key: string]: string
}

export const OrderFeed = () => {
  const location = useLocation()

  const orders = useSelector((store) => store.onlineOrders.orders)

  const buns = useSelector((store) => store.ingredients.buns)
  const sauce = useSelector((store) => store.ingredients.sauce)
  const mains = useSelector((store) => store.ingredients.mains)

  const ingredients = useMemo(() => [...buns, ...sauce, ...mains], [buns, sauce, mains])

  const getPriceOrder = useCallback(
    (ingredientsId: string[]) => {
      return ingredientsId.reduce((acc: number, item) => {
        const ing = ingredients.find((ing) => ing._id === item)
        let price: number = 0
        if (ing) {
          price = ing.type === 'bun' ? ing.price * 2 : ing.price
        }
        if (price) {
          acc += price
        }
        return acc
      }, 0)
    },
    [ingredients]
  )

  const images = ingredients.reduce((acc: LooseObject, item) => {
    acc[item._id] = item.image
    return acc
  }, {})

  return (
    <article className={`${styles.orderFeed}`}>
      <section className={`${styles.cards} pr-2`}>
        {orders.length > 0 &&
          orders.map(({ id, name, number, ingredients, createdAt }) => (
            <Link
              key={id}
              to={{
                pathname: `/feed/${id}`,
                state: { background: location },
              }}>
              <OrderCard
                orderNumber={number}
                name={name}
                ingredients={ingredients.map((id) => images[id])}
                createdAt={createdAt}
                price={getPriceOrder(ingredients)}
              />
            </Link>
          ))}
      </section>
    </article>
  )
}
