import React, { useEffect } from 'react'
import { setIngredients, setCurrentIngredient } from '../../services/redux/actions'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/IngredientDetails'
import { TIngredient } from '../../services/redux/actions/currentIngredientActions'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../utils/typedHooks'

export const IngredientsPage = () => {
  const id = useParams<{ id: string }>().id
  const dispatch = useDispatch()

  let newCurrentIngredient: TIngredient | null = null

  useEffect(() => {
    dispatch(setIngredients())
  }, [dispatch])

  const ingredients = useSelector((store) => [
    ...store.ingredients.buns,
    ...store.ingredients.mains,
    ...store.ingredients.sauce,
  ])
  const currentIngredient = useSelector((store) => store.currentIngredient.ingredient)

  if (ingredients && ingredients.length > 0) {
    newCurrentIngredient = ingredients.find((item) => item._id === id) || null
  }

  useEffect(() => {
    if (newCurrentIngredient) {
      dispatch(setCurrentIngredient(newCurrentIngredient))
    }
  }, [dispatch, newCurrentIngredient])

  return <>{currentIngredient ? <IngredientDetails /> : <div>Not found ingredient</div>}</>
}
