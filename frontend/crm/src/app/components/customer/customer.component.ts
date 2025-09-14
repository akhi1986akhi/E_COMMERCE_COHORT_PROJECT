import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  totalDocs!:Number;
  customers!:any[];
  constructor(private _user: UserService,) { }
  ngOnInit(): void {

    this.fetchUsersList();
  }

  fetchUsersList() {
    const page = 1; // Set your desired page number
    const limit = 10; // Set your desired limit per page

    this._user.getUsers(page, limit).subscribe({
      next: (resp) => {
        console.log(resp)
        this.totalDocs=resp.totalDocs;
        this.customers=resp.docs;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
