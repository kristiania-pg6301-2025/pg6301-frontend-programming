import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import type { UserInfo } from "../shared/userInfo.js";

const UserContext = React.createContext<{ userinfo: UserInfo | undefined }>({
  userinfo: undefined,
});

function UserProfile() {
  const { userinfo } = useContext(UserContext);
  if (!userinfo) return null;
  return (
    <>
      <h1>
        Welcome {userinfo.name} ({userinfo.email})
      </h1>
      {userinfo.picture && (
        <div>
          <img src={userinfo.picture} />
        </div>
      )}
      <div>
        <a href={"/api/login/end_session"}>Log out</a>
      </div>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <h1>Log in</h1>
      <div>
        <a href="/api/login/linkedin/start">Login with Linkedin</a>
      </div>
      <div>
        <a href="/api/login/google/start">Login with Google</a>
      </div>
    </>
  );
}

function Application() {
  const [userinfo, setUserinfo] = useState<UserInfo>();

  const navigate = useNavigate();

  async function loadUserInfo() {
    const res = await fetch("/api/userinfo");
    if (res.status === 401) {
      return navigate("/login");
    }
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
        <Route path={"/login"} element={<LoginPage />} />
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
