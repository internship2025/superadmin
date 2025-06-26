import { useGetPaymentsByUserQuery } from "@/shared/api/query.generated";
import { useState } from "react";

export const usePayments = (id: number) => {
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading } = useGetPaymentsByUserQuery({
    variables: {
      pageSize: itemsPerPage,
      pageNumber: currentPage,
      userId: id,
    },
  });

// console.log(data?.getPaymentsByUser)
  return {
    data: data?.getPaymentsByUser.items,
    totalItems:  data?.getPaymentsByUser.totalCount ?? 0,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  };
};
