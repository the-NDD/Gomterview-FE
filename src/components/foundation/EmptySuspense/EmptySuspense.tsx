import React, { createContext, useState } from 'react';

type EmptySuspenseProps = {
  children: React.ReactNode;
  callback: React.ReactNode;
};

export const EmptyContext = createContext({
  isEmpty: false,
  setIsEmpty: (isEmpty: boolean) => {},
});

const EmptySuspense: React.FC<EmptySuspenseProps> = ({
  children,
  callback,
}) => {
  const [isEmpty, setIsEmpty] = useState(false);

  return (
    <EmptyContext.Provider value={{ isEmpty, setIsEmpty }}>
      {isEmpty ? callback : children}
    </EmptyContext.Provider>
  );
};

export default EmptySuspense;
