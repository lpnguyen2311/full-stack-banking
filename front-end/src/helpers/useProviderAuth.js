import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useProviderAuth() {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const signin = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    setUser(res.data.decodedUser);
    setAccessToken(res.data.accessToken);
    setRefreshToken(res.data.refreshToken)
    console.log(res.data.decodedUser);
    console.log(res.data.accessToken);
    toast.success(res.data.message);
  };

  return {
    user,
    setUser,
    accessToken,
    refreshToken,
    signin
  };
}

export default useProviderAuth;
