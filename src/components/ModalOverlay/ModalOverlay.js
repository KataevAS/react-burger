import React, { useEffect, useRef } from 'react';
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

  const overlayRef = useRef();

  const onOverlayClick = (e) => {
    if (overlayRef.current === e.target) {
      onHandleClose();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onHandleKey, false);
    return document.addEventListener("keydown", onHandleKey, false);
  });

  return ReactDOM.createPortal((
    <div className={`${styles.overlay}`} onClick={onOverlayClick} ref={overlayRef}>
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