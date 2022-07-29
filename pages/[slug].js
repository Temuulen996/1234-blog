import { useRouter } from "next/router";
import Layout from "../components/layout";
export default () => {
  const router = useRouter();
  return <Layout>hello {router.query.slug}</Layout>;
};
