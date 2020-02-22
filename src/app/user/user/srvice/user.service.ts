import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  addUser(user: any) {
    const url = environment.baseUrl + environment.users;
    return this.apiService.post(user, url);
  }
  getUser() {
    const url = environment.baseUrl + environment.users;
    return this.apiService.get(url);
  }

  deleteUser(id: number) {
    const url = environment.baseUrl + environment.users + '/' + id;
    return this.apiService.delete(url);
  }

}
