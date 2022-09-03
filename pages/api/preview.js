// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllPosts, getPaginatedPosts } from "lib/api";
export default async (req, res) => {
  //   if (process.env.SANITY_PREVIEW_SECRET !== req.query.sercet)
  //     return res
  //       .status(200)
  //       .json({ message: "invalid password" + req.query.secret });
  res.setPreviewData({ data: req.query.secret });
  res.writeHead(307, { Location: encodeURI(`/${req.query.slug}`) });
  res.end();
};
