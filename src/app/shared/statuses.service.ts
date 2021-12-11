import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Status {
  id: number,
  title: string,
  color: string
}

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  statuses: Status[];

  constructor(private httpClient: HttpClient) {
    this.statuses = [];
  }

  fetchStatuses(){
    this.httpClient.get<any>(environment.apiUrl + `statuses`)
    .subscribe({
      next: (response: any) => {
        this.statuses = response.statuses;
      }
    })
  }

  getStatusByTitle(title: string): Status | undefined{
    return this.statuses.find((status: Status) => status.title === title)
  }
}
