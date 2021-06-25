import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css';
import IngredientsCard from '../IngredientsCard';


class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 'bun'
    }
  }

  setCurrent = (n) => {
    this.setState(state => ({
      ...state,
      current: n
    }))
  }

  render() {

    const buns = this.props.ingredients.filter(item => item.type === 'bun');
    const sauce = this.props.ingredients.filter(item => item.type === 'sauce');
    const mains = this.props.ingredients.filter(item => item.type === 'main');

    return (
      <section className={styles.box}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
        <div className={`mb-10`} style={{ display: 'flex' }}>
          <Tab value="bun" active={this.state.current === 'bun'} onClick={this.setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={this.state.current === 'sauce'} onClick={this.setCurrent}>
            Соусы
          </Tab>
          <Tab value="main" active={this.state.current === 'main'} onClick={this.setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={`${styles.ingredientsBox}`}>
          <h2 className={`text text_type_main-medium`}>Булки</h2>
          <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
            {buns.map(item => <IngredientsCard ing={item} key={item._id} />)}
          </article>
          <h2 className={`text text_type_main-medium`}>Соусы</h2>
          <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
            {sauce.map(item => <IngredientsCard ing={item} key={item._id} />)}
          </article>
          <h2 className={`text text_type_main-medium`}>Начинки</h2>
          <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
            {mains.map(item => <IngredientsCard ing={item} key={item._id} />)}
          </article>
        </div>
      </section>

    )
  }
}

export { BurgerIngredients };