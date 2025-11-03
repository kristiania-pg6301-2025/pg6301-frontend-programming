import { useEffect, useState } from "react";

export function ApplicationHeader() {
  const [userinfo, setUserinfo] = useState<{ name: string }>();

  async function loadUserinfo() {
    const res = await fetch("/api/userinfo");
    if (res.ok) setUserinfo(await res.json());
  }

  useEffect(() => {
    loadUserinfo();
  }, []);

  return (
    <header>
      <div>Logo</div>
      <div style={{ flex: 1 }} />
      <div>
        {userinfo ? (
          <>
            {userinfo.name}{" "}
            <button>
              <a href={"/api/login/linkedin/endsession"}>➜]</a>
            </button>
          </>
        ) : (
          <a href={"/api/login/linkedin"}>Log in</a>
        )}
      </div>
    </header>
  );
}
