import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<CartItem[]>([]);

  total = computed(() =>
    this.items().reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  );

  count = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );

  add(product: Product, quantity = 1) {
    const current = this.items();
    const existing = current.find(i => i.product.id === product.id);
    if (existing) {
      this.items.set(current.map(i =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + quantity }
          : i
      ));
    } else {
      this.items.set([...current, { product, quantity }]);
    }
  }

  remove(productId: string) {
    this.items.set(this.items().filter(i => i.product.id !== productId));
  }

  clear() {
    this.items.set([]);
  }
}