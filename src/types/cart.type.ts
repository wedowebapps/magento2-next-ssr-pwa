import { Amount, CommonFetchType, Thumbnail } from "@/types";

export interface CartProductType {
  id: number;
  uid: string;
  name: string;
  sku: string;
  url_key: string;
  thumbnail: Thumbnail;
  stock_status: string;
}

export interface CartConfigurableOptions {
  id: number;
  configurable_product_option_uid: string;
  option_label: string;
  configurable_product_option_value_uid: string;
  value_label: string;
}

export interface CartItemType extends CommonFetchType {
  uid: string;
  product: CartProductType;
  prices: {
    price: {
      currency: string;
      value: number;
    };
  };
  quantity: number;
  configurable_options: CartConfigurableOptions[];
}

export interface EstimatedShipping {
  amount: Amount;
  carrier_code: string;
  method_code: string;
  method_title: string;
}

export interface Discount {
  amount: Amount;
  label: string[];
}

export interface CartPricesType {
  applied_taxes: any[];
  discount: Discount | undefined;
  estimatedShipping: EstimatedShipping | undefined;
  subtotal_excluding_tax: Amount | undefined;
  subtotal_including_tax: Amount | undefined;
  subtotal_with_discount_excluding_tax: Amount | undefined;
  grand_total: Amount | undefined;
}

export interface Region extends CommonFetchType {
  code: string;
  label: string;
  region_id: number;
}

export interface Country {
  code: string;
  label: string;
}

export interface Address extends CommonFetchType {
  firstname: string;
  lastname: string;
  company: string;
  street: string[];
  city: string;
  region: Region;
  postcode: string;
  country: Country;
  telephone: string;
}

export interface ShippingAddress extends Address {}
export interface BillingAddress extends Address {}

export interface CartDetailsType extends CommonFetchType {
  id: string;
  total_quantity: number;
  applied_coupons: { code: string }[];
  items: CartItemType[];
  billing_address: BillingAddress;
  shipping_addresses: ShippingAddress[];
  selected_payment_method: {
    code: string;
  };
  email: string;
  prices: CartPricesType;
}
