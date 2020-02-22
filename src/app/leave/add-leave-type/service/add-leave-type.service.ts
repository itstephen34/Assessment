import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/shared/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AddLeaveTypeService {

  constructor(private apiService: ApiService) { }

  addLeaveType(leaveType: any) {
    const url = environment.baseUrl + environment.leaveType;
    return this.apiService.post(leaveType, url);
  }
  getLeaveType() {
    const url = environment.baseUrl + environment.leaveType;
    return this.apiService.get(url);
  }

  deleteLeaveType(id: number) {
    const url = environment.baseUrl + environment.leaveType + '/' + id;
    return this.apiService.delete(url);
  }
}
