export interface CartItemType {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  [key: string]: any;
}

export interface CartItemProps extends CartItemType {
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export interface CartSummaryProps {
  totalPrice: number;
  totalDiscount?: number;
  onCheckout: () => void;
  [key: string]: any;
}