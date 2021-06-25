import React from 'react'
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './NavButton.module.css';


export const NavButton = ({ icon, text, url = '#', disable }) => {

  let iconComponent = null;

  switch (icon) {
    case 'constructor':
      iconComponent = <BurgerIcon type={disable ? 'secondary' : 'primary'} />
      break;
    case 'tape':
      iconComponent = <ListIcon type={disable ? 'secondary' : 'primary'} />
      break;
    case 'personal':
      iconComponent = <ProfileIcon type={disable ? 'secondary' : 'primary'} />
      break;
    default:
      break;
  }

  return (
    <li className={`${styles.navItem} ${disable && 'text_color_inactive'} mt-4 mb-4 `}>
      <a href={url} className={`${styles.navLink} pl-5 pr-5 pt-4 pb-4`}>
        {iconComponent}
        <span className={`ml-2`}>
          {text}
        </span>
      </a>
    </li>
  )
}