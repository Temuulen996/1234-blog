import client from "./sanity";
export const getAllPosts = async () => {
  const posts = await client.fetch(
    `*[_type=="post"]{_createdAt ,title , subtitle}`
  );
  return posts;
};
