import { useGetPostsLazyQuery, useGetPostsQuery } from "@/shared/api/query.generated";
import { useEffect, useRef} from "react";

export const useLazyPhotos = (userName: string | undefined) => {
  const observerRef = useRef(null);

  const [fetchInitialPosts, { data, loading, fetchMore }] = useGetPostsLazyQuery({
    fetchPolicy: 'network-only',
  });

useEffect(() => {
    if (userName) {
      fetchInitialPosts({
        variables: {
          searchTerm: userName,
          pageSize: 8,
          endCursorPostId: 0
        }
      });
    }
  }, [userName, fetchInitialPosts]);

    useEffect(() => {
    if (observerRef.current) {
        console.log(observerRef.current)
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !loading) {
            loadMore()
          }
        },
        { threshold: 0.1}
      );

      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [loading, data]);



  const loadMore = () => {
    if (loading || !data?.getPosts?.items?.length) return;
    fetchMore({
      variables: {
        endCursorPostId: data.getPosts.items.at(-1)?.id,
        pageSize: 8,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          getPosts: {
            ...fetchMoreResult.getPosts,
            items: [...prev.getPosts.items, ...fetchMoreResult.getPosts.items],
          },
        };
      },
    });
  };


  return { photos: data?.getPosts?.items || [], loading, observerRef, totalCount: data?.getPosts.totalCount || 0 };
};
