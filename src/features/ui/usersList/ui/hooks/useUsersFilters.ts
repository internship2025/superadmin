"use client";

import { useGetUsersQuery } from "@/shared/api/query.generated";
import { useState } from "react";

export const useUsersFilters = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetUsersQuery({
    variables: {
      pageSize: itemsPerPage,
      pageNumber: currentPage,
    },
  });

  return {
    users: data?.getUsers.users ?? [],
    setItemsPerPage,
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems: data?.getUsers.pagination.totalCount ?? 0
  };
};
