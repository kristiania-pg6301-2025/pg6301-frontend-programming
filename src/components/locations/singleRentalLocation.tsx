import { type FormEvent, useEffect, useState } from "react";
import type { RentalLocation } from "../../../shared/rentalLocation.js";
import { fetchJson } from "../../../shared/fetchJson.js";

export function SingleRentalLocation({ id }: { id: string }) {
  const [location, setLocation] = useState<RentalLocation>();

  const [userReview, setUserReview] = useState("");

  async function loadLocation() {
    setLocation(await fetchJson(`/api/locations/${id}`));
  }

  useEffect(() => {
    loadLocation();
  }, [id]);

  if (!location) return <h1>Loading...</h1>;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await fetch(`/api/locations/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: userReview }),
    });
    await loadLocation();
    setUserReview("");
  }

  return (
    <article>
      <h1>{location.name}</h1>

      <blockquote>
        <strong>{location.summary}</strong>
      </blockquote>

      <img
        src={location.images.picture_url}
        alt={`Picture of ${location.name}`}
      />
      <p>{location.description}</p>

      <h2>Add your review</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <textarea
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
          />
        </p>
        <button>Submit</button>
      </form>

      <h2>Reviews</h2>

      {location.reviews
        .toSorted(({ date: a }, { date: b }) =>
          b.toString().localeCompare(a.toString()),
        )
        .map((r) => (
          <div key={r._id}>
            <h3>{new Date(r.date).toISOString()}</h3>
            <small>
              <>By </>
              <strong>{r.reviewer_name}</strong>
            </small>
            <p>{r.comments}</p>
          </div>
        ))}
    </article>
  );
}
