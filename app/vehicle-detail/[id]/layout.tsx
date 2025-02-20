import React, { Suspense } from "react";
import Loading from "./loading";

const VehiclesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default VehiclesLayout;
