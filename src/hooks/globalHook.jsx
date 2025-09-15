"use client"; // if using app/ router

import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
   
    
   
    

    return (
        <GlobalStateContext.Provider value={{  }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

// Custom hook to access state
export function useGlobalState() {
    return useContext(GlobalStateContext);
}