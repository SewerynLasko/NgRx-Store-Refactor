import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Topping } from '../models/topping.model';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http.get<Topping[]>(`/api/toppings`).pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
