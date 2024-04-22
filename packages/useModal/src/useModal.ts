import { useCallback, useContext, useId, useState } from 'react';
import { ModalContext } from './modalProvider';

const isArrEmpty = (arr: unknown[]) => arr.length === 0;

const useModal = (component: React.FC) => {
  const { modalElements, setModalElements } = useContext(ModalContext);
  const [isOpen, setIsOpen] = useState(false);

  const id = useId();

  const openModal = useCallback(() => {
    setIsOpen(true);
    setModalElements((pre) => [...pre, { id: id, element: component }]);
    document.body.style.overflow = 'hidden';
  }, [component, id, setModalElements]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalElements((pre) => pre.filter((c) => c.id !== id));

    if (isArrEmpty(modalElements)) document.body.style.overflow = 'unset';
  }, [id, modalElements, setModalElements]);

  return { isOpen, openModal, closeModal };
};

export default useModal;
