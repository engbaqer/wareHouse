"use client";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  const [activeItem, setActiveItem] = useState(null);
  const [userName, setUserName] = useState(null);
  const [reRequest, setReRequest] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  return (
    <GlobalStateContext.Provider value={{ activeItem, setActiveItem, userName , reRequest, setReRequest }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
