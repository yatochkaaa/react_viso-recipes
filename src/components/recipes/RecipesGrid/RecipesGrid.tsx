import { Meal } from "../../../types/meals";
import "./recipes-grid.css";

interface Props {
  recipes: Meal[];
}

export default function MealsGrid({ recipes }: Props) {
  return (
    <ul className="recipes">
      {recipes.map((recipe) => (
        <li key={recipe.idMeal}>
          {recipe.strMeal}
          {/* <RecipeItem {...recipe} /> */}
        </li>
      ))}
    </ul>
  );
}
