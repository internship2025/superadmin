"use client";

import styles from "./usersList.module.css";
import { Pagination } from "@/shared/ui/pagination/pagination";
import { ChangeEvent, useState } from "react";
import { Input } from "@/shared/ui/input/Input";
import { SelectDemo } from "@/shared/ui/select/select";
import { useUsersFilters } from "@/features/ui/usersList/ui/hooks/useUsersFilters";
import { SortArrows } from "./sortArrow/SortArrows";
import PersonRemoveOutline from "@/assets/icons/components/PersonRemoveOutline";
import BlockOutline from "@/assets/icons/components/BlockOutline";
import MoreHorizontalOutline from "@/assets/icons/components/MoreHorizontalOutline";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import { useRouter } from "next/navigation";

export const UsersList = () => {
  const [search, setSearch] = useState("");

  const {
    users,
    setItemsPerPage,
    setCurrentPage,
    itemsPerPage,
    currentPage,
    totalItems,
    setSort,
    sort,
  } = useUsersFilters(search);

  const router = useRouter();

  const handlerActionUser = (label: string, id: number) => {
    if (label === "More Information") {
      router.push(`/profile/${id}`);
    }
  };

  const options = [
    { value: "blocked", label: "Blocked" },
    { value: "notBlocked", label: "Not Blocked" },
  ];

  const itemsForDropdown = [
    {
      icon: <PersonRemoveOutline />,
      label: "Delete User",
    },
    {
      icon: <BlockOutline />,
      label: "Ban in the system",
    },
    {
      icon: <MoreHorizontalOutline />,
      label: "More Information",
    },
  ];

  const handlerInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.topContainer}>
        <Input
          type={"search"}
          placeholder={"Search"}
          className={styles.inputSearch}
          fullWidth={true}
          onChange={(e) => handlerInputSearch(e)}
        />
        <SelectDemo options={options} placeholder={"Not selected"} />
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>User ID</th>
            <th className={styles.th}>
              <span className={styles.sortableHeader}>
                Username{" "}
                <SortArrows sort={sort} setSort={setSort} filter={"userName"} />
              </span>
            </th>
            <th className={styles.th}>Profile link</th>
            <th className={styles.th}>
              {" "}
              <span className={styles.sortableHeader}>
                Date added{" "}
                <SortArrows
                  sort={sort}
                  setSort={setSort}
                  filter={"createdAt"}
                />
              </span>
            </th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {users.map((user) => {
            return (
              <tr className={styles.trTable} key={user.id}>
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>
                  <span title={user.email}>{user.email.split("@")[0]}</span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString("ru-RU")}</td>
                <td>
                  <Dropdown
                    items={itemsForDropdown}
                    onClick={(label) => handlerActionUser(label, user.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};
