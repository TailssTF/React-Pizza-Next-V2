"use client";
import { Suspense } from "react";
import { Header } from "@/components";

import { StoreContext } from "../../Store-context";
import Store from "@/stores/Store";

const MainLayout = ({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
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
  );
};

export default MainLayout;
