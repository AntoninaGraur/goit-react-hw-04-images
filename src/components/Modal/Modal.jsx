import { useEffect } from 'react';
import { ModalOverlay, ModalWindow } from './Modal.styled';

export const Modal = ({ modalImage: { src, alt }, closeModal }) => {
 
  const closeByEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

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
