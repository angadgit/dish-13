import * as React from "react";
import Layout from "../../components/layout";
import Session from "../session";

const Dashboard = () => {
  const session = Session();
  return (
    <>
      <Layout session={session}>
        <div className="flex w-80 flex-col space-y-4 overflow-y-auto bg-gray-04 px-7 py-8">
          
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
