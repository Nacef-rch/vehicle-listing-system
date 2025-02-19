import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/button";

describe("Button", () => {
  it("renders with default styles and custom class names", () => {
    render(<Button className="test-class">Default Button</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("test-class");
    // Verify default variant styling (e.g., "bg-primary")
    expect(button.className).toMatch(/bg-primary/);
  });

  it("renders as a child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("handles click events", async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Clickable Button</Button>);
    const button = screen.getByRole("button");

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
