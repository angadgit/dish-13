"use client";

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import style from "../../mix.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ForgotPassword = ({ params }) => {
  const router = useRouter();
  const token = params?.id;

  const [data2, setData] = useState(false);

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const sendpassword = async () => {
    const data = {
      password: password,
      token,
    };
    const res = await fetch(`/api/resetPassword`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res2 = await res.json();

    if (res2.sucess) {
      router.push("/Login");
    } else {
      console.log("Something wrong...!");
    }
  };

  const setval = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data2 ? (
        <>
          <section>
            <div className={style.form_data}>
              <div className={style.form_heading}>
                <h1>Enter Your NEW Password</h1>
              </div>

              <form>
                {message ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Password Succesfulyy Update{" "}
                  </p>
                ) : (
                  ""
                )}
                <div className={style.form_input}>
                  <label htmlFor="password">New password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={setval}
                    name="password"
                    id="password"
                    placeholder="Enter Your new password"
                  />
                </div>

                <button className={style.btn} onClick={sendpassword}>
                  Send
                </button>
              </form>
              <p>
                <Link href="/">Home</Link>
              </p>
              <ToastContainer />
            </div>
          </section>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;
