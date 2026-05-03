import { Product } from './product.model';


export interface OrderItem {
  productId: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  status: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}