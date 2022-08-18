import moment from "moment";
import { urlFor } from "lib/api";
export default ({ post }) => {
  moment.locale("mn");
  return (
    <div className="blog-detail-header">
      <p className="lead mb-0">
        <img
          className="rounded-circle mr-3"
          height="50px"
          width="50px"
          src={post.publisher.picture}
        />
        {post.publisher.publisher_name}, {moment(post.date).format("MMM Do YY")}{" "}
        <i class="fa fa-search-plus" aria-hidden="true"></i>
      </p>

      <h1 className="font-weight-bold blog-detail-header-title mb-0">
        {post.title}
      </h1>

      <h2 className="blog-detail-header-subtitle mb-3">{post.subtitle}</h2>

      <img
        className="img-fluid rounded"
        alt={post.cover_image.alt}
        src={urlFor(post.cover_image).height(500).width(1100).url()}
      />
      <div className="code-filename" style={{ textAlign: "center" }}>
        {post.cover_image.url}
      </div>
    </div>
  );
};
