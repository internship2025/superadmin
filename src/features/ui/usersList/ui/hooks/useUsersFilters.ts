"use client";

import { useGetUsersQuery } from "@/shared/api/query.generated";
import { SortDirection } from "@/types";
import { useState } from "react";

export type SortType = {
  sortDirection: SortDirection;
  sortBy: "createdAt" | "userName";
};

export const useUsersFilters = (search: string) => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortType>({
    sortDirection: SortDirection.Desc,
    sortBy: "createdAt",
  });
  const { data } = useGetUsersQuery({
    variables: {
      pageSize: itemsPerPage,
      pageNumber: currentPage,
       ...sort,
    },
  });

  const users = data?.getUsers.users;

  const filteredUsers = search
    ? users?.filter((u) =>
        u.userName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : users;

  return {
    users: filteredUsers ?? [],
    setItemsPerPage,
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems: data?.getUsers.pagination.totalCount ?? 0,
    setSort,
    sort,
  };
};


