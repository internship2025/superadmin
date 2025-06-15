import { useEffect, useState } from "react";
import s from "./SortArrows.module.css";
import { ArrowDown } from "./Arrow-down";
import { ArrowUp } from "./Arrow-up";
import { SortDirection } from "@/types";
import { SortType } from "../hooks/useUsersFilters";


type Props = {
  sort: SortType;
  filter: "createdAt" | "userName";
  setSort: (obj: SortType) => void;
};

export const SortArrows = ({ sort, filter, setSort }: Props) => {
  const [sortId, setSortId] = useState("");

  useEffect(() => {
    if (sort.sortBy !== filter) {
      setSortId("");
    }
  }, [sort.sortBy]);

  const arrayArrow = [
    { id: "Asc", component: ArrowUp },
    { id: "Desc", component: ArrowDown },
  ];

  let arrayArrowSort = arrayArrow;

  if (sortId !== "") {
    arrayArrowSort = arrayArrowSort.filter((it) => {
      return it.id === sortId;
    });
  }

  function handler(id: "Desc" | "Asc") {
    if (sortId === id) {
      setSortId("");
      setSort({ sortDirection: SortDirection.Desc, sortBy: "createdAt" });
      return;
    }
    setSort({ sortDirection: SortDirection[id], sortBy: filter });
    setSortId(id);
  }

  return (
    <div className={s.wrapper}>
      {arrayArrowSort.map((it) => {
        const directionLabel =
          it.id === "Asc"
            ? "Сортировать по возрастанию"
            : "Сортировать по убыванию";

        return (
          <it.component
            color={sortId ? "#FFFFFF" : "#4C4C4C"}
            aria-label={directionLabel}
            key={it.id}
            onClick={() => {
              handler(it.id as "Desc" | "Asc");
            }}
          />
        );
      })}
    </div>
  );
};
