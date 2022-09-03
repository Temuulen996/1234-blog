import Layout from "../components/layout";
import { Row, Col } from "react-bootstrap";
import { getAllPosts, getPaginatedPosts, getPostBySlug } from "lib/api";
import BlockContent from "@sanity/block-content-to-react";
import HighlightCode from "components/highlight-code";
import { urlFor } from "lib/api";
import PostHeader from "../components/post-header";
import { useRouter } from "next/router";
export default ({ post, preview }) => {
  const router = useRouter();
  if (router.isFallback && !post?.slug)
    return (
      <Layout>
        <div>уучлаарай ийм посв байхгүй.</div>
      </Layout>
    );
  return (
    <Layout>
      <Row>
        <Col md="12">
          {preview && <div>та preview горимд байна.</div>}
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
        <img src={urlFor(props.node.asset.url).height(500).width(800).url()} />
        <div className="code-filename" style={{ textAlign: "center" }}>
          {props.node.alt}
        </div>
      </div>
    ),
  },
};
export const getStaticProps = async ({
  params,
  preview = false,
  previewData,
}) => {
  const post = await getPostBySlug(params.slug, preview);
  return {
    props: {
      post: post.length > 1 ? post[1] : post.length > 0 ? post[0] : {},
      preview,
    },
  };
};
export const getStaticPaths = async () => {
  const posts = await getPaginatedPosts(0, 4);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: true,
  };
};
