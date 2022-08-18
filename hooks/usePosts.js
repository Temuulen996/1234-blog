import useSWR from "swr";

export const usePosts = (url) => {
  const { data, error } = useSWR("/api/posts", {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return;

      // Never retry for a specific key.
      if (key === "/api/user") return;

      // Only retry up to 10 times.
      if (retryCount >= 10) return;

      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
    initialData: { name: "saraa" },
  });

  return {
    data: data,
    isLoading: !error && !data,
    error,
  };
};
