import { useEffect, useState } from "react";

function useMovies() {
  const [movies, setMovies] = useState<any[]>([]);

  async function loadMovies() {
    const res = await fetch("/api/movies");
    setMovies(await res.json());
  }

  return { movies, loadMovies };
}

export function MoviesApplication() {
  const { movies, loadMovies } = useMovies();
  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <>
      <h1>Movies</h1>
      {movies.map((m) => (
        <li>
          {m.title} ({m.year})
        </li>
      ))}
    </>
  );
}
