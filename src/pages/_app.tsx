import type { AppProps } from "next/app";
import store from "../redux/store";
import { Provider } from "react-redux";
import React, { useEffect, useState, createContext, useContext } from "react";
import "react-toastify/dist/ReactToastify.css"; // Import CSS
import { ToastContainer } from "react-toastify";

const UserContext = createContext<any>(null);
export const useUserContext = () => useContext(UserContext);
export default function MyApp({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userId, setUserId }}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </UserContext.Provider>
      <ToastContainer />
    </>
  );
}
