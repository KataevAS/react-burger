import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../../utils/styles/forms.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../services/actions'

export const ResetPasswordPage = () => {
  const dispatch = useDispatch()
  const { isSentEmail, isResetPassword } = useSelector((store) => ({
    isSentEmail: store.user.isSentEmail,
    isResetPassword: store.user.isResetPassword,
  }))

  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword(password, token))
  }

  if (!isSentEmail || isResetPassword) {
    return <Redirect to='/' />
  }

  return (
    <form className={styles.box} onSubmit={onSubmit}>
      <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
      <div className={`${styles.input} mt-6`}>
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={(e) => setPassword(e.target.value)}
          icon={'ShowIcon'}
          value={password}
          name='password'
          // error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          // errorText={'Ошибка'}
        />
      </div>
      <div className={`${styles.input} mt-6`}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setToken(e.target.value)}
          icon={'undefined'}
          value={token}
          name='token'
          // error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          // errorText={'Ошибка'}
        />
      </div>
      <div className={`mt-6`}>
        <Button onSubmit={onSubmit}>Сохранить</Button>
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
