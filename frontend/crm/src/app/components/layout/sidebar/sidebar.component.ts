import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:any;
   constructor(private _commonService: CommonService) {}
  ngOnInit(): void {

     this._commonService.user$.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }
}
