import React, { Suspense } from "react";
import { Metadata } from "next";
//layouts
import Header from "./_layout/header";
import SideBar from "./_layout/side-bar";
import Loading from "./loading";

const PAGE_TITLE = "EV Vehicles";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: "List of EV Vehicles",
};

const VehiclesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header title={PAGE_TITLE} />
      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <SideBar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </section>
    </>
  );
};

export default VehiclesLayout;
