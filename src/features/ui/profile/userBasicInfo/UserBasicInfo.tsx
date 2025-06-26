"use client";

import { GetUserQuery } from "@/shared/api/query.generated";
import Image from "next/image";
import s from "./UserBasicInfo.module.css";
import { getDate } from "../utils/date";

export const UserBasicInfo = ({ data }: { data: GetUserQuery | undefined }) => {
  const avatarUrl = data?.getUser?.profile?.avatars?.[0]?.url;
  console.log(avatarUrl);
  let user = data?.getUser;

  console.log(user);

  return (
    <div className={s.userCard}>
      <div className={s.wrapper}>
        <Image
          className={s.avatar}
          width={60}
          height={60}
          src={avatarUrl ? avatarUrl : "/i.webp"}
          alt="user"
        />
        <div className={s.userInfo}>
          <span
            className={s.name}
          >{`${user?.profile.firstName} ${user?.profile.lastName}`}</span>
          <a href="#"
          >{user?.userName}</a>
        </div>
      </div>
      <div className={s.wrapper}>
        <div>
          <div className={s.text}>UserID</div>
          <div className={s.data}>{user?.profile.id}</div>
        </div>
        <div>
          <div className={s.text}>Profile Creation Date</div>
          <div className={s.data}>{getDate(data?.getUser.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};
