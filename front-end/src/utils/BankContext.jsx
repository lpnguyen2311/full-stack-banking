import { createContext, useContext } from "react";
import useProviderAuth from "../helpers/useProviderAuth.js";

const BankContext = createContext(null);

function BankProvider({ children }) {
  const auth = useProviderAuth();

  return <BankContext.Provider value={auth}>{children}</BankContext.Provider>;
}

function useBankContext() {
  return useContext(BankContext);
}

export { BankProvider, useBankContext };
