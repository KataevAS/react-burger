import React from 'react'
import styles from './NumbersOrderFeed.module.css'

export const NumbersOrderFeed = () => {
  return (
    <article className={`${styles.ordersFeedOnline} ml-15`}>
      <section className={`${styles.orders} mb-5`}>
        <div className={`${styles.ordersItem} ${styles.ordersItemReady} text text_type_digits-default`}>
          <h3 className={`${styles.readyOrdersTitle} text text_type_main-medium mr-9 mb-6`}>Готовы:</h3>
          <p className={`mb-2`}>034533</p>
          <p className={`mb-2`}>034533</p>
          <p className={`mb-2`}>034533</p>
          <p className={`mb-2`}>034533</p>
          <p className={`mb-2`}>034533</p>
        </div>
        <div className={`${styles.ordersItem} text text_type_digits-default`}>
          <h3 className={`text text_type_main-medium mb-6`}>В работе:</h3>
          <p className={`mb-2`}>034533</p>
          <p className={`mb-2`}>034533</p>
          <p className={`mb-2`}>034533</p>
          <p className={`mb-2`}>034533</p>
          <p className={`mb-2`}>034533</p>
        </div>
      </section>
      <section>
        <h3 className={`text text_type_main-medium mb-5`}>Выполнено за все время:</h3>
        <p className={`${styles.total} text text_type_digits-large`}>28 752</p>
      </section>
      <section>
        <h3 className={`text text_type_main-medium mb-5`}>Выполнено за сегодня:</h3>
        <p className={`${styles.total} text text_type_digits-large`}>138</p>
      </section>
    </article>
  )
}
