import { useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { from } = location.state || { from: { pathname: "/" } };

  const createAccount = (e) => {
    e.preventDefault();
    // Validate fields
    if (!username || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }
    // create user obj
    const user = {
      username: username,
      email: email,
      password: password,
      balance: 0,
    };
    console.log(user);
    axios
      .post("/user/createaccount", user)
      .then((res) => {
        console.log(res);
        toast.success(`${username} has successfully created`);
        navigate(from);
      })
      .catch((error) => {
        console.error("Create account error:", error);
        toast.error("Failed to create account");
      });
  };
  return (
    <Card
      bgcolor="primary"
      txtcolor="light"
      header="Create Account"
      body={
        <>
          <div className="mb-3">
            <label for="exampleInputUsername" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="abcd"
              id="usernamee"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="abc@def.com"
              id="email"
              name="email"
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
              placeholder="8 characters"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button
            type="submit"
            onClick={createAccount}
            className="btn btn-primary"
          >
            Create Account
          </button>
        </>
      }
    />
  );
};

export default CreateAccount;
