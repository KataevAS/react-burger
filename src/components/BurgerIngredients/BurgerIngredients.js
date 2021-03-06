import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './BurgerIngredients.module.css'
import IngredientsCard from '../IngredientsCard'
import { setCurrentIngredient } from '../../services/redux/actions'

export const BurgerIngredients = () => {
  const dispatch = useDispatch()

  const { buns, sauce, mains } = useSelector((store) => store.ingredients)

  const [currentTab, setCurrentTab] = useState('bun')
  const refTabs = useRef(null)
  const refTitleBuns = useRef(null)
  const refSauceBuns = useRef(null)
  const refMainsBuns = useRef(null)

  const onScrollIngredients = () => {
    const { bottom } = refTabs.current.getBoundingClientRect()
    const { y: bY, height: bH } = refTitleBuns.current.getBoundingClientRect()
    const { y: sY, height: sH } = refSauceBuns.current.getBoundingClientRect()
    const { y: mY, height: mH } = refMainsBuns.current.getBoundingClientRect()

    const bRange = Math.abs(bY - bottom - bH / 2)
    const sRange = Math.abs(sY - bottom - sH / 2)
    const mRange = Math.abs(mY - bottom - mH / 2)

    if (bRange < Math.min(sRange, mRange) && currentTab !== 'bun') {
      setCurrentTab('bun')
      return
    }
    if (sRange < Math.min(bRange, mRange) && currentTab !== 'sauce') {
      setCurrentTab('sauce')
      return
    }
    if (mRange < Math.min(sRange, bRange) && currentTab !== 'main') {
      setCurrentTab('main')
      return
    }
  }

  const onIngredientCardClick = useCallback(
    (type, index) => {
      switch (type) {
        case 'bun':
          dispatch(setCurrentIngredient(buns[index]))
          break
        case 'sauce':
          dispatch(setCurrentIngredient(sauce[index]))
          break
        case 'main':
          dispatch(setCurrentIngredient(mains[index]))
          break
        default:
          break
      }
    },
    [dispatch, buns, sauce, mains]
  )

  const onHandleClick = (name) => {
    setCurrentTab(name)
  }

  return (
    <>
      <section className={styles.box}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>???????????????? ????????????</h1>

        <div className={`mb-10`} style={{ display: 'flex' }} ref={refTabs}>
          <Tab value='bun' active={currentTab === 'bun'} onClick={onHandleClick}>
            ??????????
          </Tab>
          <Tab value='sauce' active={currentTab === 'sauce'} onClick={onHandleClick}>
            ??????????
          </Tab>
          <Tab value='main' active={currentTab === 'main'} onClick={onHandleClick}>
            ??????????????
          </Tab>
        </div>

        <div className={`${styles.ingredientsBox}`} onScroll={onScrollIngredients}>
          {buns.length === 0 && sauce.length === 0 && mains.length === 0 && <div>????????????????...</div>}

          {buns?.length > 0 && (
            <>
              <h2 className={`text text_type_main-medium`} ref={refTitleBuns}>
                ??????????
              </h2>
              <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
                {buns.map((item, index) => (
                  <IngredientsCard
                    type={item.type}
                    index={index}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    id={item._id}
                    key={item._id}
                    onIngredientCardClick={onIngredientCardClick}
                  />
                ))}
              </article>
            </>
          )}

          {sauce?.length > 0 && (
            <>
              <h2 className={`text text_type_main-medium`} ref={refSauceBuns}>
                ??????????
              </h2>
              <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
                {sauce.map((item, index) => (
                  <IngredientsCard
                    type={item.type}
                    index={index}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    id={item._id}
                    key={item._id}
                    onIngredientCardClick={onIngredientCardClick}
                  />
                ))}
              </article>
            </>
          )}

          {mains?.length > 0 && (
            <>
              <h2 className={`text text_type_main-medium`} ref={refMainsBuns}>
                ??????????????
              </h2>
              <article className={`${styles.ingredients} pl-4 pr-4 pt-6 pb-10`}>
                {mains.map((item, index) => (
                  <IngredientsCard
                    type={item.type}
                    index={index}
                    name={item.name}
                    image={item.image}
                    price={item.price}
                    id={item._id}
                    key={item._id}
                    onIngredientCardClick={onIngredientCardClick}
                  />
                ))}
              </article>
            </>
          )}
        </div>
      </section>
    </>
  )
}
