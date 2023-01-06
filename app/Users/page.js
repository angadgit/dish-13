"use client";
import React, { useState, useEffect } from "react";
import CreateUser from "./CreateUser";
import useSWR from "swr";
import UsersTable from "./UsersTable";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Users = (params) => {
  const { session } = params;
  const [createUserVisit, setCreateUserVisit] = useState(false);
  const { data, error, isLoading } = useSWR("/api/users", fetcher);

  useEffect(() => {
    setCreateUserVisit(false);
  }, [data]);
  const Users = data?.filter((item) => item.createdBy === session?.createdBy);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={() => setCreateUserVisit((prevState) => !prevState)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-auto"
        >
          Add User
        </button>
      </div>
      <div>{createUserVisit ? <CreateUser session={session} /> : ""}</div>
      {Users ? <UsersTable Users={Users} /> : ""}
    </>
  );
};

export default Users;
