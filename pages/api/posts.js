// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts } from "lib/api";
export default async (req, res) => {
  const posts = await getAllPosts();
  res.status(200).json({ name: "sainuu", posts });
};
