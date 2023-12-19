import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endPoint = environment.apiUrl + "crud/";
  constructor() { }
  get(url: string) {
    return axios.get(this.endPoint + url, {
    });
  }
}
