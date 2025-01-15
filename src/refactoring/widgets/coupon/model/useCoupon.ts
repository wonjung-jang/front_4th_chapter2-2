import { useState } from 'react';
import { ICoupon } from '../../../app/types';

export const useCoupons = (initialCoupons: ICoupon[]) => {
  const [coupons, setCoupons] = useState<ICoupon[]>(initialCoupons);

  const addCoupon = (coupon: ICoupon) => {
    setCoupons((prev) => [...prev, coupon]);
  };

  return { coupons, addCoupon };
};
