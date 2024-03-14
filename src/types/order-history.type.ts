import { Amount, Discount, PageInfo } from "@/types";

export interface OrderSelectedOption {
  label: string;
  value: string;
}

export interface OrderItemPricing {
  discounts: Discount[];
  grand_total: Amount;
  subtotal: Amount;
  total_shipping: Amount;
  total_tax: Amount;
}

export interface OrderAddress {
  city: string;
  country_code: string;
  firstname: string;
  lastname: string;
  postcode: string;
  region: string;
  street: string[];
  telephone: string;
  region_id: string;
}

export interface OrderBillingAddress extends OrderAddress {}
export interface OrderShippingAddress extends OrderAddress {}

export interface OrderProduct {
  id: string;
  product_name: string;
  product_thumbnail: string;
  product_sale_price: Amount;
  product_sku: string;
  product_url_key: string;
  selected_options: OrderSelectedOption[];
  quantity_ordered: number;
}

export interface PaymentAdditionalData {
  name: string;
  value: string;
}

export interface OrderPaymentMethod {
  name: string;
  type: string;
  additional_data: PaymentAdditionalData[];
}

export interface OrderHistoryItem {
  id: string;
  order_number: string;
  order_date: string;
  status: string;
  billing_address: OrderBillingAddress;
  shipping_address: OrderShippingAddress;
  items: OrderProduct[];
  shipping_method: string;
  payment_methods: OrderPaymentMethod[];
  total: OrderItemPricing;
}

export interface OrderHistory {
  firstname: string;
  lastname: string;
  orders: {
    items: OrderHistoryItem[];
    page_info: PageInfo;
    total_count: number;
  };
}

export interface FetchOrderHistory {
  customer: OrderHistory;
}
