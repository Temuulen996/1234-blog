import { Row, Col } from "react-bootstrap";
import { getAllPosts } from "lib/api";
import ListItem from "components/list-item";
import GridItem from "components/grid-item";
import Layout from "../components/layout";
import Intro from "components/intro";
import useSWR from "swr";
import { usePosts } from "hooks/usePosts";
export default function Home({ posts }) {
  const { data, isLoading, error } = usePosts();
  if (error) return <div>aldaa garlaa!! {JSON.stringify(error, null, 2)}</div>;
  if (isLoading) return <div>achaallaj baina...</div>;

  return (
    <Layout>
      <Row>
        <Col md="12">
          <Intro />
        </Col>
      </Row>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Row className="mb-5">
        <Col md="10">
          <ListItem />
        </Col>
        {posts.map((post) => (
          <Col md="4">
            <GridItem post={post} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}
export const getStaticProps = async () => {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
};
