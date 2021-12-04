import { Injectable } from '@angular/core';

export interface Status {
  id: number,
  title: string,
  color: string
}

@Injectable({
  providedIn: 'root'
})
export class StatusesService {

  constructor() { }
}
