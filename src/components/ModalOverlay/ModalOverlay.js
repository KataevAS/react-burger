import React, { useEffect } from 'react';
import styles from './ModalOverlay.module.css';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


const modalRoot = document.getElementById('root-modals');

export const ModalOverlay = ({ children, onHandleClose }) => {

  const onHandleKey = (e) => {
    if (e.key === 'Escape') {
      onHandleClose();
    }
  }

  const onOverlayClick = (e) => {
    if (e.target.classList.contains(styles.overlay)) {
      onHandleClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onHandleKey, false);
    return () => {
      document.removeEventListener("keydown", onHandleKey, false);
    }
  });

  return ReactDOM.createPortal((
    <div className={`${styles.overlay}`} onClick={onOverlayClick} >
      {children}
    </div>
  ),
    modalRoot
  )
};

ModalOverlay.propTypes = {
  children: PropTypes.any,
  onHandleClose: PropTypes.func.isRequired
};