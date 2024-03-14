"use client";
import { FC } from "react";
import { Form, Input } from "@/components";
import { useMutation } from "@apollo/client";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import { newsletterSchema } from "@/utils";
import { Mutations } from "@/utils/graphql";

export interface NewsletterProps {}

export interface NewsletterValue {
  email: string;
}

export const Newsletter: FC<NewsletterProps> = () => {
  const { SUBSCRIBE_EMAIL_TO_NEWSLETTER } = Mutations;

  const [subscribeEmailToNewsletter] = useMutation(
    SUBSCRIBE_EMAIL_TO_NEWSLETTER,
  );
  const handleSubmit = async (
    value: NewsletterValue,
    methods: UseFormReturn<NewsletterValue, any, NewsletterValue>,
  ) => {
    try {
      const response = await subscribeEmailToNewsletter({ variables: value });
      if (response) {
        toast.success("Subscribe successfully.");
        methods.reset();
      }
    } catch (error: any) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <Form<NewsletterValue>
      className=""
      onSubmit={handleSubmit}
      schema={newsletterSchema}
    >
      <header className="footer-title text-white">Newsletter</header>
      <fieldset className="form-control w-80">
        <label className="label">
          <span className="label-text text-white">
            Enter your email address
          </span>
        </label>
        <div className="join">
          <Input
            name="email"
            type="text"
            placeholder="username@site.com"
            className="join-item"
          />
          <button className="btn bg-primary-500 text-white hover:bg-gray-800  join-item">
            Subscribe
          </button>
        </div>
      </fieldset>
    </Form>
  );
};
