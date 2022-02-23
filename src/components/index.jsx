import React, { useContext } from "react";
import axios from "axios";
import { AuthProviderAPI } from "../context/Auth";

const AuthUser = () => {
  const [auth, setAuth] = useContext(AuthProviderAPI);
  const authUser = (userInfo) => {
    const BaseUrl = "http://templ-api.webase.uz";
    axios
      .post(`${BaseUrl}/Account/GenerateToken/${auth.token}`, userInfo)
      .then((resp) => resp.data)
      .then((data) => (data.success ? setAuth(true) : null))
      .catch((err) => console.error(err));
  };

  return <div>index</div>;
};

export default AuthUser;
