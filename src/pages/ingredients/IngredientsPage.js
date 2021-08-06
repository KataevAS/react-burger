import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients, setCurrentIngredient } from '../../services/actions'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/IngredientDetails'

export const IngredientsPage = () => {
  const id = useParams().id
  const dispatch = useDispatch()

  let newCurrentIngredient

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  const ingredients = useSelector((store) => [
    ...store.ingredients.buns,
    ...store.ingredients.mains,
    ...store.ingredients.sauce,
  ])
  const currentIngredient = useSelector((store) => store.currentIngredient)

  if (ingredients && ingredients.length > 0) {
    newCurrentIngredient = ingredients.find((item) => item._id === id)
  }

  useEffect(() => {
    if (newCurrentIngredient) {
      dispatch(setCurrentIngredient(newCurrentIngredient))
    }
  }, [dispatch, newCurrentIngredient])

  return <>{currentIngredient ? <IngredientDetails /> : <div>Not found ingredient</div>}</>
}
