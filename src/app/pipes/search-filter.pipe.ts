import { Pipe, PipeTransform } from '@angular/core';
import {Recipe} from "../Recipe";

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Recipe[], searchString: string): any {
    if (!value) return null;
    if (!searchString) return value;

    searchString = searchString.toLowerCase();

    return value.filter((recipe) => {
      const ingredients = [];

      for (let i=0; i<recipe.ingredients.length; i++) {
          ingredients.push(recipe.ingredients[i].name);
      }

      const searchObject = recipe.name.toLowerCase() + JSON.stringify(ingredients).toLowerCase();

      return searchObject.includes(searchString);
    })
  }

}
