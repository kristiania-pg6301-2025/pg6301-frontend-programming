import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
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

interface MovieInfo {
  _id: string;
  title: string;
  year: number;
  genres?: string[];
}

function MoviesPage() {
  const [movies, setMovies] = useState<MovieInfo[]>();
  const [params] = useSearchParams();

  async function loadMovies() {
    const genres = params.get("genres");
    console.log({ genres });
    const res = await fetch("/api/movies?genres=" + genres);
    setMovies(await res.json());
  }

  useEffect(() => {
    loadMovies();
  }, []);

  if (!movies) return <h1>Loading</h1>;

  return (
    <>
      <h1>Movies</h1>
      <ul>
        {movies.map((m) => (
          <li key={m._id}>
            {m.title} ({m.year} - {m.genres?.join(", ") || "<no genre>"})
          </li>
        ))}
      </ul>
    </>
  );
}

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/profile"} element={<UserProfile />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/movies"} element={<MoviesPage />} />
      <Route path={"*"} element={<h1>Not found in frontend</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
