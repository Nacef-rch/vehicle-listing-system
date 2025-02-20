import ColorLabel, { ColorSize } from "@/components/color-label";
import {
  RouteIcon,
  SmartphoneChargingIcon,
  UnplugIcon,
  UserIcon,
} from "lucide-react";

type CardDescriptionProps = {
  title: string;
  color: string;
  price: number;
  seats: number;
  batteryCapacity: number;
  chargingSpeed: number;
  range: number;
};

const CardDescription = ({
  title,
  price,
  color,
  seats,
  batteryCapacity,
  chargingSpeed,
  range,
}: CardDescriptionProps) => {
  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2">
        <h2 className="text-lg">{title}</h2>
        <p className="mt-2 text-lg font-medium text-gray-900">{price} £</p>
      </div>
      <div className="mt-1 flex items-center gap-1">
        <IconContainer text={range + "Klm"}>
          <RouteIcon className="h-4 w-4" />
        </IconContainer>
        <IconContainer text={batteryCapacity + "Kwh"}>
          <SmartphoneChargingIcon className="h-4 w-4" />
        </IconContainer>
        <IconContainer text={chargingSpeed + "KW"}>
          <UnplugIcon className="h-4 w-4" />
        </IconContainer>
        <div className="ml-auto flex items-center gap-1">
          <IconContainer text={seats}>
            <UserIcon className="h-4 w-4" />
          </IconContainer>
          <ColorLabel color={color} size={ColorSize.Small} />
        </div>
      </div>
    </>
  );
};

const IconContainer = ({
  text,
  children,
}: {
  text: string | number;
  children: React.ReactNode;
}) => (
  <>
    {children}
    <span className="text-sm">{text}</span>
  </>
);

export default CardDescription;
