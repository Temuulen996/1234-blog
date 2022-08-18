import { useRouter } from "next/router";
import Layout from "../components/layout";
import { Row, Col } from "react-bootstrap";
import { getAllPosts, getPostBySlug } from "lib/api";
import BlockContent from "@sanity/block-content-to-react";
import HighlightCode from "components/highlight-code";
import { urlFor } from "lib/api";
import PostHeader from "../components/post-header";

const serializers = {
  types: {
    code: (props) => (
      <HighlightCode language={props.node.language}>
        {props.node.code}
        <div className="code-filename">{props.node.filename}</div>
      </HighlightCode>
    ),
    image: (props) => (
      <div className={`blog-image blog-image-${props.node.position}`}>
        {console.log(props)}
        <img src={urlFor(props.node.asset.url).height(500).width(800).url()} />
        <div className="code-filename" style={{ textAlign: "center" }}>
          {props.node.alt}
        </div>
      </div>
    ),
  },
};
export default ({ post }) => {
  const router = useRouter();

  return (
    <Layout>
      <Row>
        <Col md="12">
          {/* <pre>{JSON.stringify(post, null, 3)}</pre> */}
          <pre>{/*JSON.stringify(post, null, 2)*/}</pre>
          <PostHeader post={post} />
          <br />
          <BlockContent
            imageOptions={{ w: 320, h: 240, fit: "max" }}
            blocks={post.portableText}
            serializers={serializers}
          />
        </Col>
      </Row>
    </Layout>
  );
};
export const getStaticProps = async ({ params }) => {
  console.log(params.slug);
  const post = await getPostBySlug(params.slug);
  return {
    props: {
      post: post[0],
    },
  };
};
export const getStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
