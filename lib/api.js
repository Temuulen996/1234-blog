import client from "./sanity";
export const getAllPosts = async () => {
  const posts = await client.fetch(
    `*[_type=="post"]{_createdAt ,title , subtitle ,"image":cover_image.asset->url , date,"slug":slug.current ,"publisher": publisher->{publisher_name, "picture":publisher_image.asset->url}}`
  );
  return posts;
};
export const getPostBySlug = async (slug) => {
  const posts = await client.fetch(
    `*[_type=="post" && slug.current==$slug]{_createdAt ,title ,portableText[]{..., "asset":asset->}, subtitle ,cover_image{alt , "url" : asset->url} , date,"slug":slug.current ,"publisher": publisher->{publisher_name, "picture":publisher_image.asset->url} , }`,
    { slug }
  );
  return posts;
};
