import React from 'react'
import OrderFeed from '../../components/OrderFeed'
import NumbersOrderFeed from '../../components/NumbersOrderFeed'
import styleContainer from '../../utils/styles/container.module.css'
import styles from './FeedPage.module.css'

import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom'
import OrderInfo from '../../components/OrderInfo'

export const FeedPage = () => {
  return (
    <Switch>
      <Route path='/feed' exact>
        <main className={`${styleContainer.container}`}>
          <h1 className={`${styles.title} text text_type_main-large`}>Лента заказов</h1>
          <div className={`${styles.feed}`}>
            <OrderFeed />
            <NumbersOrderFeed />
          </div>
        </main>
      </Route>
      <Route path='/feed/:id' exact>
        <main className={`${styles.main}`}>
          <OrderInfo type='page' />
        </main>
      </Route>
    </Switch>
  )
}
