import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React, { FC } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import ModalOverlay from '../ModalOverlay'

const modalRoot = document.getElementById('root-modals')

interface IModalProps {
  title?: string
  onHandleClose: (e: React.SyntheticEvent<EventTarget>) => void
}

export const Modal: FC<IModalProps> = ({ children, title, onHandleClose }) => {
  if (modalRoot)
    return ReactDOM.createPortal(
      <>
        <ModalOverlay onHandleClose={onHandleClose}>
          <div className={`${styles.modal} pr-10 pb-15 pl-10`}>
            {title ? (
              <header className={`${styles.header} mt-10`}>
                <p className={`${styles.title} text text_type_main-medium`}>{title}</p>
                <div className={`${styles.closeIcon}`} onClick={onHandleClose}>
                  <CloseIcon type='primary' />
                </div>
              </header>
            ) : (
              <div className={`${styles.closeIconOnly} mt-15 mr-10`} onClick={onHandleClose}>
                <CloseIcon type='primary' />
              </div>
            )}

            {children}
          </div>
        </ModalOverlay>
      </>,
      modalRoot
    )
  return <></>
}
