import React, { PropsWithChildren, createContext, useState } from 'react';

interface ModalElement {
  id: string;
  element: React.FC;
}

export const ModalContext = createContext<{
  modalElements: ModalElement[];
  setModalElements: React.Dispatch<React.SetStateAction<ModalElement[]>>;
}>({
  modalElements: [],
  setModalElements: () => {},
});

const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalElements, setModalElements] = useState<ModalElement[]>([]);
  return (
    <>
      <ModalContext.Provider value={{ modalElements, setModalElements }}>
        {children}
        {modalElements.map(({ id, element }) => {
          return <Component key={id} component={element} />;
        })}
      </ModalContext.Provider>
    </>
  );
};

const Component = ({ component, ...rest }: { component: React.FC }) => {
  return component({ ...rest });
};

export default ModalProvider;
