import { SortType } from "@/features/ui/usersList/ui/hooks/useUsersFilters";
import s from "./Table.module.css";

export type ColumnConfig = {
  id: number;
  title: string;
  filter?: "createdAt" | "userName";
  headerRenderer?: (props: {
    title: string;
    sort?: SortType;
    setSort?: (sort: SortType) => void;
    filter?: "createdAt" | "userName";
  }) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: ColumnConfig[];
  renderRow: (item: T) => React.ReactNode;
  sort?: SortType;
  setSort?: (sort: SortType) => void;
};

export const Table = <T,>({
  data,
  columns,
  renderRow,
  sort,
  setSort,
}: TableProps<T>) => {
  return (
    <table className={s.table}>
      <thead className={s.header}>
        <tr>
          {columns.map((it) => {
            if (it.headerRenderer) {
              return (
                <th className={s.th} key={it.id}>
                  {it.headerRenderer({
                    title: it.title,
                    sort,
                    setSort,
                    filter: it.filter,
                  })}
                </th>
              );
            }
            return (
              <th className={s.th} key={it.id}>
                {it.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.length !== 0 && data.map(renderRow)}
      </tbody>
    </table>
  );
};
