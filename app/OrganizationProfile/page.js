"use client";
import React, { useState, useEffect } from "react";
import CreatOrganizationProfile from "./CreatOrganizationProfile";

const OrganizationProfile = (params) => {
  const { session } = params;
  const [createOrganizationVisit, setCreateOrganizationVisit] = useState(false);
  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={() => setCreateOrganizationVisit((prevState) => !prevState)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-auto"
        >
          Add Organization Profile
        </button>
      </div>
      <div>
        {createOrganizationVisit ? (
          <CreatOrganizationProfile session={session} />
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default OrganizationProfile
