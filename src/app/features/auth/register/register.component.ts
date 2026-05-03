import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';
  success = '';

  auth = inject(AuthService);
  router = inject(Router);

  register() {
    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.success = 'Conta criada com sucesso!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => this.error = 'Erro ao criar conta. Verifique os dados.'
    });
  }
}