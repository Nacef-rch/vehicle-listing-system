import { VehicleSkeletonCard } from "./_components/vehicle-card/card-skeleton";

export default function Loading() {
  return (
    <div className="lg:col-span-3">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-2 sm:py-0 lg:max-w-7xl lg:px-1">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
          {Array(12)
            .fill(0)
            .map((_, index) => {
              return <VehicleSkeletonCard key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}
