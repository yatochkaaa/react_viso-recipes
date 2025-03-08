import { Meal, MealCategory } from "../types/meals";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

interface GetCategoriesResponse {
  meals: MealCategory[];
}

export interface GetMealsResponse {
  meals: Meal[];
}

interface GetMealResponse {
  meals: Meal[];
}


export async function getMealsCategories(): Promise<GetCategoriesResponse> {
  const data = await fetch(BASE_URL + "list.php?c=list");
  return data.json();
}

export async function getMeals(category: string): Promise<GetMealsResponse> {
  const data = await fetch(BASE_URL + `filter.php?c=${category}`);
  return data.json();
}

export async function getMeal(id: number): Promise<GetMealResponse> {
  const data = await fetch(BASE_URL + `lookup.php?i=${id}`);
  return data.json();
}