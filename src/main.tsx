import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import type { UserInfo } from "../shared/userInfo.js";
import * as React from "react";

const UserContext = React.createContext<{ userinfo: UserInfo | undefined }>({
  userinfo: undefined,
});

function UserProfile() {
  const { userinfo } = useContext(UserContext);
  if (!userinfo) return null;
  return <h1>Welcome {userinfo.username}</h1>;
}

function Application() {
  const [userinfo, setUserinfo] = useState<UserInfo>();

  const navigate = useNavigate();

  async function loadUserInfo() {
    const res = await fetch("/api/userinfo");
    setUserinfo(await res.json());
    navigate("/profile");
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
    <UserContext value={{ userinfo }}>
      <Routes>
        <Route path={"/"} element={<h1>Loading</h1>} />
        <Route path={"/profile"} element={<UserProfile />} />
        <Route path={"*"} element={<h1>Not found</h1>} />
      </Routes>
    </UserContext>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
