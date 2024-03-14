"use client";
import {
  Accordion,
  LoadingDots,
  NotFound,
  OrderHistoryDetails,
  OrderTitlePanel,
  Pagination,
  Typography,
} from "@/components";
import { FetchOrderHistory } from "@/types";
import { Queries } from "@/utils/graphql";
import { useLazyQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface OrderHistoryContainerProps {}

export const OrderHistoryContainer: FC<OrderHistoryContainerProps> = () => {
  const { GET_ORDER_HISTORY } = Queries;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [
    getOrderHistory,
    { loading: orderHistoryLoading, data: orderHistoryData },
  ] = useLazyQuery<FetchOrderHistory>(GET_ORDER_HISTORY, {
    fetchPolicy: "no-cache",
  });

  const customer = orderHistoryData?.customer;

  const handlePagination = (page: number) => {
    if (page) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await getOrderHistory({
          variables: {
            pageSize: 5,
            currentPage,
          },
        });
      } catch (error) {
        toast.error("Something went wrong!");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white w-full flex-1 px-4 py-4">
        <Typography variant="h5">Order History</Typography>
      </div>
      <div className="bg-white w-full flex-1 px-8 py-8">
        <div className={orderHistoryLoading ? "block" : "hidden"}>
          <LoadingDots />
        </div>
        <div
          className={
            orderHistoryLoading || customer?.orders?.items?.length
              ? "hidden"
              : "flex justify-center items-center h-full"
          }
        >
          <NotFound />
        </div>
        <div
          className={!orderHistoryLoading ? "flex flex-col gap-4" : "hidden"}
        >
          {customer?.orders?.items?.map((order, index) => (
            <Accordion
              title={
                <OrderTitlePanel
                  order={order}
                  receiverName={`${customer?.firstname} ${customer?.lastname}`}
                />
              }
              name={"orders"}
              key={index}
            >
              <div className="bg-white rounded-2xl p-4">
                <OrderHistoryDetails order={order} />
              </div>
            </Accordion>
          ))}
          {customer && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                perPage={customer?.orders?.page_info?.page_size || 1}
                totalPage={customer?.orders?.page_info?.total_pages ?? 10}
                handlePagination={handlePagination}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
