import { Card } from "react-bootstrap";
import moment from "moment";
import Link from "next/link";
import { urlFor } from "lib/api";
export default ({ post }) => {
  moment.locale("mn");
  return (
    <Card className={`fj-card`}>
      <div className="card-body-wrapper">
        <Card.Header className="d-flex flex-row">
          <img
            src={urlFor(post.publisher.picture).height(500).width(700).url()}
            className="rounded-circle mr-3"
            height="50px"
            width="50px"
            alt="avatar"
          />
          <div>
            <Card.Title className="font-weight-bold mb-1">
              {post.publisher.publisher_name}
            </Card.Title>
            <Card.Text className="card-date">
              {moment(post.date).endOf("day").fromNow()}
            </Card.Text>
          </div>
        </Card.Header>
        <Link href={`/${post.slug}`}>
          <a>
            <div className="view overlay">
              <Card.Img src={post.image} alt="Card image cap" />
            </div>
            <Card.Body>
              <Card.Title className="card-main-title">{post.title}</Card.Title>
              <Card.Text>{post.subtitle}</Card.Text>
            </Card.Body>
          </a>
        </Link>
      </div>
    </Card>
  );
};
