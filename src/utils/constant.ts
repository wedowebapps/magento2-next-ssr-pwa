export const accountMenuList: { menu: string; path: string }[] = [
  { menu: "Profile", path: "account-information" },
  { menu: "Address book", path: "address-book" },
  { menu: "Order History", path: "order-history" },
];

export const localStorageKeys = {
  AUTH_TOKEN: "auth_token",
  CART_ID: "cartId",
};

export const cookieStorageKey = {
  AUTH_TOKEN: "auth_token",
  IS_PLACE_ORDER: "order-placed",
};
