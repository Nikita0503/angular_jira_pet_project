import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): any {
    let hours = Math.floor(value / 60);
    let minutes = value - (hours * 60);
    let time: string = "";
    time += hours + "h ";
    time += minutes + "m ";
    return time;
  }

}
