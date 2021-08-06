import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import NavButton from '../NavButton'
import { Link, useLocation } from 'react-router-dom'

const AppHeader = () => {
  const { pathname } = useLocation()

  return (
    <header className={`${styles.header}`}>
      <nav className={styles.container}>
        <ul className={`${styles.nav} ${'text text_type_main-default'}`}>
          {
            <NavButton
              icon='constructor'
              url='/'
              disable={pathname !== '/'}
              text='Конструктор'>
              <span className='ml-12'>Конструктор</span>
            </NavButton>
          }
          {
            <NavButton
              icon='tape'
              url='/profile/orders'
              text='Лента заказов'
              disable={!pathname.startsWith('/profile/orders')}
            />
          }

          <div className={styles.logo}>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          {
            <NavButton
              icon='personal'
              url='/profile'
              text='Личный кабинет'
              disable={pathname !== '/profile'}
            />
          }
        </ul>
      </nav>
    </header>
  )
}

export { AppHeader }
