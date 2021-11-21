import { Project } from './../projects.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectsFilter'
})
export class ProjectsFilterPipe implements PipeTransform {

  transform(projects: Project[], ...args: unknown[]): Project[] {
    projects.sort((firstProject: Project, secondProject: Project): number => {
      const timeOfFirstProject: number = new Date(firstProject.updatedAt).getTime();
      const timeOfSecondProject: number = new Date(secondProject.updatedAt).getTime();
      return timeOfSecondProject - timeOfFirstProject
    })
    return projects;
  }

}
