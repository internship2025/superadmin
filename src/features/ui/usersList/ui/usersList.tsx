"use client";

import styles from "./usersList.module.css";
import { Pagination } from "@/shared/ui/pagination/pagination";
import { useState } from "react";

export const UsersList = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>User ID</th>
            <th className={styles.th}>Username</th>
            <th className={styles.th}>Username</th>
            <th className={styles.th}>Profile link</th>
            <th className={styles.th}>Date added</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <Pagination
        currentPage={page}
        itemsPerPage={rowsPerPage}
        totalItems={1}
        onPageChange={setPage}
        onItemsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};
