import { UserService } from './../../shared/user.service';
import { AuthService } from './../../shared/auth.service';
import { CommonService } from './../../shared/common.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private commomService: CommonService,
    private authService: AuthService,
    private userService: UserService) { }

  get isLoading(){
    return this.commomService.isLoading
  }

  get isAuthorized(){
    return !!this.authService.token && !!this.userService.user
  }

  get username(){
    return this.userService.user?.name
  }

  get avatar(){
    return environment.baseUrl + this.userService.user?.avatar
  }
}
