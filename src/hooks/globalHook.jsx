"use client"; // if using app/ router

import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
   
    
   const [activeItem, setActiveItem] = useState(null);
    

    return (
        <GlobalStateContext.Provider value={{ activeItem, setActiveItem }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

// Custom hook to access state
export function useGlobalState() {
    return useContext(GlobalStateContext);
}