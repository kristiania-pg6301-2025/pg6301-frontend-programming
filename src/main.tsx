import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface UserInfo {
  username: string;
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
    <Routes>
      <Route path={"/"} element={<h1>Loading</h1>} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
