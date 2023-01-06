"use client";
import React, { useState } from "react";
import CreateBudget from "./CreateBudget";

const Budget = (params) => {
  const { session } = params
  const [createBudgetVisit, setCreateBudgetVisit] = useState(false);
  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={() => setCreateBudgetVisit((prevState) => !prevState)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-auto"
        >
          Add Budget
        </button>
      </div>
      <div>{createBudgetVisit ? <CreateBudget session={session} /> : ""}</div>
    </>
  );
};

export default Budget;
