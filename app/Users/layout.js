import Layout from "../../components/layout";
import Session from "../session";
import Users from "./page";

const UserLayOut = async () => {
  const session = Session();
  return (
    <Layout session={session}>
      <Users session={session} />
    </Layout>
  );
};

export default UserLayOut;
