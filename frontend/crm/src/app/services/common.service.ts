import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private userSource = new BehaviorSubject<any>(null); // holds latest user data
  user$ = this.userSource.asObservable();             // observable for subscribers

  setUser(user: any) {
    this.userSource.next(user);
  }
}
