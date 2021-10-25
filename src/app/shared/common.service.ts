import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar){ }

  isLoading: boolean = false;

  setIsLoading(isLoading: boolean){
    this.isLoading = isLoading
  }

  showSnakeMessage(message: string, buttonText: string = "OK", duration: number = 2000){
    this.snackBar.open(message, buttonText, {duration})
  }
}
