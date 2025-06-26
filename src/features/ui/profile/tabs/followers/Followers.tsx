import { GetFollowersQuery } from "@/shared/api/query.generated";
import { FollowersTable } from "./FollowersTable";
import { useFollowRelations } from "@/features/ui/usersList/ui/hooks/useFollowRelations";

export type FollowersItems = GetFollowersQuery["getFollowers"]["items"][0];

export const Followers = ({ userId }: { userId: number }) => {
  const {
    followersResponse,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    setSort,
    totalItems,
    sort,
  } = useFollowRelations('followers', userId);




  return (
    <FollowersTable
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
