"use client";
import {useSearchParams } from "next/navigation";
import { AccountTabs } from "./accountTabs/AccountTabs";
import { Payments } from "../tabs/payments/Payments";
import { Followers } from "../tabs/followers/Followers";
import { Following } from "../tabs/following/Following";
import { UploadedPhotos } from "../tabs/uploaded-photos/UploadedPhotos";

export type ProfileTab =
  | "Uploaded-photos"
  | "Payments"
  | "Followers"
  | "Following";

export const EditProfile = ({ id, userName }: { id: string, userName: string | undefined }) => {
  const searchParams = useSearchParams();

  let userId = +id;

  let activeTab = (searchParams.get("tab") as ProfileTab) || "Uploaded-photos";

  return (
    <div>
      <AccountTabs userId={userId} activeTab={activeTab} />
      {(activeTab === "Uploaded-photos" && <UploadedPhotos userName = {userName}/>) ||
        (activeTab === "Payments" && <Payments userId={userId} />) ||
        (activeTab === "Followers" && <Followers userId={userId} />) ||
        (activeTab === "Following" && <Following userId={userId} />)}
    </div>
  );
};
