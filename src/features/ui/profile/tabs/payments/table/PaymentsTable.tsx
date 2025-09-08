import { Table } from "@/shared/ui/table/Table";
import { PaymentItems } from "../Payments";
import { getDate } from "../../../utils/date";
import s from "../../../../../../shared/ui/table/Table.module.css";
import { Pagination } from "@/shared/ui/pagination/pagination";

interface PaymentsTableProps {
  data: PaymentItems[] | undefined;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  totalItems: number;
}

export const PaymentsTable = ({
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  totalItems,
}: PaymentsTableProps) => {
  const columns = [
    { id: 1, title: "Date of Payment" },
    { id: 2, title: "End date of subscription" },
    { id: 3, title: "Amount, $" },
    { id: 4, title: "Subscription Type" },
    { id: 5, title: "Payment Type" },
  ];

  if (!data) {
    return <div>There are no subscriptions</div>;
  }

  return (
    <div>
      <Table<PaymentItems>
        data={data}
        columns={columns}
        renderRow={(payment) => {
          return (
            <tr className={s.tr} key={payment.id}>
              <td>{getDate(payment.startDate)}</td>
              <td>{getDate(payment.endDate)}</td>
              <td>${payment.price}</td>
              <td>1 {payment.type}</td>
              <td>{payment.paymentType}</td>
            </tr>
          );
        }}
      />
      {data.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      )}
    </div>
  );
};
