import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  cart = inject(CartService);
  orderService = inject(OrderService);
  router = inject(Router);
  success = false;
  error = '';

  confirm() {
    const items = this.cart.items().map(i => ({
      productId: i.product.id,
      quantity: i.quantity
    }));

    this.orderService.create(items).subscribe({
      next: () => {
        this.cart.clear();
        this.success = true;
        setTimeout(() => this.router.navigate(['/shop']), 2000);
      },
      error: () => this.error = 'Erro ao criar pedido. Tente novamente.'
    });
  }
}