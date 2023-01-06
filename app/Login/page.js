"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import style from "../mix.module.css";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from "../../helpers/baseUrl";

const Login = () => {
  const router = useRouter();

  const [passShow, setPassShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;
    if (email === "") {
      toast.error("email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center",
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center",
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center",
      });
    } else {
      // console.log("user login succesfully done");
      setIsDisabled(true);
      const data = await fetch(`${BaseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const res = await data.json();
      if (res.success) {
        // localStorage.setItem("usersdatatoken", res.result.token);
        router.push("/dash");
        setInpval({ ...inpval, email: "", password: "" });
        setIsDisabled(false);
      } else {
        toast.error(res.message, {
          position: "top-center",
        });
        setIsDisabled(false);
      }
    }
  };

  return (
    <>
      <section className={style.section}>
        <div className={style.form_data}>
          <div className={style.form_heading}>
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are glad you are back. Please login.</p>
          </div>

          <form>
            <div className={style.form_input}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={inpval.email}
                onChange={setVal}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className={style.form_input}>
              <label htmlFor="password">Password</label>
              <div className={style.two}>
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={setVal}
                  value={inpval.password}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className={style.showpass}
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button
              className={`${style.btn} ${isDisabled ? "disabled" : ""}`}
              onClick={loginuser}
            >
              Login
            </button>
            <p>
              Don&apos;t have an Account? <Link href="/Register">Sign Up</Link>{" "}
            </p>
            <p style={{ color: "black", fontWeight: "bold" }}>
              Forgot Password <Link href="/PasswordReset">Click Here</Link>{" "}
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Login;
