import { CommonService } from './../../shared/common.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private commomService: CommonService) { }


  get isLoading(){
    return this.commomService.isLoading
  }

}
