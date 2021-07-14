import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { changeCurrentItemIndex } from '../../services/actions';
import styles from './DraggableIngredient.module.css';


export const DraggableIngredient = ({ uniqId, index, name, price, image, onHandleClose }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'currentIngredient',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, dragRef] = useDrag({
    type: 'currentIngredient',
    item: { id: uniqId, index: index, type: 'currentIngredient', startId: index },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    }),
    end: (item, monitor) => {
      !monitor.getDropResult() && dispatch(changeCurrentItemIndex({ id: uniqId, index: item.startId }));
    },
  });

  dragRef(drop(ref));

  return (
    <>
      <li className={`${styles.constructorElem} ${isDrag && styles.isDrag}`} ref={ref} >
        <div className={`${styles.dragIcon}`}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={() => onHandleClose(uniqId)} />
      </li>
    </>
  )
}


DraggableIngredient.propTypes = {

  "uniqId": PropTypes.string.isRequired,
  "index": PropTypes.number.isRequired,
  "name": PropTypes.string.isRequired,
  "price": PropTypes.number.isRequired,
  "image": PropTypes.string.isRequired,
  "onHandleClose": PropTypes.func.isRequired
};













