import Layout from "../../components/layout";
import Session from "../session";
import OrganizationProfile from "./page";


const OrganizationProfileLayout = async () => {
  const session = Session();
  return (
    <Layout session={session}>
      <OrganizationProfile session={session} />
    </Layout>
  );
};

export default OrganizationProfileLayout;
