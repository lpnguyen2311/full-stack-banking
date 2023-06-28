import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useBankContext } from "../utils/BankContext";
import { toast } from "react-toastify";

const DepositWithdraw = () => {
  const [amount, setAmount] = useState(0);
  const userData = useBankContext();
  const headers = {
    Authorization: `Bearer ${userData.accessToken}`,
  };
  const updateBalance = (balance) => {
    userData.setUser((prevUser) => ({
      ...prevUser,
      balance: balance,
    }));
  };

  const handleDeposit = () => {
    axios
      .post("/auth/deposit", { amount }, { headers })
      .then((response) => {
        // Handle successful deposit
        console.log("Deposit successful");
        const updatedBalance = response.data.balance;
        updateBalance(updatedBalance);
        toast.success(`$${amount} has been successfully deposited`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error depositing:", error);
      });
  };

  const handleWithdraw = () => {
    axios
      .post("/auth/withdraw", { amount }, { headers })
      .then((response) => {
        // Handle successful withdrawal
        console.log("Withdrawal successful");
        const updatedBalance = response.data.balance;
        updateBalance(updatedBalance);
        toast.success(`$${amount} has been successfully withdrawed`);
      })
      .catch((error) => {
        // Handle error
        console.error("Error withdrawing:", error);
      });
  };

  return (
    <Card
      bgcolor="primary"
      txtcolor="light"
      header={`${userData.user.username} Account`}
      body={
        <div>
          <p>Balance: ${userData.user.balance}</p>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleDeposit}
          >
            Deposit
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
      }
    />
  );
};

export default DepositWithdraw;
