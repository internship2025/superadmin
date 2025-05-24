import { useAppSelector } from "@/services/store";
import { Sidebar } from "@/shared/ui/sidebar/Sidebar";
import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const authId = useAppSelector((state) => state.auth.userId);
  const pathName = usePathname();

  const showSidebar = authId && pathName !== "/";
  return showSidebar ? <Sidebar /> : null;
};
