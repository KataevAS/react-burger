import React, { useEffect, useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../../utils/styles/forms.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, login } from '../../services/actions'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const { state } = useLocation()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const { isAuth } = useSelector((store) => ({ isAuth: store.user.isAuth }))

  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  })

  const onChange = (e) => {
    setUserForm((state) => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(userForm))
  }

  if (isAuth) {
    return <Redirect to={state?.from || '/'} />
  }
  return (
    <form className={styles.box} onSubmit={onSubmit}>
      <h1 className='text text_type_main-medium'>Вход</h1>
      <div className={`${styles.input} mt-6`}>
        <Input
          type={'email'}
          placeholder={'Email'}
          onChange={onChange}
          icon={'undefined'}
          value={userForm.email}
          name='email'
          // error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          // errorText={'Ошибка'}
        />
      </div>
      <div className={`${styles.input} mt-6`}>
        <PasswordInput onChange={onChange} name='password' value={userForm.password} />
      </div>
      <div className={`mt-6`}>
        <Button onSubmit={onSubmit}>Войти</Button>
      </div>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вы - новый пользователь?{' '}
        <Link to='/register' className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль?{' '}
        <Link to='/forgot-password' className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </form>
  )
}
