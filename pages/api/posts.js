// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts, getPaginatedPosts } from "lib/api";
export default async (req, res) => {
  const page = parseInt(req.query.page);

  const limit = parseInt(req.query.limit);
  const posts = await getPaginatedPosts(page, limit);
  res.status(200).json(posts);
};
