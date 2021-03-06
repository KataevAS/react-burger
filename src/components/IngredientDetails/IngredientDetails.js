import React from 'react'
import styles from './IngredientDetails.module.css'
import { useSelector } from 'react-redux'

export const IngredientDetails = () => {
  const { image, name, calories, proteins, carbohydrates, fat } = useSelector((store) => store.currentIngredient)

  return (
    <div className={`${styles.box}`}>
      <img src={image} alt={name} className={`${styles.img} mb-4`} />
      <p className={`${styles.name} text text_type_main-default mb-8`}>{name}</p>
      <div className={`text text_type_main-default text_color_inactive`}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableText}>
              <td className={styles.tableText}>Калории,ккал</td>
              <td className={styles.tableText}>Белки, г</td>
              <td className={styles.tableText}>Жиры, г</td>
              <td className={styles.tableText}>Углеводы, г</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={`${styles.tableText} text text_type_digits-default`}>{calories}</td>
              <td className={`${styles.tableText} text text_type_digits-default`}>{proteins}</td>
              <td className={`${styles.tableText} text text_type_digits-default`}>{fat}</td>
              <td className={`${styles.tableText} text text_type_digits-default`}>{carbohydrates}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
