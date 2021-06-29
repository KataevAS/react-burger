import React, { useState } from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';
import NavButton from '../NavButton';


const AppHeader = () => {

  const [currentMenu, setCurrentMenu] = useState('constructor');

  const onHandleClick = (name) => {
    setCurrentMenu(name);
  }


  return (
    <header className={`${styles.header}`}>
      <nav className={styles.container}>
        <ul className={`${styles.nav} ${'text text_type_main-default'}`}>
          {
            <NavButton
              icon='constructor'
              text='Конструктор'
              disable={currentMenu !== 'constructor'}
              onHandleClick={onHandleClick}
            />
          }
          {
            <NavButton
              icon='tape'
              text='Лента заказов'
              disable={currentMenu !== 'tape'}
              onHandleClick={onHandleClick}
            />
          }
          <div className={styles.logo}>
            <Logo />
          </div>
          {
            <NavButton
              icon='personal'
              text='Личный кабинет'
              disable={currentMenu !== 'personal'}
              onHandleClick={onHandleClick}
            />
          }
        </ul>
      </nav>
    </header>
  )
}

export { AppHeader };