import { Pipe, PipeTransform } from '@angular/core';
import {Recipe} from "../Recipe";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Recipe[], args: string): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter((recipe) => {
      return recipe.name.toLowerCase().includes(args);
    })
  }

}
