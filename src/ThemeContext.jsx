import { useEffect, useState, useRef, createContext, useContext } from 'react';

const ThemeContext = createContext("light")


export default function Theme({theme, children}) {
  return (
    <ThemeContext.provider value={theme}>
      <div style={{
        backgroundColor: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}>
        {children}
      </div>
    </ThemeContext.provider>
  );
}

export function useTheme(){
    return useContext(ThemeContext)
}
