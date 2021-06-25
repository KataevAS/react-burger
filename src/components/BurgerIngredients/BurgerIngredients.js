import React from 'react'
import { CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './BurgerIngredients.module.css';


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
            {buns.map(item => <IgredientsCard ing={item} key={item._id} />)}
          </article>
          <h2 className={`text text_type_main-medium`}>Соусы</h2>
          <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
            {sauce.map(item => <IgredientsCard ing={item} key={item._id} />)}
          </article>
          <h2 className={`text text_type_main-medium`}>Начинки</h2>
          <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
            {mains.map(item => <IgredientsCard ing={item} key={item._id} />)}
          </article>
        </div>
      </section>

    )
  }
}


const IgredientsCard = (props) => {
  const { name, image, price, _id } = props.ing;

  return (
    <div className={`${styles.ingredientsCard}`}>
      <img src={image} alt={name} className={`ml-4 mr-4`} />
      <div className={`${styles.price} mt-1 mb-1`}>
        <span className={`text text_type_digits-default mr-1`}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.cardName} text text_type_main-default`}>
        {name}
      </p>
    </div>
  )
}


export { BurgerIngredients };