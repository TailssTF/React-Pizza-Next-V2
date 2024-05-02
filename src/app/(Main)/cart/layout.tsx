import { Suspense } from "react";
import Loading from "./loading";

const PizzaLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default PizzaLayout;
