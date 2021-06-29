import React from 'react'
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './NavButton.module.css';
import PropTypes from 'prop-types';


export const NavButton = ({ icon, text, url = '#', disable, onHandleClick }) => {

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
      <a href={url} className={`${styles.navLink} pl-5 pr-5 pt-4 pb-4`} onClick={() => onHandleClick(icon)}>
        {iconComponent}
        <span className={`ml-2`}>
          {text}
        </span>
      </a>
    </li>
  )
}

NavButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  url: PropTypes.string,
  disable: PropTypes.bool,
  onHandleClick: PropTypes.func
};