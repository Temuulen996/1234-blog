// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts } from "lib/api";
export default async (req, res) => {
  console.log(req.query);
  const page = parseInt(req.query.page);

  const limit = parseInt(req.query.limit);
  const posts = await getAllPosts(page, limit);
  res.status(200).json(posts);
};
