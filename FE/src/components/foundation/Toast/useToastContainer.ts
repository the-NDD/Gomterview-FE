import { useEffect, useState } from 'react';
import { ToastEvent, ToastPosition, ToastProps } from '@foundation/Toast/type';
import { eventManager } from '@foundation/Toast/eventManger';

const useToastContainer = () => {
  const [toastList, setToastList] = useState(new Map<string, ToastProps>());

  // 토스트 추가
  const addToast = (props: ToastProps) => {
    setToastList((prev) => new Map(prev).set(props.toastId, props));
  };

  // 토스트 삭제
  const deleteToast = (id: string) => {
    setToastList((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  useEffect(() => {
    eventManager.on(ToastEvent.Add, addToast);
    eventManager.on(ToastEvent.Delete, deleteToast);

    // 컴포넌트 언마운트 시 리스너 해제
    return () => {
      eventManager.off(ToastEvent.Add, addToast);
      eventManager.off(ToastEvent.Delete, deleteToast);
    };
  }, []);

  const toastListToArray = () => {
    return Array.from(toastList);
  };

  const getToastPositionGroupToRender = () => {
    const list = toastListToArray();
    const positionGroup = new Map<ToastPosition, ToastProps[]>();
    list.forEach(([_, toastProps]) => {
      const position = toastProps.position || 'topRight';
      positionGroup.has(position)
        ? positionGroup.get(position)!.push(toastProps)
        : positionGroup.set(position, [toastProps]);
    });
    return positionGroup;
  };

  return { getToastPositionGroupToRender };
};

export default useToastContainer;
