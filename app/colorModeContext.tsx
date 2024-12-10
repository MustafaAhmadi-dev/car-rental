"use client";

import  useLocalStorage  from "@/_lib/hooks/useLocalStorage";
// import dynamic from "next/dynamic";
import { createContext, ReactNode, useContext, useEffect } from "react";
// const useLocalStorage = dynamic(()=>import("@/_lib/hooks/useLocalStorage").then((mod) => mod.useLocalStorage), {
//     ssr: false // This ensures the component is not SSR'd
//   })

type ColorModeContext = {
  toggleColorMode: () => void;
  isDarkMode: boolean;
};
const ColorModeContext = createContext({} as ColorModeContext);

export function ColorModeProvider({ children }: { children: ReactNode }) {
  let preferedTheme = false;
  if (typeof window !== "undefined") {
    preferedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const [isDarkMode, setIsDarkMode] = useLocalStorage(preferedTheme, "theme");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggleColorMode() {
    setIsDarkMode((isDarkMode: boolean) => !isDarkMode);
  }

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, isDarkMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (context === undefined)
    throw new Error("ColorModeContext was used outside of ColorModeProvider");
  return context;
}
