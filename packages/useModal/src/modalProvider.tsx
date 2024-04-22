import { PropsWithChildren, createContext, useState } from 'react';

interface ModalElement {
  id: string;
  element: React.FC; // FC는 Function Component의 약자입니다.
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
      </ModalContext.Provider>
      {modalElements.map(({ id, element }) => {
        return <Component key={id} component={element} />;
      })}
    </>
  );
};

const Component = ({ component, ...rest }: { component: React.FC }) => {
  return component({ ...rest });
};

export default ModalProvider;
