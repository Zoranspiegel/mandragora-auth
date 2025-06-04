"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
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
      <div className={styles.container}>
        <h1>LOADING...</h1>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Welcome Home</h1>
        <h2>{session.user.name}</h2>
      </div>
      <div className={styles.avatar}>
        {session.user.image ? (
          <Image src={session.user.image} alt="avatar" fill />
        ) : (
          <div className={styles.noavatar}>{session.user.name[0]}</div>
        )}
      </div>
      <button onClick={() => signOut()} className={styles.signoutBtn}>
        Sign Out
      </button>
    </div>
  );
}
