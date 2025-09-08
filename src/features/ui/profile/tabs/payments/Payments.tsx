import { usePayments } from "@/features/ui/usersList/ui/hooks/usePayments";
import { PaymentsTable } from "./table/PaymentsTable";
import { GetPaymentsByUserQuery } from "@/shared/api/query.generated";

export type PaymentItems =
  GetPaymentsByUserQuery["getPaymentsByUser"]["items"][0];

export const Payments = ({ userId }: { userId: number }) => {
  const {
    data,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
  } = usePayments(userId);


  return (
    <div>
      <PaymentsTable
        data={data}
        onItemsPerPageChange={setItemsPerPage}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        totalItems = {totalItems}
      />
    </div>
  );
};
