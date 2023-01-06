import Layout from "../../components/layout";
import Session from "../session";
import Budget from "./page";

const BudgetLayout = async () => {
  const session = Session();
  return (
    <Layout session={session}>
      <Budget session={session} />
    </Layout>
  );
};

export default BudgetLayout;
