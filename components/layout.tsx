import React from "react";
import MainMenu from "./sideMenu";
import Props from "./props";
import NotificationIcon from "./svgs/notification-icon";
import SearchIcon from "./svgs/search-icon";

function Layout({session, children}) {
  // console.log(session)
  return (
    <div className="flex h-screen w-screen flex-row bg-white font-inter">
      <MainMenu />
      {/* header  */}
      <div className="flex flex-1 flex-col space-y-5 p-5 overflow-y-auto">
        <div className="flex flex-row justify-between space-x-10">
          <div className="items-center flex">
            <h2 className="text-justify font-bold text-lg">Welcome <span className="font-normal">{session?.userEmail}</span></h2>
          </div>
          <div className="flex">
          <button>
            <NotificationIcon />
          </button>
          <form className="flex flex-row items-center rounded-xl bg-white py-3 pr-6 pl-8 drop-shadow-card">
            <label htmlFor="search" className="w-full max-w-xs ">
              <input
                placeholder="Search"
                className="focus-visible:outline-none"
              />
            </label>
            <button type="submit">
              <SearchIcon />
            </button>
            </form>
            </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
