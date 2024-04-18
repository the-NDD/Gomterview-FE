import { EmptyContext } from 'gomterview-design-system';
import { useContext, useEffect } from 'react';

const useEmptySuspenseEffect = (data: unknown) => {
  const { setIsEmpty } = useContext(EmptyContext);

  useEffect(() => {
    const isEmpty = data === null || (Array.isArray(data) && data.length === 0);
    setIsEmpty(isEmpty);
  }, [data, setIsEmpty]);
};

export default useEmptySuspenseEffect;
