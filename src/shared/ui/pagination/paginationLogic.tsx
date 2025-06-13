import styles from "./pagination.module.css";
import {
  NextButton,
  PageButton,
  PrevButton,
} from "@/shared/ui/pagination/buttonForPagination/buttonForPagination";
import { useState, useEffect } from "react";

type PropsType = {
  totalPages: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handlePageClick: (page: number) => void;
  currentPage: number;
};

export const PaginationLogic = ({
  totalPages,
  handlePreviousPage,
  handleNextPage,
  handlePageClick,
  currentPage,
}: PropsType) => {
  const [inputValue, setInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setInputValue(currentPage.toString());
  }, [currentPage]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    const page = parseInt(inputValue);
    if (page && page >= 1 && page <= totalPages) {
      handlePageClick(page);
    } else {
      setInputValue(currentPage.toString());
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    }
  };

  return (
    <div className={styles.pagination}>
      <PrevButton disabled={currentPage <= 1} callback={handlePreviousPage} />
      
      <div className={styles.pageInput}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className={styles.input}
        />
        <span className={styles.totalPages}>of {totalPages}</span>
      </div>

      <NextButton
        disabled={currentPage >= totalPages}
        callback={handleNextPage}
      />
    </div>
  );
};
