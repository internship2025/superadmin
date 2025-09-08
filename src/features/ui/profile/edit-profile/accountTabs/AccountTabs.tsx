import Link from "next/link";
import s from "./AccountTabs.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ProfileTab } from "../EditProfile";

type AccountTabsType = {
  userId: number | undefined;
  activeTab: ProfileTab;
};

export const AccountTabs = ({ userId, activeTab }: AccountTabsType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams.get("tab")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("tab", "Uploaded-photos");
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  const TABS = [
    {
      id: "Uploaded-photos",
      href: `/profile/${userId}?tab=Uploaded-photos`,
      label: "Uploaded-photos",
    },
    {
      id: "Payments",
      href: `/profile/${userId}?tab=Payments`,
      label: "Payments",
    },
    {
      id: "Followers",
      href: `/profile/${userId}?tab=Followers`,
      label: "Followers",
    },
    {
      id: "Following",
      href: `/profile/${userId}?tab=Following`,
      label: "Following",
    },
  ];

  const tabs = TABS.map((it) => {
    return (
      <Link
        key={it.id}
        href={it.href}
        className={`${s.tabs} ${activeTab === it.id ? s.active : ""}`}
      >
        {it.label}
        <span className={`${s.tabLine}`} />
      </Link>
    );
  });

  return (
    <div className={s.tabsWrapper}>
      {tabs}
      <div className={s.globalLine} />
    </div>
  );
};
