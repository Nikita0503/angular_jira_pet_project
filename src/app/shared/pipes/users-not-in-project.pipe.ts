import { User } from './../user.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersNotInProject'
})
export class UsersNotInProjectPipe implements PipeTransform {

  transform(allUsers: User[], usersInProject: User[]): User[] {
    const usersNotInProject = [];
    for(let i = 0; i < allUsers.length; i++){
      let inProject = false;
      for(let j = 0; j < usersInProject.length; j++){
        if(allUsers[i].id === usersInProject[j].id){
          inProject = true;
        }
      }
      if(!inProject){
        usersNotInProject.push(allUsers[i]);
      }
    }
    return usersNotInProject;
  }

}
