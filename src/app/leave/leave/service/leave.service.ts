import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/service/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private apiService: ApiService) { }

  addLeave(leave: any) {
    const url = environment.baseUrl + environment.leave;
    return this.apiService.post(leave, url);
  }
  editLeave(leave: any) {
    const url = environment.baseUrl + environment.leave + '/' + leave.id;
    return this.apiService.put(leave, url);
  }
  getleave() {
    const url = environment.baseUrl + environment.leave;
    return this.apiService.get(url);
  }

  deleteleave(id: number) {
    const url = environment.baseUrl + environment.leave + '/' + id;
    return this.apiService.delete(url);
  }
}
