import { CommonFetchType } from "@/types";

export interface CountryListItem extends CommonFetchType {
  id: string;
  full_name_english: string;
  two_letter_abbreviation: string;
}

export interface RegionListItem extends CommonFetchType {
  id: number;
  code: string;
  name: string;
}

export interface FetchRegions extends CommonFetchType {
  id: string;
  available_regions: RegionListItem[];
}

export interface AvailablePaymentMethod {
  code: string;
  title: string;
}

export interface FetchPaymentMethods {
  id: string;
  available_payment_methods: AvailablePaymentMethod[];
  selected_payment_method: AvailablePaymentMethod;
}
