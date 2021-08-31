import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'
import NavButton from '../NavButton'
import { Link, useLocation } from 'react-router-dom'

export const AppHeader = () => {
  const { pathname } = useLocation()

  return (
    <header className={`${styles.header}`}>
      <nav className={styles.container}>
        <ul className={`${styles.nav} ${'text text_type_main-default'}`}>
          <NavButton icon='constructor' url='/' disable={pathname !== '/'} text='Конструктор' />
          <NavButton icon='tape' url='/feed' disable={!pathname.startsWith('/feed')} text='Лента заказов' />
          <li className={styles.logo}>
            <Link to='/'>
              <Logo />
            </Link>
          </li>
          <NavButton icon='personal' url='/profile' disable={pathname !== '/profile'} text='Личный кабинет' />
        </ul>
      </nav>
    </header>
  )
}
