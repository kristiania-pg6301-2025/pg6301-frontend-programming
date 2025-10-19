import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function FrontPage() {
  return (
    <>
      <h1>Welcome</h1>
      <ul>
        <li>
          <Link to={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link to={"/login"}>Log in</Link>
        </li>
      </ul>
    </>
  );
}

function Profile() {
  const [userinfo, setUserinfo] = useState<object>();
  async function fetchUserInfo() {
    const res = await fetch("/api/userinfo");
    setUserinfo(await res.json());
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <>
      <h1>User Profile</h1>
      {userinfo && "picture" in userinfo && (
        <img src={userinfo.picture!.toString()} />
      )}
      <pre>{JSON.stringify(userinfo, null, 2)}</pre>
    </>
  );
}

function Login() {
  return (
    <>
      <h1>Log in:</h1>
      <ul>
        <li>
          <a href={"/api/login/linkedin/start"}>Login with LinkedIn</a>
        </li>
        <li>
          <a href={"/api/login/microsoft/start"}>Login with Microsoft</a>
        </li>
        <li>
          <a href={"/api/login/google/start"}>Login with Google</a>
        </li>
      </ul>
    </>
  );
}

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/profile"} element={<Profile />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
