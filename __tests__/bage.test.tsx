import React from "react";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/badge";

describe("Badge", () => {
  it("renders with default variant classes", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText("Default Badge");
    expect(badge).toBeInTheDocument();
    // Check that the default variant contains the expected class (e.g., bg-primary)
    expect(badge.className).toMatch(/bg-primary/);
  });

  it("applies a custom className when provided", () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    const badge = screen.getByText("Custom Badge");
    expect(badge).toHaveClass("custom-class");
  });

  it("renders with the destructive variant classes", () => {
    render(<Badge variant="destructive">Destructive Badge</Badge>);
    const badge = screen.getByText("Destructive Badge");
    // Check that the destructive variant contains the expected class (e.g., bg-destructive)
    expect(badge.className).toMatch(/bg-destructive/);
  });
});
