import React from "react";
import { InfoIcon } from "lucide-react";
import { Button } from "./button";

type AlertDialogProps = {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
};

const AlertDialog = ({
  title,
  description,
  buttonText,
  onClick,
}: AlertDialogProps) => {
  return (
    <div
      className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <div className="flex items-center">
        <InfoIcon className="me-2 h-4 w-4 shrink-0" />
        <span className="sr-only">{title}</span>
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className="mb-4 mt-2 text-sm">{description}</div>
      {!!onClick && (
        <Button variant={"destructive"} onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default AlertDialog;
