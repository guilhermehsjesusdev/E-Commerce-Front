import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';

const STATUS_LABELS: Record<number, string> = {
  0: 'Pendente', 1: 'Confirmado', 2: 'Enviado', 3: 'Entregue', 4: 'Cancelado'
};

const STATUS_COLORS: Record<number, string> = {
  0: 'bg-yellow-100 text-yellow-700',
  1: 'bg-blue-100 text-blue-700',
  2: 'bg-purple-100 text-purple-700',
  3: 'bg-green-100 text-green-700',
  4: 'bg-red-100 text-red-700'
};

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  orderService = inject(OrderService);
  statusLabels = STATUS_LABELS;
  statusColors = STATUS_COLORS;

  ngOnInit() {
    this.orderService.getMyOrders().subscribe(o => this.orders = o);
  }

  updateStatus(id: string, status: number) {
    this.orderService.updateStatus(id, status).subscribe(() =>
      this.orderService.getMyOrders().subscribe(o => this.orders = o)
    );
  }
}