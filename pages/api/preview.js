// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts, getPaginatedPosts } from "lib/api";
export default async (req, res) => {
  if (process.env.SANITY_PREVIEW_SECRET !== req.query.sercet)
    return res
      .status(200)
      .json({ message: "invalid password" + req.query.secret });
  res.status(200).json({ message: "амжилттай" + req.query.slug });
};
