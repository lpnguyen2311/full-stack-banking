import { useState } from "react";
import Card from "../components/Card";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useBankContext } from "../utils/BankContext";

const Login = () => {
  const auth = useBankContext();

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { from } = location.state || { from: { pathname: "/transaction" } };

  const login = (e) => {
    e.preventDefault();
    // Validate email and password
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    auth
      .signin(email, password)
      .then(() => {
        navigate(from);
      })
      .catch((error) => {
        toast.error("Invalid email or password");
        console.error("Login error:", error);
      });
  };

  return (
    <Card
      bgcolor="primary"
      txtcolor="light"
      header="Login"
      body={
        <form onSubmit={login}>
          <div className="mb-3">
            <label for="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      }
    />
  );
};

export default Login;
