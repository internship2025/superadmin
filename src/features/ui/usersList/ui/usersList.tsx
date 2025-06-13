"use client";

import styles from "./usersList.module.css";
import { Pagination } from "@/shared/ui/pagination/pagination";
import { useState } from "react";
import { Input } from "@/shared/ui/input/Input";
import { SelectDemo } from "@/shared/ui/select/select";
import { useUsersFilters } from "@/features/ui/usersList/ui/hooks/useUsersFilters";
import Image from "next/image";

export const UsersList = () => {
  const { users, setItemsPerPage, setCurrentPage, itemsPerPage, currentPage, totalItems } = useUsersFilters();

  const options = [
    { value: "blocked", label: "Blocked" },
    { value: "notBlocked", label: "Not Blocked" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.topContainer}>
        <Input
          type={"search"}
          placeholder={"Search"}
          className={styles.inputSearch}
          fullWidth={true}
        />
        <SelectDemo options={options} placeholder={"Not selected"} />
      </div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>User ID</th>
            <th className={styles.th}>Username</th>
            <th className={styles.th}>Profile link</th>
            <th className={styles.th}>Date added</th>
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
                  <Image
                    src={"/settings.svg"}
                    alt={"settings"}
                    width={30}
                    height={30}
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
