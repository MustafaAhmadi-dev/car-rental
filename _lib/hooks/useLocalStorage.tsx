"use client";

import { useEffect, useState } from "react";

export default function useLocalStorage(initialState: boolean, key: string) {
  const [value, setValue] = useState(() => {
    let storedValue;
    if (typeof window !== "undefined") {
      storedValue = localStorage.getItem(key);
    }

    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [typeof value, typeof setValue];
}
