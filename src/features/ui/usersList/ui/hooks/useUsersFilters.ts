"use client";

import { useGetUsersQuery } from "@/shared/api/query.generated";
import { useState } from "react";

export const useUsersFilters = (search: string) => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetUsersQuery({
    variables: {
      pageSize: itemsPerPage,
      pageNumber: currentPage,
    },
  });

  const users = data?.getUsers.users;

  const filteredUsers = search
    ? users?.filter((u) =>
        u.userName.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      )
    : users;

  return {
    users: filteredUsers ?? [],
    setItemsPerPage,
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems: data?.getUsers.pagination.totalCount ?? 0,
  };
};
