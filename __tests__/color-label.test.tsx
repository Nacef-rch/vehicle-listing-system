import React from "react";
import { render, screen } from "@testing-library/react";
import ColorLabel, { ColorSize } from "@/components/color-label";

describe("ColorLabel", () => {
  it("should not render anything if no color is provided", () => {
    render(<ColorLabel color="" data-testid="color-label" />);
    expect(screen.queryByTestId("color-label")).not.toBeInTheDocument();
  });

  it("should render with the default size (small) when size is not provided", () => {
    render(<ColorLabel color="red" data-testid="color-label" />);
    const spanElement = screen.getByTestId("color-label");
    expect(spanElement).toBeInTheDocument();

    // For ColorSize.Small, we expect width and height of "16px"
    expect(spanElement).toHaveStyle({
      width: "16px",
      height: "16px",
      backgroundColor: "red",
    });
  });

  it("should render with the provided size and corresponding styles", () => {
    render(
      <ColorLabel
        color="blue"
        size={ColorSize.Large}
        data-testid="color-label"
      />
    );
    const spanElement = screen.getByTestId("color-label");
    expect(spanElement).toBeInTheDocument();

    // For ColorSize.Large, we expect width and height of "24px"
    expect(spanElement).toHaveStyle({
      width: "24px",
      height: "24px",
      backgroundColor: "blue",
    });
  });

  it("should apply the custom className if provided", () => {
    render(
      <ColorLabel
        color="green"
        className="custom-class"
        data-testid="color-label"
      />
    );
    const spanElement = screen.getByTestId("color-label");
    expect(spanElement).toHaveClass("custom-class");
  });
});
