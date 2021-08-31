import React, { useEffect, useState, SyntheticEvent, ChangeEvent } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../../utils/styles/forms.module.css'
import { useDispatch, useSelector as selectorHook, TypedUseSelectorHook } from 'react-redux'
import { setForgotEmail, setInitialResetPassword } from '../../services/redux/actions'
import { RootState } from '../../services/redux/store'
import { ILocationState } from '../../utils/useLocationStateType'

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch()
  const { state } = useLocation<ILocationState>()
  const { isSentEmail, isAuth } = useSelector((store) => ({
    isSentEmail: store.user.isSentEmail,
    isAuth: store.user.isAuth,
  }))

  useEffect(() => {
    dispatch(setInitialResetPassword())
  }, [dispatch])

  const [email, setEmail] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e: SyntheticEvent<EventTarget>) => {
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
    <form className={styles.box} onSubmit={onSubmit}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <div className={`${styles.input} mt-6`}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={onChange}
          icon={undefined}
          value={email}
          name='email'
        />
      </div>
      <div className={`mt-6`}>
        <Button>Восстановить</Button>
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
