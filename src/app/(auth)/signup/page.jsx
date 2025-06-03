"use client";

import Link from "next/link";
import styles from "./SignupPage.module.css";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { userInputSchema } from "@/lib/schemas/user.schema";
import GoogleBtn from "@/components/GoogleBtn";

const loginDataInitialState = { email: "", password: "", confirm: "" };

export default function SignupPage() {
  const [loginData, setLoginData] = useState(loginDataInitialState);
  const [errors, setErrors] = useState([]);

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
      alert("SUCCESS");
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
          name="email"
          placeholder="Email..."
          value={loginData.email}
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Contraseña..."
          value={loginData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirmar contraseña..."
          value={loginData.confirm}
          onChange={handleChange}
        />
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
            Ya tienes una cuenta? <Link href="/login">Ingresar</Link>
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
