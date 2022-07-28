import client from "./sanity";
export const getAllPosts = async () => {
  const posts = await client.fetch(
    `*[_type=="post"]{_createdAt ,title , subtitle ,"image":cover_image.asset->url , date,"slug":slug.current}`
  );
  return posts;
};
