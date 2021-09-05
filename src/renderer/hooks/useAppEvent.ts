import { useEffect } from 'react';
import type { MainEvents } from '@/common/Events';

/**
 * 在 renderer 监听 main 发过来的 event
 */
const useAppEvent = <T extends keyof MainEvents>(
  eventName: T,
  callback: (e: Event & { data?: MainEvents[T] }) => void,
  deps = [],
) => {
  const kitchenEvent = `electron:${eventName}`;
  useEffect(() => {
    window.addEventListener(kitchenEvent, callback);
    return () => {
      window.removeEventListener(kitchenEvent, callback);
    };
  }, deps);
};

export default useAppEvent;
