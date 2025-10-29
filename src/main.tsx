import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

function FrontPage() {
  return (
    <>
      <h1>Front page</h1>
      <ul>
        <li>
          <Link to={"/profile"}>User profile</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      </ul>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <h1>Please log in</h1>
      <ul>
        <li>
          <li>
            <a href="/api/login/microsoft/start">log in with Microsoft</a>
          </li>
          <li>
            <a href="/api/login/google/start">log in with Google</a>
          </li>
          <li>
            <a href="/api/login/github/start">log in with GitHub</a>
          </li>
          <li>
            <a href="/api/login/linkedin/start">log in with LinkedIn</a>
          </li>
        </li>
      </ul>
    </>
  );
}

interface UserInfo {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  picture?: string;
}

function UserProfile() {
  const [profile, setProfile] = useState<UserInfo>();

  async function loadUserInfo() {
    const res = await fetch("/api/profile");
    setProfile(await res.json());
  }

  useEffect(() => {
    loadUserInfo();
  }, []);

  if (!profile) return <h1>Loading...</h1>;

  return (
    <>
      <h1>
        Welcome {profile.name} ({profile.email})
      </h1>
      {profile.picture && <img src={profile.picture} alt={profile.name} />}
    </>
  );
}

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/profile"} element={<UserProfile />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"*"} element={<h1>Not found in frontend</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
