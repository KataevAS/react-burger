import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';

const textStyle = 'text text_type_main-default text_color_inactive';
const navItemStyle = `mt-4 mb-4`;

export const AppHeader = () => {
  return (
    <header className={`${styles.header}`}>
      <nav className={styles.container}>
        <ul className={`${styles.nav} ${textStyle}`}>
          <NavButton icon={<BurgerIcon type="secondary" />} text='Конструктор' />
          <NavButton icon={<ListIcon type="secondary" />} text='Лента заказов' />
          <div className={styles.logo}>
            <Logo />
          </div>
          <NavButton icon={<ProfileIcon type="secondary" />} text='Личный кабинет' />
        </ul>
      </nav>
    </header>
  )
}



const NavButton = ({ icon, text, url = '#' }) => (
  <li className={navItemStyle}><a href={url} className={`${styles.navLink} pl-5 pr-5 pt-4 pb-4`}>{icon}<span className={`ml-2`}>{text}</span></a></li>
)