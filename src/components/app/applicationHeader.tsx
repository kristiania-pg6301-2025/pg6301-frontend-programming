import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function ApplicationHeader() {
  const [userinfo, setUserinfo] = useState<{ name: string }>();
  async function loadUserinfo() {
    setUserinfo(await (await fetch("/api/userinfo")).json());
  }

  useEffect(() => {
    loadUserinfo();
  }, []);

  return (
    <header>
      <div>
        <Link to={"/"}>Logo</Link>
      </div>
      <div>Main page</div>
      <div className={"spacer"} />
      {userinfo ? (
        <div>{userinfo.name}</div>
      ) : (
        <a href={"/api/login/linkedin"}>Log on</a>
      )}
      <div>Help</div>
    </header>
  );
}
