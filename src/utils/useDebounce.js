import { useEffect, useState } from "react";

export const useDebounce  = (value, delay = 500) => {
  const [deboucedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [delay, value]);

  return deboucedValue;
};
