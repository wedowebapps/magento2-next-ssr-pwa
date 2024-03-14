"use client";
import { Input } from "@/components";
import { useCartContext } from "@/context";
import { FC, useEffect, useState } from "react";

export interface ApplyCouponCodeProps {}

export const ApplyCouponCode: FC<ApplyCouponCodeProps> = () => {
  const { cartDetails } = useCartContext();
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    if (cartDetails?.applied_coupons && cartDetails?.applied_coupons[0]?.code) {
      setCode(cartDetails?.applied_coupons[0]?.code);
    }
  }, [cartDetails?.applied_coupons]);

  return (
    <div className="card bg-base-200 p-4 rounded">
      <div className="flex items-end gap-2 justify-between w-full">
        <div className="w-full">
          <Input
            placeholder="EXAMPLE!@#"
            label="Coupon Code"
            name="coupon-code"
            onChange={(e: any) => setCode(e.target.value)}
            value={code}
          />
        </div>
        <div className="col-end-5">
          <button
            type="button"
            className="btn bg-primary-500 text-white hover:text-primary-500 hover:bg-white w-full"
            onClick={() => console.log(code)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
