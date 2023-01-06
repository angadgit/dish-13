import Layout from "../../components/layout";
import Session from "../session";
import MyProfile from "./page";


const UserLayOut = async () => {
  const session = Session();
  return (
    <Layout session={session}>
      <MyProfile session={session} />
    </Layout>
  );
};

export default UserLayOut;
