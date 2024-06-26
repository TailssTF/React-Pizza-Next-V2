import { Suspense } from "react";
import { Header } from "@/components";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

const MainLayout = ({
  modal,
  children,
  session,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
  session: Session;
}) => {
  return (
    <SessionProvider session={session}>
      <div className="wrapper">
        <Header />
        <main className="content">
          <div id="modal-root" />
          {children}
          {modal}
        </main>
      </div>
    </SessionProvider>
  );
};

export default MainLayout;
