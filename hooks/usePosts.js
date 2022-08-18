import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

export const usePosts = () => {
  const { data, error } = useSWR("/api/posts", fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
