import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userService = inject(UserService);

  ngOnInit() {
    this.load();
  }

  load() {
    this.userService.getAll().subscribe(u => this.users = u);
  }

  promote(userId: string) {
    this.userService.promote(userId).subscribe(() => this.load());
  }

  demote(userId: string) {
    this.userService.demote(userId).subscribe(() => this.load());
  }
}