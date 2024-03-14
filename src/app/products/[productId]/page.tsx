"use client";
import { ProductDetailsContainer } from "@/container";
import { Queries } from "@/utils/graphql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const param = useParams();
  const { PRODUCT_DETAILS } = Queries;

  const { data: productDetails } = useSuspenseQuery<any>(PRODUCT_DETAILS, {
    variables: {
      url_key: param?.productId,
    },
  });

  return (
    <ProductDetailsContainer
      ssrData={{ productDetails: productDetails.products }}
    />
  );
}
