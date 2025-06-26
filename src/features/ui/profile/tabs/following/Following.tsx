import {GetFollowingQuery } from "@/shared/api/query.generated";
import { useFollowRelations } from "@/features/ui/usersList/ui/hooks/useFollowRelations";
import { FollowingTable } from "./FollowingTable";

export type FollowingItems = GetFollowingQuery["getFollowing"]["items"][0];

export const Following = ({ userId }: { userId: number }) => {
  const {
    followersResponse,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    setSort,
    totalItems,
    sort,
  } = useFollowRelations('following', userId);




  return (
    <FollowingTable
      setSort={setSort}
      sort={sort}
      data={followersResponse}
      onItemsPerPageChange={setItemsPerPage}
      onPageChange={setCurrentPage}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      totalItems={totalItems}
    />
  );
};
