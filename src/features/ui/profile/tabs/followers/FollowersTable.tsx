import { ColumnConfig, Table } from "@/shared/ui/table/Table";
import { FollowersItems } from "./Followers";
import { Pagination } from "@/shared/ui/pagination/pagination";
import { getDate } from "../../utils/date";
import s from "../../../../../shared/ui/table/Table.module.css";
import { SortType } from "@/features/ui/usersList/ui/hooks/useUsersFilters";
import { SortArrows } from "@/features/ui/usersList/ui/sortArrow/SortArrows";
interface FollowersTableProps {
  data: FollowersItems[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  totalItems: number;
  sort: SortType;
  setSort: (obj: SortType) => void;
}

export const FollowersTable = ({
  data,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  totalItems,
  sort,
  setSort,
}: FollowersTableProps) => {
  const sortableHeaderRenderer = ({
    title,
    sort,
    setSort,
    filter,
  }: {
    title: string;
    sort?: SortType;
    setSort?: (obj: SortType) => void;
    filter?: "createdAt" | "userName";
  }) => {
    if (!sort || !setSort || !filter) return <>{title}</>;
    return (
      <span className={s.sortableHeader}>
        {title} <SortArrows sort={sort} setSort={setSort} filter={filter} />
      </span>
    );
  };
  const columns: ColumnConfig[] = [
    { id: 1, title: "User ID" },
    {
      id: 2,
      title: "Profile link",
      filter: "userName",
      headerRenderer: sortableHeaderRenderer,
    },
    { id: 3, title: "Username" },
    {
      id: 4,
      title: "Subscription Date",
      filter: "createdAt",
      headerRenderer: sortableHeaderRenderer,
    },
  ];
  return (
    <div>
      <Table<FollowersItems>
        sort={sort}
        setSort={setSort}
        data={data}
        columns={columns}
        renderRow={(follow) => {
          return (
            <tr className={s.tr} key={follow.userId}>
              <td>{follow.userId}</td>
              <td>{follow.userName}</td>
              <td>{follow.firstName}</td>
              <td>{getDate(follow.createdAt)}</td>
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
