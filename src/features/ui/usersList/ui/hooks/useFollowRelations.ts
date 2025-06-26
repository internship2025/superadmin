import { useState } from "react";
import { SortType } from "./useUsersFilters";
import { SortDirection } from "@/types";
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
} from "@/shared/api/query.generated";

type FollowType = "followers" | "following";

export const useFollowRelations = (
  type: FollowType,
  userId: number,
  options?: {
    pageSize?: number;
    pageNumber?: number;
    sort?: SortType;
  }
) => {
  const defaultOptions = {
    pageSize: 8,
    pageNumber: 1,
    sort: {
      sortDirection: SortDirection.Desc,
      sortBy: "createdAt",
    },
    ...options,
  } as const;

  const [itemsPerPage, setItemsPerPage] = useState(defaultOptions.pageSize);
  const [currentPage, setCurrentPage] = useState(defaultOptions.pageNumber);
  const [sort, setSort] = useState<SortType>(defaultOptions.sort);

  const commonVariables = {
    pageSize: itemsPerPage,
    pageNumber: currentPage,
    ...sort,
    userId,
  };

  const followersQuery = useGetFollowersQuery({
    variables: commonVariables,
  });

  const followingQuery = useGetFollowingQuery({
    variables: commonVariables,
  });

  const { data } = type === "followers" ? followersQuery : followingQuery;

  let followersResponse;
  if (data && "getFollowers" in data) {
    followersResponse = data.getFollowers;
  } else {
    followersResponse = data?.getFollowing;
  }



  return {
    followersResponse: followersResponse?.items ?? [],
    totalItems: followersResponse?.totalCount ?? 0,
    itemsPerPage,
    currentPage,
    setItemsPerPage,
    setCurrentPage,
    sort,
    setSort,
  };
};
