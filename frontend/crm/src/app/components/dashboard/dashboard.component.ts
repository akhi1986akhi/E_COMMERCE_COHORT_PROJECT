import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  products: any[] = [];
  orders: any[] = [];
  lastUpdated: any;
  // private apiService: ApiService
  constructor(private _user: UserService, private _commonService:CommonService) {
    this.loadDashboardData();
  }

  ngOnInit(): void {
    this.getData();

  }
  loadDashboardData() {
    // this.apiService.getUsers().subscribe(data => this.users = data);
    // this.apiService.getProducts().subscribe(data => this.products = data);
    // this.apiService.getOrders().subscribe(data => this.orders = data);
  }

  getData() {
    this._user.userData().subscribe((res: any) => {
      console.log(res)
      this.user = res.data;

      this._commonService.setUser(this.user);
    })
  }
}
