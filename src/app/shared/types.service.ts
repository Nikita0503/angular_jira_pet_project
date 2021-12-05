import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Type {
  id: number,
  title: string,
  color: string
}

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  types: Type[];

  constructor(private httpClient: HttpClient) {
    this.types = [];
  }

  fetchTypes(){
    this.httpClient.get<any>(environment.apiUrl + `types`)
    .subscribe({
      next: (response: any) => {
        this.types = response.types;
      }
    })
  }
}
