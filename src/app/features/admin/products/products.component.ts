import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  productService = inject(ProductService);
  categoryService = inject(CategoryService);

  showForm = false;
  name = '';
  description = '';
  price = 0;
  stock = 0;
  categoryId = '';
  imageUrl = '';
  error = '';
  success = '';

  ngOnInit() {
    this.load();
    this.categoryService.getAll().subscribe(c => this.categories = c);
  }

  load() {
    this.productService.getAll().subscribe(p => this.products = p);
  }

  save() {
    this.productService.create({
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
      categoryId: this.categoryId,
      imageUrl: this.imageUrl || undefined
    }).subscribe({
      next: () => {
        this.load();
        this.showForm = false;
        this.reset();
        this.success = 'Produto criado com sucesso!';
        setTimeout(() => this.success = '', 3000);
      },
      error: () => this.error = 'Erro ao salvar produto.'
    });
  }

  delete(id: string) {
    if (confirm('Deseja excluir este produto?'))
      this.productService.delete(id).subscribe(() => this.load());
  }

  reset() {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.stock = 0;
    this.categoryId = '';
    this.imageUrl = '';
    this.error = '';
  }
}