import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isLoading: boolean = false;

  setIsLoading(isLoading: boolean){
    this.isLoading = isLoading
  }
}
