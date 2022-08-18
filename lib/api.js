import client from "./sanity";

import imageUrlBuilder from "@sanity/image-url";
const builder = imageUrlBuilder(client);
export const urlFor = (source) => {
  return builder.image(source);
};
export const getAllPosts = async () => {
  const posts = await client.fetch(
    `*[_type=="post"]{_createdAt ,title , subtitle ,"image":cover_image.asset->url , date,"slug":slug.current ,"publisher": publisher->{publisher_name, "picture":publisher_image.asset->url}} | order(date desc)`
  );
  return posts;
};
export const getPostBySlug = async (slug) => {
  const posts = await client.fetch(
    `*[_type=="post" && slug.current==$slug]{_createdAt ,title ,portableText[]{..., "asset":asset->}, subtitle ,cover_image , date,"slug":slug.current ,"publisher": publisher->{publisher_name, "picture":publisher_image.asset->url} , }`,
    { slug }
  );
  return posts;
};
