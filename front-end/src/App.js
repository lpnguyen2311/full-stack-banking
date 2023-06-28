import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import DepositWithdraw from "./pages/DepositWithdraw";
import Navi from "./components/Navbar.js";
import { BankProvider } from "./utils/BankContext";
import RequireAuth from "./components/RequireAuth";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <BankProvider>
        <Navi />
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="login" element={<Login />} />
          <Route path="transaction" element={<DepositWithdraw />} />
        </Routes>
      </BankProvider>

      <div className="container">
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
