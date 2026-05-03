import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../core/services/category.service';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  categoryService = inject(CategoryService);
  name = '';
  error = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.categoryService.getAll().subscribe(c => this.categories = c);
  }

  save() {
    if (!this.name) return;
    this.categoryService.create(this.name).subscribe({
      next: () => { this.load(); this.name = ''; },
      error: () => this.error = 'Erro ao salvar categoria.'
    });
  }
}