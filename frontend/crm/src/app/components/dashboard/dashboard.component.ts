import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
 users: any[] = [];
  products: any[] = [];
  orders: any[] = [];
  lastUpdated:any;
// private apiService: ApiService
  constructor() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // this.apiService.getUsers().subscribe(data => this.users = data);
    // this.apiService.getProducts().subscribe(data => this.products = data);
    // this.apiService.getOrders().subscribe(data => this.orders = data);
  }
}
