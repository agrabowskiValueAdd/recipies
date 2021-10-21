import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prepTimePipe'
})
export class PrepTimePipePipe implements PipeTransform {

  transform(value: number): string {
    const hours = value / 60;
    const rHours = Math.floor(hours);
    const minutes = (hours - rHours) * 60;
    const rMinutes = Math.round(minutes);

    return `${rHours > 0 ? rHours + 'h' : ''} ${rMinutes > 0 ? rMinutes + 'm' : ''}`;
  }

}
