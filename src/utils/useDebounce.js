import { useEffect, useState } from "react";

export const useDebounce  = (callback, delay = 500) => {
  const [deboucedValue, setDebouncedValue] = useState(callback);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedValue(callback);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [delay, callback]);

  return deboucedValue;
};
