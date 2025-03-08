import { Link } from "react-router";
import { CiHeart } from "react-icons/ci";
import { Meal } from "../../../types/meals";
import "./recipes-item.css";
import { useWishlist } from "../../../composables/useWishlist";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";

interface Props {
  recipe: Meal;
}

export default function MealItem({ recipe }: Props) {
  const { addToWishlist, isAddedToWishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (isAddedToWishlist(recipe.idMeal)) {
      setIsInWishlist(true);
    }
  }, []);

  function handleWishlistClick() {
    addToWishlist(recipe);
    if (isAddedToWishlist(recipe.idMeal)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }

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
          {isInWishlist ? (
            <FaHeart size={36} onClick={handleWishlistClick} />
          ) : (
            <CiHeart size={36} onClick={handleWishlistClick} />
          )}

          <Link to={recipe.idMeal}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
