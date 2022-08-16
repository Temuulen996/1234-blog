import { useRouter } from "next/router";
import Layout from "../components/layout";
import { Row, Col } from "react-bootstrap";
import { getAllPosts, getPostBySlug } from "lib/api";
import BlockContent from "@sanity/block-content-to-react";
import HighlightCode from "components/HighlightCode";
import { urlFor } from "lib/api";
const serializers = {
  types: {
    code: (props) => (
      <HighlightCode language={props.node.language}>
        {props.node.code}
        <div className="code-filename">{props.node.filename}</div>
      </HighlightCode>
    ),
    image: (props) => (
      <div>
        <img src={urlFor(props.node.asset.url).height(500).width(600).url()} />
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
          <div className="blog-detail-header">
            <p className="lead mb-0">
              <img
                className="rounded-circle mr-3"
                height="50px"
                width="50px"
                src={post.publisher.picture}
              />
              {post.publisher.publisher_name}, {post.date}{" "}
              <i class="fa fa-search-plus" aria-hidden="true"></i>
            </p>

            <h1 className="font-weight-bold blog-detail-header-title mb-0">
              {post.title}
            </h1>

            <h2 className="blog-detail-header-subtitle mb-3">
              {post.subtitle}
            </h2>

            <img
              className="img-fluid rounded"
              alt={post.cover_image.alt}
              src={urlFor(post.cover_image.url).height(500).width(1100).url()}
            />
            <div className="code-filename" style={{ textAlign: "center" }}>
              {post.cover_image.url}
            </div>
          </div>
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
