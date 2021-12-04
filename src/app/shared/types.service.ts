import { Injectable } from '@angular/core';

export interface Type {
  id: number,
  title: string,
  color: string
}

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor() { }
}
