"use client";
import { useGetUserQuery } from "@/shared/api/query.generated";
import { BackButton } from "./backButton/BackButton";
import { EditProfile } from "./edit-profile/EditProfile";
import { UserBasicInfo } from "./userBasicInfo/UserBasicInfo";

export const ProfileUser = ({ id }: { id: string }) => {
  const { data } = useGetUserQuery({
    variables: {
      id: +id,
    },
  });

  const userName = data?.getUser.userName;

  return (
    <div>
      <BackButton />
      <UserBasicInfo data={data} />
      <EditProfile userName={userName} id={id} />
    </div>
  );
};
