import React from 'react'
import OrderCard from '../OrderCard'
import styles from './OrderFeed.module.css'
import { Link, useLocation } from 'react-router-dom'

export const OrderFeed = () => {
  const location = useLocation()

  return (
    <article className={`${styles.orderFeed}`}>
      <section className={`${styles.cards} pr-2`}>
        <Link
          to={{
            pathname: `/feed/${123}`,
            state: { background: location },
          }}>
          <OrderCard
            orderNumber='#034535'
            name='Death Star Starship Main бургер'
            ingredients={[
              'https://code.s3.yandex.net/react/code/bun-01.png',
              'https://code.s3.yandex.net/react/code/bun-01.png',
              'https://code.s3.yandex.net/react/code/bun-01.png',
              'https://code.s3.yandex.net/react/code/bun-01.png',
              'https://code.s3.yandex.net/react/code/bun-01.png',
              'https://code.s3.yandex.net/react/code/bun-01.png',
              'https://code.s3.yandex.net/react/code/bun-01.png',
            ]}
            createdAt='2021-06-23T14:43:22.587Z'
          />
        </Link>
        <OrderCard
          orderNumber='#034535'
          name='Death Star Starship Main бургер'
          ingredients={[
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
          ]}
          createdAt='2021-06-23T14:43:22.587Z'
        />
        <OrderCard
          orderNumber='#034535'
          name='Death Star Starship Main бургер'
          ingredients={[
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
          ]}
          createdAt='2021-06-23T14:43:22.587Z'
        />
        <OrderCard
          orderNumber='#034535'
          name='Death Star Starship Main бургер'
          ingredients={[
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
          ]}
          createdAt='2021-06-23T14:43:22.587Z'
        />
        <OrderCard
          orderNumber='#034535'
          name='Death Star Starship Main бургер'
          ingredients={[
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
            'https://code.s3.yandex.net/react/code/bun-01.png',
          ]}
          createdAt='2021-06-23T14:43:22.587Z'
        />
      </section>
    </article>
  )
}
