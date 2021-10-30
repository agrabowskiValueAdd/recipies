import {Ingredient} from "./Ingredient";

export interface Recipe {
  id: string,
  name: string;
  preparationTimeInMinutes: number,
  description: string,
  ingredients: Ingredient[]
}
