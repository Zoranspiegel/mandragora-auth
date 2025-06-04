"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import GoogleBtn from "@/components/GoogleBtn";
import { userInputSchema } from "@/lib/schemas/user.schema";
import styles from "./LoginPage.module.css";

const loginDataInitialState = { name: "", email: "", password: "" };

export default function LoginPage() {
  const router = useRouter();
  const [loginData, setLoginData] = useState(loginDataInitialState);
  const [errors, setErrors] = useState([]);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status]);

  function handleChange(e) {
    setLoginData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);

    const { data, error, success } = userInputSchema.safeParse(loginData);

    if (success) {
      signIn("credentials", { ...data, redirect: false });
    } else {
      const errors = error.errors.map((error) => error.message);
      setErrors((prevState) => [...prevState, ...errors]);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de usuario..."
          value={loginData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email..."
          value={loginData.email}
          onChange={handleChange}
        />
        <div>
          <input
            type="password"
            name="password"
            placeholder="Contraseña..."
            value={loginData.password}
            onChange={handleChange}
          />
          {/* <span>
            <Link href="/login">Olvidaste tu contraseña?</Link>
          </span> */}
        </div>
        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <div>
          <button>Continuar</button>
          <span>
            No tienes una cuenta? <Link href="/signup">Registrarse</Link>
          </span>
        </div>
      </form>
      <div className={styles.o}>
        <span>o</span>
      </div>
      <GoogleBtn />
    </div>
  );
}
