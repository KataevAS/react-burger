import React from 'react'
import styles from './NumbersOrderFeed.module.css'
import { useSelector } from '../../utils/typedHooks'

export const NumbersOrderFeed = () => {
  const onlineOrders = useSelector((store) => store.onlineOrders)
  const orders = onlineOrders.orders

  const doneOrders = orders
    .reduce<number[]>((acc, order) => {
      if (order.status === 'done') {
        acc.push(order.number)
      }
      return acc
    }, [])
    .reverse()

  const createdOrders = orders
    .reduce<number[]>((acc, order) => {
      if (order.status === 'created') {
        acc.push(order.number)
      }
      return acc
    }, [])
    .reverse()

  return (
    <article className={`${styles.ordersFeedOnline} ml-15`}>
      <section className={`${styles.orders} mb-5`}>
        <div className={`${styles.ordersWindow} text text_type_digits-default`}>
          <h3 className={`${styles.readyOrdersTitle} text text_type_main-medium mr-9 mb-6`}>Готовы:</h3>
          <div className={`${styles.ordersItem} ${styles.ordersItemReady} text text_type_digits-default`}>
            {doneOrders.map((item) => (
              <p key={item} className={`${styles.orderItem} mb-2`}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className={`${styles.ordersWindow} text text_type_digits-default`}>
          <h3 className={`${styles.readyOrdersTitle} text text_type_main-medium mr-9 mb-6`}>Готовы:</h3>
          <div className={`${styles.ordersItem} ${styles.ordersItemReady} text text_type_digits-default`}>
            {createdOrders.map((item) => (
              <p key={item} className={`${styles.orderItem} mb-2`}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h3 className={`text text_type_main-medium mb-5`}>Выполнено за все время:</h3>
        <p className={`${styles.total} text text_type_digits-large`}>{onlineOrders.total}</p>
      </section>
      <section>
        <h3 className={`text text_type_main-medium mb-5`}>Выполнено за сегодня:</h3>
        <p className={`${styles.total} text text_type_digits-large`}>{onlineOrders.totalToday}</p>
      </section>
    </article>
  )
}
