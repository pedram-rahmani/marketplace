interface DiscountResult {
  finalPrice: string;
  isFree: boolean;
}

export default function useDiscount(price: number, discount: number): DiscountResult {
  if (!price) return { finalPrice: "۰", isFree: false };

  const finalDiscount = discount ?? 0;

  if (finalDiscount === 100) {
    return {
      finalPrice: "رایگان!",
      isFree: true
    };
  }

  const result = price - price * (finalDiscount / 100);

  return {
    finalPrice: Math.floor(result).toLocaleString("fa-IR"),
    isFree: false
  };
}