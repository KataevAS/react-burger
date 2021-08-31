import { useSelector as selectorHook, TypedUseSelectorHook, useDispatch as dispatchHook } from 'react-redux'
import { RootState, AppDispatch, AppThunk } from '../services/redux/store'

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>()
