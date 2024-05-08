"use client";
import { Suspense } from "react";
import { Header } from "@/components";

import { StoreContext } from "../../Store-context";
import Store from "@/stores/Store";
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
      <StoreContext.Provider value={new Store()}>
        <div className="wrapper">
          <Header />
          <main className="content">
            <Suspense fallback={<div>Идет загрузка...</div>}>
              <div id="modal-root" />
              {children}
              {modal}
            </Suspense>
          </main>
        </div>
      </StoreContext.Provider>
    </SessionProvider>
  );
};

export default MainLayout;
