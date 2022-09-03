const sanityClient = require("@sanity/client");
const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATA_SET,
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!

  useCdn: process.NODE_ENV === "production", // `false` if you want to ensure fresh data
});
export const previewClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATA_SET,
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!

  useCdn: false, // `false` if you want to ensure fresh data
  token:
    "skeJAUqqzeG1fyCRxmfXHvLpzB3El5ykjJPTqEhdrSx6mQYQPf8ntpb6jUTOWj8C2YbdSJP06QH4ibUwhM69m213yx2e4BsQOJV72s6VukyDyikFWFIT3LXai9PTqbYdZQxgcQIcfF996kupIgIR11zRl4JJSaHfb7X6gcnqSsH7PAWUdZLy",
});

export default client;
