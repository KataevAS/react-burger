import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';


export const Modal = ({ children, title, onHandleClose }) => (
  <div className={`${styles.modal} pr-10 pb-15 pl-10`}>
    {
      title
        ?
        <header className={`${styles.header} mr-10 mt-10`}>
          <p className={`${styles.title} text text_type_main-medium`}>{title}</p>
          <div className={`${styles.closeIcon}`} onClick={onHandleClose}>
            <CloseIcon type="primary" />
          </div>
        </header>
        :
        <div className={`${styles.closeIconOnly} mt-15 mr-10`} onClick={onHandleClose}>
          <CloseIcon type="primary" />
        </div>
    }

    {children}
  </div>
)

Modal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  onHandleClose: PropTypes.func.isRequired
};