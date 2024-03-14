import { CommonFetchType, PageInfo } from ".";

export interface FinalPrice {
  currency: string;
  value: number;
}

export interface MaximumPrice {
  final_price: FinalPrice;
}
export interface MinimumPrice {
  final_price: FinalPrice;
}

export interface PriceRange {
  maximum_price: MaximumPrice;
  minimum_price: MinimumPrice;
}

export interface SmallImage {
  url: string;
  label: string;
}
export interface Thumbnail {
  url: string;
  label: string;
}

export interface ConfigurableOptionsValue {
  value_index: number;
  uid: string;
  label: string;
  swatch_data: {
    value: string;
  };
}

export interface ConfigurableOptions {
  id: number;
  uid: string;
  attribute_id: string;
  label: string;
  position: number;
  use_default: boolean;
  default_option_value: string;
  attribute_code: string;
  values: ConfigurableOptionsValue[];
  product_id: number;
}

export interface Attributes {
  uid: string;
  label: string;
  code: string;
  value_index: number;
}
export interface ProductVariants {
  product: Product;
  attributes: Attributes[];
}

export interface MediaGalleryEntries {
  uid: string;
  label: string;
  position: number;
  disabled: boolean;
  file: string;
  media_type: string;
  video_content: any;
}

export interface Product {
  uid: string;
  name: string;
  sku: string;
  url_key: string;
  meta_description?: string;
  meta_keyword?: string;
  meta_title?: string;
  color?: any;
  stock_status?: string;
  rating_summary?: number;
  small_image: SmallImage;
  thumbnail?: Thumbnail;
  price_range: PriceRange;
  media_gallery_entries?: MediaGalleryEntries[];
  related_products?: Product[];
  configurable_options?: ConfigurableOptions[];
  variants?: ProductVariants[];
  id: number;
}

export interface FilterOption extends CommonFetchType {
  label: string;
  value: string;
}

export interface Filter extends CommonFetchType {
  label: string;
  count: number;
  attribute_code: string;
  options: FilterOption[];
  position: number | null;
}

export interface ProductSidebarFilter extends CommonFetchType {
  aggregations: Filter[];
}

export interface ProductList extends CommonFetchType {
  items: Product[];
  page_info: PageInfo;
  total_count: number;
}

export interface ProductDetailsType extends CommonFetchType {
  items: Product[];
}

export interface ProductTopSearch {
  code: string;
  items: Product[];
  total_count: number;
}

export interface WishlistItemV2 {
  id: string;
  description: string;
  product: Product;
}

export interface WishlistV2 {
  id: string;
  items_count: number;
  items_v2: {
    items: WishlistItemV2[];
    page_info: PageInfo;
  };
}

export interface WishlistCustomer {
  wishlist_v2: WishlistV2;
}

export interface FetchWishlist {
  customer: WishlistCustomer;
}
