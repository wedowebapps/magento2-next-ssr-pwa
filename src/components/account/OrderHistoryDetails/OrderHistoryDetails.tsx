import { OrderHistoryItem, OrderItemPricing, OrderProduct } from "@/types";
import { currencyFormatter } from "@/utils/helper";
import Image from "next/image";

import { FC } from "react";

export interface OrderHistoryDetailsProps {
  order: OrderHistoryItem;
}

export interface OrderedProductDetailsProps {
  product: OrderProduct;
}

export interface OrderedPricingProps {
  pricing: OrderItemPricing;
}

interface CheckoutInfoProps {
  title: string;
  data?: string;
}

const OrderedPricing: FC<OrderedPricingProps> = ({ pricing }) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <span>Subtotal</span>
      <span>
        {currencyFormatter({
          currency: pricing?.subtotal?.currency,
          number: pricing?.subtotal?.value ?? 0,
        })}
      </span>
      <span>Tax</span>
      <span>
        {currencyFormatter({
          currency: pricing?.total_tax?.currency,
          number: pricing?.total_tax?.value ?? 0,
        })}
      </span>
      <span>Shipping & Handling</span>
      <span>
        {currencyFormatter({
          currency: pricing?.total_shipping?.currency,
          number: pricing?.total_shipping?.value ?? 0,
        })}
      </span>
      <span className="font-semibold">Total</span>
      <span className="font-semibold">
        {currencyFormatter({
          currency: pricing?.grand_total?.currency,
          number: pricing?.grand_total?.value ?? 0,
        })}
      </span>
    </div>
  );
};

const OrderedProductDetails: FC<OrderedProductDetailsProps> = ({ product }) => {
  return (
    <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-4">
      <Image
        src={product?.product_thumbnail ?? ""}
        alt="product-image"
        width={1000}
        height={1000}
        className="h-24 w-24"
      />
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{product?.product_name}</span>
        <span className="font-semibold">Order details:</span>
        <span>Qty: {product?.quantity_ordered}</span>
        <span>
          {currencyFormatter({
            number: product?.product_sale_price?.value,
            currency: product?.product_sale_price?.currency,
          })}
        </span>
      </div>
    </div>
  );
};

const CheckoutInfo: FC<CheckoutInfoProps> = ({ data, title }) => {
  const renderArr = data?.split(",");
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xl font-medium">{title}</span>
      {renderArr?.map((text, index) => <span key={index}>{text}</span>)}
    </div>
  );
};

export const OrderHistoryDetails: FC<OrderHistoryDetailsProps> = ({
  order,
}) => {
  const shippingAddressData = `${order?.shipping_address?.firstname} ${order?.shipping_address?.lastname}, ${order?.shipping_address?.street[0]}, ${order?.shipping_address?.telephone}, ${order?.shipping_address?.city} ${order?.shipping_address?.region} ${order?.shipping_address?.postcode} ${order?.shipping_address?.country_code}.`;
  const billingAddressData = `${order?.billing_address?.firstname} ${order?.billing_address?.lastname}, ${order?.billing_address?.street[0]}, ${order?.billing_address?.telephone}, ${order?.billing_address?.city} ${order?.billing_address?.region} ${order?.billing_address?.postcode} ${order?.billing_address?.country_code}.`;

  return (
    <div className="flex flex-col gap-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 ">
        <CheckoutInfo title="Shipping Information" data={shippingAddressData} />
        <CheckoutInfo title="Shipping Method" data={order?.shipping_method} />
        <CheckoutInfo title="Billing Information" data={billingAddressData} />
        <CheckoutInfo
          title="Payment Method"
          data={order?.payment_methods[0]?.name}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-8">
        <div className="flex flex-col gap-4 col-span-3">
          <span className="text-xl font-medium">Product</span>
          {order?.items?.map((product, index) => (
            <OrderedProductDetails key={index} product={product} />
          ))}
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <span className="font-medium">Grand Total</span>
          <OrderedPricing pricing={order?.total} />
        </div>
      </div>
    </div>
  );
};
