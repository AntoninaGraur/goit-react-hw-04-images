import React, { useCallback, useEffect } from 'react';
import {ModalOverlay, ModalWindow} from './Modal.styled';

const Modal = ({ closeModal, modalImage: { src, alt } }) => {
  const closeByEscape = useCallback(
    (e) => {
      if (e.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const closeByBackdrop = useCallback(
    (event) => {
      if (event.currentTarget === event.target) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', closeByEscape);
    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeByEscape]);

  return (
    <ModalOverlay onClick={closeByBackdrop}>
      <ModalWindow>
        <img src={src} alt={alt} />
      </ModalWindow>
    </ModalOverlay>
  );
};

export default Modal;
