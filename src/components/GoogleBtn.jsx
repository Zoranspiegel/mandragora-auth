"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import styles from "./styles/GoogleBtn.module.css";

export default function GoogleBtn() {
  return (
    <button
      className={styles.googleBtn}
      onClick={() => signIn("google", { redirectTo: "/home" })}
    >
      <FcGoogle fontSize="30px" />
      Google
    </button>
  );
}
