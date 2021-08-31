import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { useRef, FC } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'

import { changeCurrentItemIndex } from '../../services/redux/actions'
import styles from './DraggableIngredient.module.css'

interface IDraggableIngredientProps {
  uniqId: string
  index: number
  name: string
  price: number
  image?: string
  onHandleClose: (id: string) => void
}

interface DragItem {
  index: number
  id: string
  type: string
}

export const DraggableIngredient: FC<IDraggableIngredientProps> = React.memo(
  ({ uniqId, index, name, price, image, onHandleClose }) => {
    const dispatch = useDispatch()

    const ref = useRef<HTMLLIElement>(null)

    const [, drop] = useDrop({
      accept: 'currentIngredient',
      hover(item: DragItem, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        if (dragIndex === hoverIndex) {
          return
        }
        const hoverBoundingRect = ref.current.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top

        if (hoverClientY && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (hoverClientY && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        item.index = hoverIndex
      },
    })

    const [{ isDrag }, dragRef] = useDrag({
      type: 'currentIngredient',
      item: { id: uniqId, index: index, type: 'currentIngredient', startId: index },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        !monitor.getDropResult() && dispatch(changeCurrentItemIndex({ id: uniqId, index: item.startId }))
      },
    })

    dragRef(drop(ref))

    return (
      <>
        <li className={`${styles.constructorElem} ${isDrag && styles.isDrag}`} ref={ref} data-cy={'conIng' + index}>
          <div className={`${styles.dragIcon}`}>
            <DragIcon type='primary' />
          </div>
          <ConstructorElement
            text={name}
            price={price}
            thumbnail={image || ''}
            handleClose={() => onHandleClose(uniqId)}
          />
        </li>
      </>
    )
  }
)
