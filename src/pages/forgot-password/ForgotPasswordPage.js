import React, { useEffect, useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../../utils/styles/forms.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setForgotEmail, setInitialResetPassword } from '../../services/actions'

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch()
  const { state } = useLocation()
  const { isSentEmail, isAuth } = useSelector((store) => ({
    isSentEmail: store.user.isSentEmail,
    isAuth: store.user.isAuth,
  }))

  useEffect(() => {
    dispatch(setInitialResetPassword())
  }, [dispatch])

  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(setForgotEmail(email))
  }

  if (isSentEmail) {
    return <Redirect to='/reset-password' />
  }

  if (isAuth) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <form className={styles.box}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <div className={`${styles.input} mt-6`}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={onChange}
          icon={'undefined'}
          value={email}
          name='email'
          // error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          // errorText={'Ошибка'}
        />
      </div>
      <div className={`mt-6`}>
        <Button onSubmit={onSubmit}>Восстановить</Button>
      </div>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вспомнили пароль?{' '}
        <Link to='/login' className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  )
}
