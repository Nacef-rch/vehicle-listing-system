import React from "react";
import { cn } from "@/lib/utils";

export enum ColorSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

const SIZES: Record<ColorSize, string> = {
  [ColorSize.Small]: "16px",
  [ColorSize.Medium]: "20px",
  [ColorSize.Large]: "24px",
};

export type ColorLabelProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string;
  color: string;
  size?: ColorSize;
};

const ColorLabel: React.FC<ColorLabelProps> = ({
  color,
  className = "",
  size = ColorSize.Small,
  ...props
}) => {
  if (!color) return null;

  return (
    <span
      aria-hidden="true"
      className={cn(
        `rounded-full border border-black/30 opacity-70`,
        className
      )}
      style={{
        backgroundColor: color.toLowerCase(),
        width: SIZES[size],
        height: SIZES[size],
      }}
      {...props}
    />
  );
};

ColorLabel.displayName = "ColorLabel";

export default ColorLabel;
