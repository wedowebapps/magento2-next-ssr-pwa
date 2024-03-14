import ADD_SHIPPING_ADDRESS from "@/graphql/mutation/add-shipping-address.graphql";
import ADD_BILLING_ADDRESS from "@/graphql/mutation/add-billing-address.graphql";
import ADD_PRODUCT_TO_CART from "@/graphql/mutation/add-products-to-cart.graphql";
import CART_PRODUCT_REMOVE from "@/graphql/mutation/cart-product-remove.graphql";
import CART_PRODUCT_UPDATE from "@/graphql/mutation/cart-product-update.graphql";
import CREATE_CART_MUTATION from "@/graphql/mutation/create-cart.graphql";
import CREATE_CART_AFTER_SIGNIN from "@/graphql/mutation/create-cart-after-signin.graphql";
import CREATE_CUSTOMER from "@/graphql/mutation/create-customer.graphql";
import GENERATE_CUSTOMER_TOKEN from "@/graphql/mutation/generate-customer-token.graphql";
import USER_LOGOUT from "@/graphql/mutation/user-logout.graphql";
import MERGE_CART from "@/graphql/mutation/merge-carts-after-signIn.graphql";
import CREATE_PAYPAL_EXPRESS_TOKEN from "@/graphql/mutation/create-paypal-express-token.graphql";
import PLACE_ORDER from "@/graphql/mutation/place-order.graphql";
import SET_EMAIL_FOR_GUEST from "@/graphql/mutation/set-email-for-guest.graphql";
import SET_PAYMENT_METHOD from "@/graphql/mutation/set-payment-method.graphql";
import SET_TOKEN_PAYERID_ON_CART from "@/graphql/mutation/set-token-payerId-on-cart.graphql";
import SUBSCRIBE_EMAIL_TO_NEWSLETTER from "@/graphql/mutation/subscribe-email-to-newsletter.graphql";
import UPDATE_CUSTOMER_DETAILS from "@/graphql/mutation/update-customer-details.graphql";
import UPDATE_CUSTOMER_ADDRESS from "@/graphql/mutation/update-customer-address.graphql";
import ADD_PRODUCT_TO_WISHLIST from "@/graphql/mutation/add-products-to-wishlist.graphql";
import REMOVE_PRODUCT_FROM_WISHLIST from "@/graphql/mutation/remove-products-from-wishlist.graphql";
import APPLY_COUPON_TO_CART from "@/graphql/mutation/apply-coupon-to-cart.graphql";
import DELETE_CUSTOMER_ADDRESS from "@/graphql/mutation/delete-customer-address.graphql";

export const Mutations = {
  ADD_SHIPPING_ADDRESS,
  ADD_BILLING_ADDRESS,
  ADD_PRODUCT_TO_CART,
  CART_PRODUCT_REMOVE,
  CART_PRODUCT_UPDATE,
  CREATE_CART_MUTATION,
  CREATE_CART_AFTER_SIGNIN,
  CREATE_CUSTOMER,
  GENERATE_CUSTOMER_TOKEN,
  USER_LOGOUT,
  MERGE_CART,
  CREATE_PAYPAL_EXPRESS_TOKEN,
  PLACE_ORDER,
  SET_EMAIL_FOR_GUEST,
  SET_PAYMENT_METHOD,
  SET_TOKEN_PAYERID_ON_CART,
  SUBSCRIBE_EMAIL_TO_NEWSLETTER,
  UPDATE_CUSTOMER_DETAILS,
  UPDATE_CUSTOMER_ADDRESS,
  ADD_PRODUCT_TO_WISHLIST,
  REMOVE_PRODUCT_FROM_WISHLIST,
  APPLY_COUPON_TO_CART,
  DELETE_CUSTOMER_ADDRESS,
};
