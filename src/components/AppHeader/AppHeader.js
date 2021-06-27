import React from 'react'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';
import NavButton from '../NavButton';


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

export { AppHeader };