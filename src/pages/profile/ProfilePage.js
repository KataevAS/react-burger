import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useState } from 'react'
import { Switch, Route, Link, useLocation } from 'react-router-dom'
import stylesForm from '../../utils/styles/forms.module.css'
import styleContainer from '../../utils/styles/container.module.css'
import styles from './ProfilePage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserData, logout } from '../../services/actions'

export const ProfilePage = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const { user, isLoadPatch } = useSelector((store) => ({
    user: store.user.userData,
    isLoadPatch: store.user.isLoadPatch,
  }))

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')

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
    <section className={styleContainer.container + ' ' + styles.section}>
      <nav className={styles.nav}>
        <ul>
          <li
            className={`${styles.navItem} text text_type_main-medium ${
              !(pathname === '/profile') && 'text_color_inactive'
            }`}>
            <Link to={'/profile'}>Профиль</Link>
          </li>
          <li
            className={`${styles.navItem} text text_type_main-medium ${
              !(pathname === '/profile/orders') && 'text_color_inactive'
            }`}>
            <Link to={'/profile/orders'}>История заказов</Link>
          </li>
          <li className={`${styles.navItem} text text_type_main-medium text_color_inactive`} onClick={onClickOut}>
            <Link to={'/login'}>Выход</Link>
          </li>
        </ul>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <Switch>
        <Route path='/profile' exact>
          <form className={`${styles.box} ml-15`} onSubmit={onSubmit}>
            <div className={`${stylesForm.input}`}>
              <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={(e) => setName(e.target.value)}
                icon={'undefined'}
                value={name}
                name='name'
                dispatch={isLoadPatch}
                // error={false}
                // ref={inputRef}
                // onIconClick={onIconClick}
                // errorText={'Ошибка'}
              />
            </div>
            <div className={`${stylesForm.input} mt-6`}>
              <Input
                type={'text'}
                placeholder={'Логин'}
                onChange={(e) => setEmail(e.target.value)}
                icon={'undefined'}
                value={email}
                name='login'
                dispatch={isLoadPatch}
                // error={false}
                // ref={inputRef}
                // onIconClick={onIconClick}
                // errorText={'Ошибка'}
              />
            </div>
            <div className={`${stylesForm.input} mt-6`}>
              <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={(e) => setPassword(e.target.value)}
                icon={'undefined'}
                value={password}
                name='password'
                dispatch={isLoadPatch}
                // error={false}
                // ref={inputRef}
                // onIconClick={onIconClick}
                // errorText={'Ошибка'}
              />
            </div>
            <div className={`${styles.btnsForm} mt-6 ${!checkChangedForm() && styles.btnFormHide}`}>
              <span className={`${styles.cancelBtn} mr-6 text text_type_main-default`} onClick={onClickCancel}>
                Отменить
              </span>
              <Button onSubmit={onSubmit}>Сохранить</Button>
            </div>
          </form>
        </Route>
        <Route path='/profile/orders/:id?' exact>
          <div>Orders</div>
        </Route>
      </Switch>
    </section>
  )
}
