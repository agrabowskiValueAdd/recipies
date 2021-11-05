import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prepTimePipe'
})
export class PrepTimePipePipe implements PipeTransform {

  transform(value: number): string {
    const hours = value / 60;
    const roundedHours = Math.floor(hours);
    const minutes = (hours - roundedHours) * 60;
    const roundedMinutes = Math.round(minutes);

    return `${roundedHours > 0 ? roundedHours + 'h' : ''} ${roundedMinutes > 0 ? roundedMinutes + 'm' : ''}`;
  }

}
