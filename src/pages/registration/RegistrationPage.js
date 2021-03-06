import React, { useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../../utils/styles/forms.module.css'
import { registration } from '../../services/redux/actions'

export const RegistrationPage = () => {
  const dispatch = useDispatch()
  const { state } = useLocation()

  const { isAuth } = useSelector((store) => ({
    isAuth: store.user.isAuth,
  }))

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const onChange = (e) => {
    setUserForm((state) => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registration(userForm))
  }

  if (isAuth) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <form className={styles.box} onSubmit={onSubmit}>
      <h1 className='text text_type_main-medium'>Регистрация</h1>
      <div className={`${styles.input} mt-6`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          icon={'undefined'}
          value={userForm.name}
          name={'name'}
          // error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          // errorText={'Ошибка'}
        />
      </div>
      <div className={`${styles.input} mt-6`}>
        <Input
          type={'email'}
          placeholder={'Email'}
          onChange={onChange}
          icon={'undefined'}
          value={userForm.email}
          name={'email'}
          // error={false}
          // ref={inputRef}
          // onIconClick={onIconClick}
          // errorText={'Ошибка'}
        />
      </div>
      <div className={`${styles.input} mt-6`}>
        <PasswordInput name='password' onChange={onChange} value={userForm.password} />
      </div>
      <div className={`mt-6`}>
        <Button>Зарегистрироваться</Button>
      </div>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Уже зарегистрированы?{' '}
        <Link to='/login' className={styles.link}>
          Войти
        </Link>
      </p>
    </form>
  )
}
