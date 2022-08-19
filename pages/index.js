import { Row, Col } from "react-bootstrap";
import { getAllPosts } from "lib/api";
import ListItem from "components/list-item";
import GridItem from "components/grid-item";
import Layout from "../components/layout";
import Intro from "components/intro";
import { Suspense } from "react";
import useSWR from "swr";
import { usePosts } from "hooks/usePosts";
import useSWRInfinite from "swr/infinite";
const PAGE_LIMIT = 3;
export default function Home({ posts }) {
  //const { data, isLoading, error } = usePosts(posts);
  const { data, size, setSize } = useSWRInfinite(
    (index) => `/api/posts?page=${index}&limit=${PAGE_LIMIT}`
  );
  // if (error) return <div>aldaa garlaa!! {JSON.stringify(error, null, 2)}</div>;
  // if (isLoading) return <div>achaallaj baina...</div>;
  console.log(data);
  return (
    <Layout>
      <Row>
        <Col md="12">
          <Intro />
        </Col>
      </Row>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Row className="mb-5">
        <Col md="10">
          <ListItem />
        </Col>
        {data ? (
          data.map((page) =>
            page.map((post) => (
              <Col key={post.id} md={12 / PAGE_LIMIT}>
                <GridItem post={post} key={post.id} />
              </Col>
            ))
          )
        ) : (
          <div>tur huleene uu</div>
        )}
      </Row>
      {data ? (
        <div style={{ textAlign: "center" }}>
          {data[data.length - 1].length !== 0 ? (
            <button onClick={() => setSize(size + 1)}>tsaash ni</button>
          ) : null}
        </div>
      ) : (
        <div>tur huleene uu</div>
      )}
    </Layout>
  );
}
export const getStaticProps = async () => {
  const posts = await getAllPosts(1, PAGE_LIMIT);
  return {
    props: {
      posts,
    },
  };
};
