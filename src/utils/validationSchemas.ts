import * as Yup from "yup";

export const newsletterSchema = Yup.object({
  email: Yup.string().required(),
});

export const identificationSchema = Yup.object({
  email: Yup.string().required(),
});

export const shippingAddressSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  region: Yup.string(),
  postcode: Yup.string().required(),
  country_code: Yup.string().required(),
  telephone: Yup.string().required(),
  save_in_address_book: Yup.boolean(),
});

export const billingAddressSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  region: Yup.string(),
  postcode: Yup.string().required(),
  country_code: Yup.string().required(),
  telephone: Yup.string().required(),
  save_in_address_book: Yup.boolean(),
});

export const registrationSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  is_subscribed: Yup.boolean(),
  date_of_birth: Yup.string(),
  gender: Yup.number(),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export const profileSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  date_of_birth: Yup.string(),
  gender: Yup.number(),
});

export const updateAddressSchema = Yup.object({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  street: Yup.string().required(),
  city: Yup.string().required(),
  region: Yup.object({
    region_id: Yup.string(),
  }),
  postcode: Yup.string().required(),
  country_code: Yup.string().required(),
  telephone: Yup.string().required(),
  default_shipping: Yup.boolean(),
  default_billing: Yup.boolean(),
});
