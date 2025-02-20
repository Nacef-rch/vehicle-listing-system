import { MetadataRoute } from "next";
import { BASE_URL } from "@/constants";
import vehiclesData from "@/mocks/vehicles.json";

const ROUTES = ["/vehicles"];

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const collectionsPromise = vehiclesData.data
    .map((vehicle) => vehicle.id)
    .map((id) => ({
      url: `${BASE_URL}/vehicle-detail/${id}`,
      lastModified: new Date().toISOString(),
    }));

  return [...routesMap, ...collectionsPromise];
}
