import React from "react";
import {
  Navbar,
  NavbarBrand,
  Collapse,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useBankContext } from "../utils/BankContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navi = () => {
  const navigate = useNavigate();
  const auth = useBankContext();
  console.log(auth.user);

  const signout = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      data: {
        refreshToken: auth.refreshToken,
      },
    };
    axios
      .post("/auth/logout", null, config)
      .then((response) => {
        auth.setUser(null);
        toast.success(`${auth.user.username} has been signed out successfully`);
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        toast.error("Failed to log out");
        navigate("/Home");
      });
  };

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to="/">
        Bad Bank
      </NavbarBrand>
      <Collapse navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/Home">
              Home
            </NavLink>
          </NavItem>
          {auth.user && Object.keys(auth.user).length > 0 && (
            <>
              <NavItem>
                <NavLink tag={Link} to="/Transaction">
                  Transaction
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={signout}>Logout</NavLink>
              </NavItem>
            </>
          )}
          {(!auth.user || Object.keys(auth.user).length === 0) && (
            <>
              <NavItem>
                <NavLink tag={Link} to="/CreateAccount">
                  Create Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/Login">
                  Login
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navi;
