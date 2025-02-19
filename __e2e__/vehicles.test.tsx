import { BASE_URL } from "@/constants";
import { test, expect } from "@playwright/test";

test.describe("Vehicles Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/vehicles`, { waitUntil: "load" });
  });

  test("displays the correct page title", async ({ page }) => {
    await expect(page).toHaveTitle(/EV Vehicles/);
  });

  test("updates the URL with the search query when a vehicle is searched", async ({
    page,
  }) => {
    const searchTerm = "Tesla";
    const searchInput = page.getByRole("textbox");

    await searchInput.fill(searchTerm);
    await searchInput.press("Enter");
    await expect(page).toHaveURL(`${BASE_URL}/vehicles?search=${searchTerm}`);
  });
});

test.describe("Vehicle Description Page", () => {
  test("navigates to the vehicle detail page when a vehicle is clicked", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/vehicles`, { waitUntil: "load" });

    const vehicleName = "Renault Zoe";
    const vehicleElement = page.getByText(vehicleName);

    await expect(vehicleElement).toBeVisible();
    await vehicleElement.click();

    // Wait for the URL to match the vehicle detail page pattern.
    await page.waitForURL(new RegExp(`${BASE_URL}/vehicle-detail/.*`));
  });
});
