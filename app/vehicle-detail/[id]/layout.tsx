import React, { Suspense } from "react";
import Loading from "./loading";

export const experimental_ppr = true;

const VehiclesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default VehiclesLayout;
