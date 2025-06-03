"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status !== "authenticated")
    return (
      <div>
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <div className={styles.container}>
      <h1>Welcome home {session.user.name}</h1>
      <button onClick={() => signOut()}>SIGN_OUT</button>
    </div>
  );
}
