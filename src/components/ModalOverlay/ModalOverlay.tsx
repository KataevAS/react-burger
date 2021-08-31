import React, { useCallback, useEffect, FC } from 'react'
import styles from './ModalOverlay.module.css'

interface IModalOverlayProps {
  onHandleClose: (e: React.SyntheticEvent<EventTarget>) => void
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ children, onHandleClose }) => {
  const onHandleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onHandleClose(e)
      }
    },
    [onHandleClose]
  )

  const onOverlayClick = (e: React.SyntheticEvent<HTMLElement, Event>) => {
    if ((e.target as Element).classList.contains(styles.overlay)) {
      onHandleClose(e)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onHandleKey, false)
    return () => {
      document.removeEventListener('keydown', onHandleKey, false)
    }
  }, [onHandleKey])

  return (
    <div className={`${styles.overlay}`} onClick={onOverlayClick}>
      {children}
    </div>
  )
}
