import { Link } from "react-router";
import { Meal } from "../../../types/meals";
import "./recipes-item.css";

interface Props {
  recipe: Meal;
}

export default function MealItem({ recipe }: Props) {
  return (
    <article className="recipe-item">
      <header>
        <div className="image">
          <img src={recipe.strMealThumb} alt="" />
        </div>
        <div className="headerText">
          <h2>{recipe.strMeal}</h2>
          <p>id {recipe.idMeal}</p>
        </div>
      </header>
      <div className="content">
        <div className="actions">
          <Link to={recipe.idMeal}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
