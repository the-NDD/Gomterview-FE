import React, { createContext, useRef, useState } from 'react';

type EmptySuspenseProps = {
  children: React.ReactNode;
  callback: React.ReactNode;
  trigger?: boolean;
};

export const EmptyContext = createContext({
  isEmpty: false,
  setIsEmpty: (isEmpty: boolean) => {},
});

const EmptySuspense: React.FC<EmptySuspenseProps> = ({
  children,
  callback,
  trigger,
}) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const prevTriggerRef = useRef(trigger); // 이전 trigger 값 저장

  if (prevTriggerRef.current !== trigger) {
    setIsEmpty(false); // trigger 값이 변경되었을 때만 isEmpty 상태 업데이트
    prevTriggerRef.current = trigger; // 현재 trigger 값을 이전 값으로 업데이트
  }

  return (
    <EmptyContext.Provider value={{ isEmpty, setIsEmpty }}>
      {isEmpty ? callback : children}
    </EmptyContext.Provider>
  );
};

export default EmptySuspense;
