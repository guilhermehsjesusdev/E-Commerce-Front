import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  auth = inject(AuthService);
  router = inject(Router);

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.saveToken(res.token, res.role);
        if (res.role === 'Admin') {
          this.router.navigate(['/admin/products']);
        } else {
          this.router.navigate(['/shop']);
        }
      },
      error: () => this.error = 'Email ou senha inválidos.'
    });
  }
}