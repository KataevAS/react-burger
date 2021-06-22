import React from 'react'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: 'constructor'
    }
  }


  render() {
    return (
      <header className={`${styles.header}`}>
        <nav className={styles.container}>
          <ul className={`${styles.nav} ${'text text_type_main-default'}`}>
            {
              <NavButton
                icon='constructor'
                text='Конструктор'
                disable={this.state.currentMenu !== 'constructor'}
              />
            }
            {
              <NavButton
                icon='tape'
                text='Лента заказов'
                disable={this.state.currentMenu !== 'tape'}
              />
            }
            <div className={styles.logo}>
              <Logo />
            </div>
            {
              <NavButton
                icon='personal'
                text='Личный кабинет'
                disable={this.state.currentMenu !== 'personal'}
              />
            }
          </ul>
        </nav>
      </header>
    )
  }
}

const NavButton = ({ icon, text, url = '#', disable }) => {

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

export { AppHeader };