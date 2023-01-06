"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../mix.module.css";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
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

  const addUserdata = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = inpval;
    if (name === "") {
      toast.warning("name is required!", {
        position: "top-center",
      });
    } else if (email === "") {
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
    } else if (cpassword === "") {
      toast.error("cpassword is required!", {
        position: "top-center",
      });
    } else if (cpassword.length < 6) {
      toast.error("confirm password must be 6 char!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      toast.error("pass and Cpass are not matching!", {
        position: "top-center",
      });
    } else {
      // console.log("user registration succesfully done");

      const data = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
          createdBy: email,
          userRole:[{ value: "Super Admin", label: "Super Admin" }]
        }),
      });

      const res = await data.json();
      if (res.status) {
        toast.success(res.message, {
          position: "top-center",
        });
        router.push('/Login')
        
        setInpval({
          ...inpval,
          name: "",
          email: "",
          password: "",
          cpassword: "",
        });
      } else {
        toast.error(res.message, {
          position: "top-center",
        });
      }
    }
  };

  return (
    <>
      <section className={style.section}>
        <div className={style.form_data}>
          <div className={style.form_heading}>
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              we are glad that you will be using disha to manage your tasks! we
              hope that you will like it
            </p>
          </div>

          <form>
            <div className={style.form_input}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.name}
                name="name"
                id="name"
                placeholder="Enter Your Name"
              />
            </div>
            <div className={style.form_input}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
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
                  value={inpval.password}
                  onChange={setVal}
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

            <div className={style.form_input}>
              <label htmlFor="password">Confirm Password</label>
              <div className={style.two}>
                <input
                  type={!cpassShow ? "password" : "text"}
                  value={inpval.cpassword}
                  onChange={setVal}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm password"
                />
                <div
                  className={style.showpass}
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className={style.btn} onClick={addUserdata}>
              Sign Up
            </button>
            <p>
              Already have an account? <Link href="/Login">Log In</Link>
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Register;
