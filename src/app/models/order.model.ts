import { CardType } from "../shared/card-type.enum";
import { OrderStatus } from "../shared/order-status.enum";

export interface Order {
  _id: string;
  creator: string;
  contents: { bookId: string, quantity: number }[];
  status: OrderStatus;
  address: {
    sendTo: string;
    addrLine1: string;
    addrLine2?: string;
    city: string;
    state: string;
    zip: number;
  };
  cardType: CardType;
  last4CardDigits: number;
  subtotal: number;
  tax: number;
  totalPrice: number;
  shippingPrice: number;
  timestamp: string;
}
