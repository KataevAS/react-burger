import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import stylesForm from '../../utils/styles/forms.module.css'
import styleContainer from '../../utils/styles/container.module.css'
import styles from './ProfilePage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserData, logout, wsConnectionClosed, wsIsAuthConnect } from '../../services/redux/actions'
import OrderCard from '../../components/OrderCard'
import OrderInfo from '../../components/OrderInfo'

export const ProfilePage = () => {
  const location = useLocation()
  const { pathname } = location
  const dispatch = useDispatch()

  const { user, isLoadPatch } = useSelector((store) => ({
    user: store.user.userData,
    isLoadPatch: store.user.isLoadPatch,
  }))

  const orders = useSelector((store) => store.onlineOrders.orders)

  const buns = useSelector((store) => store.ingredients.buns)
  const sauce = useSelector((store) => store.ingredients.sauce)
  const mains = useSelector((store) => store.ingredients.mains)

  const ingredients = useMemo(() => [...buns, ...sauce, ...mains], [buns, sauce, mains])

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(wsIsAuthConnect())
    return () => wsConnectionClosed()
  }, [dispatch])

  const getPriceOrder = useCallback(
    (ingredientsId) => {
      return ingredientsId.reduce((acc, item) => {
        const ing = ingredients.find((ing) => ing._id === item)
        const price = ing.type === 'bun' ? ing.price * 2 : ing.price
        acc += price
        return acc
      }, 0)
    },
    [ingredients]
  )

  const images = ingredients.reduce((acc, item) => {
    acc[item._id] = item.image
    return acc
  }, {})

  const onClickCancel = () => {
    setName(user.name)
    setEmail(user.email)
    setPassword('')
  }

  const onClickOut = () => {
    dispatch(logout())
  }

  const checkChangedForm = () => {
    return name !== user.name || email !== user.email || password !== '' ? true : false
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(changeUserData({ name, email, password }))
    setPassword('')
  }

  return (
    <Switch>
      <Route path='/profile/orders/:id' exact>
        <main className={styles.orderInfo}>
          <OrderInfo type='page' />
        </main>
      </Route>
      <Route path='/profile'>
        <main className={styleContainer.container + ' ' + styles.section}>
          <nav className={styles.nav}>
            <ul>
              <li
                className={`${styles.navItem} text text_type_main-medium ${
                  !(pathname === '/profile') && 'text_color_inactive'
                }`}>
                <Link to={'/profile'}>??????????????</Link>
              </li>
              <li
                className={`${styles.navItem} text text_type_main-medium ${
                  !(pathname === '/profile/orders') && 'text_color_inactive'
                }`}>
                <Link to={'/profile/orders'}>?????????????? ??????????????</Link>
              </li>
              <li className={`${styles.navItem} text text_type_main-medium text_color_inactive`} onClick={onClickOut}>
                <Link to={'/login'}>??????????</Link>
              </li>
            </ul>
            {pathname === '/profile' && (
              <p className={`text text_type_main-default text_color_inactive mt-20`}>
                ?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????
              </p>
            )}
          </nav>

          <Switch>
            <Route path='/profile' exact>
              <form className={`${styles.box} ml-15`} onSubmit={onSubmit}>
                <div className={`${stylesForm.input}`}>
                  <Input
                    type={'text'}
                    placeholder={'??????'}
                    onChange={(e) => setName(e.target.value)}
                    icon={'undefined'}
                    value={name}
                    name='name'
                    dispatch={isLoadPatch}
                    // error={false}
                    // ref={inputRef}
                    // onIconClick={onIconClick}
                    // errorText={'????????????'}
                  />
                </div>
                <div className={`${stylesForm.input} mt-6`}>
                  <Input
                    type={'text'}
                    placeholder={'??????????'}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={'undefined'}
                    value={email}
                    name='login'
                    dispatch={isLoadPatch}
                    // error={false}
                    // ref={inputRef}
                    // onIconClick={onIconClick}
                    // errorText={'????????????'}
                  />
                </div>
                <div className={`${stylesForm.input} mt-6`}>
                  <Input
                    type={'password'}
                    placeholder={'????????????'}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={'undefined'}
                    value={password}
                    name='password'
                    dispatch={isLoadPatch}
                    // error={false}
                    // ref={inputRef}
                    // onIconClick={onIconClick}
                    // errorText={'????????????'}
                  />
                </div>
                <div className={`${styles.btnsForm} mt-6 ${!checkChangedForm() && styles.btnFormHide}`}>
                  <span className={`${styles.cancelBtn} mr-6 text text_type_main-default`} onClick={onClickCancel}>
                    ????????????????
                  </span>
                  <Button onSubmit={onSubmit}>??????????????????</Button>
                </div>
              </form>
            </Route>
            <Route path='/profile/orders' exact>
              <div className={`${styles.orders} ml-15 pr-2`}>
                {orders.length > 0 &&
                  orders.map(({ id, name, number, ingredients, createdAt }) => (
                    <Link
                      key={id}
                      to={{
                        pathname: `/profile/orders/${id}`,
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
              </div>
            </Route>
          </Switch>
        </main>
      </Route>
    </Switch>
  )
}
