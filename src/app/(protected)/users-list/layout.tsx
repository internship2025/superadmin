import { Header } from "@/shared/ui/header/Header";
import { Sidebar } from "@/shared/ui/sidebar/Sidebar";

const UsersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );
};

export default UsersLayout;
