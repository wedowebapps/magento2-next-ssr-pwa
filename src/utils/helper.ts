import { BrowserPersistence } from ".";
import CookiePersistence from "./cookiePersistence";

export const storage = new BrowserPersistence();
export const cookiePersist = new CookiePersistence();

export const currencyFormatter = (param: {
  number: number;
  currency?: string;
}) => {
  return param?.number?.toLocaleString("en-US", {
    style: "currency",
    currency: param?.currency ?? "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export const convertObjectToQuerystring = (obj: any) => {
  return Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join("&");
};

export function convertCamelCaseToWords(camelCaseString: string) {
  return camelCaseString
    ?.replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^./, function (str) {
      return str.toUpperCase();
    });
}
