import { Typography } from "@/components";
import { OrderHistoryItem } from "@/types";
import { currencyFormatter } from "@/utils/helper";
import { FC } from "react";
import Moment from "moment";

export interface OrderTitlePanelProps {
  order: OrderHistoryItem;
  receiverName: string;
}

export const OrderTitlePanel: FC<OrderTitlePanelProps> = ({
  order,
  receiverName,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center">
      <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Order #</span>
        <Typography variant="h5">{order?.order_number}</Typography>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Order Date</span>
        <Typography variant="h5">
          {Moment(order?.order_date).format("ll")}
        </Typography>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Ship To</span>
        <Typography variant="h5">{receiverName}</Typography>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-light text-sm">Order Total</span>
        <Typography variant="h5">
          {currencyFormatter({
            number: order?.total?.grand_total?.value ?? 0,
            currency: order?.total?.grand_total?.currency,
          })}
        </Typography>
      </div>
      <span className="badge">{order?.status ?? "test"}</span>
    </div>
  );
};
