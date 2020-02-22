import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private apiService: ApiService) { }

  addRole(role: any) {
    const url = environment.baseUrl + environment.roles;
    return this.apiService.post(role, url);
  }
  getRole() {
    const url = environment.baseUrl + environment.roles;
    return this.apiService.get(url);
  }

  deleteRole(id: number) {
    const url = environment.baseUrl + environment.roles + '/' + id;
    return this.apiService.delete(url);
  }
}
