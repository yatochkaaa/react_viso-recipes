import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMeal } from "../../api/meals";
import "./recipe-details-page.css";
import { useWishlist } from "../../composables/useWishlist";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

function RecipePage() {
  let { id } = useParams();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addToWishlist, isAddedToWishlist } = useWishlist();

  const mealQuery = useQuery({
    queryKey: ["meal", id],
    queryFn: () => getMeal(+id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (mealQuery.data && isAddedToWishlist(mealQuery.data.meals[0].idMeal)) {
      setIsInWishlist(true);
    }
  }, [mealQuery.data]);

  if (mealQuery.isLoading) {
    return <div>Loading recipe ...</div>;
  }

  if (mealQuery.isError) {
    return <div>Error: {mealQuery.error?.message}</div>;
  }

  const meal = mealQuery.data?.meals[0];

  function handleWishlistClick() {
    if (!meal) return;
    addToWishlist(meal);
    if (isAddedToWishlist(meal.idMeal)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }

  if (!meal) {
    return <div>No meal found</div>;
  }

  return (
    <div className="recipe-details">
      <header className="header">
        <div className="image">
          <img src={meal.strMealThumb} alt="Meal Photo" />
        </div>
        <div className="headerText">
          <h1>{meal.strMeal}</h1>
          <p className="creator">
            from <span>{meal.strArea}</span>
          </p>

          {meal.strTags && (
            <ul className="tags">
              {meal.strTags.split(",").map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}

          <div className="wishlist">
            {isInWishlist ? (
              <FaHeart color="white" size={36} onClick={handleWishlistClick} />
            ) : (
              <CiHeart color="white" size={36} onClick={handleWishlistClick} />
            )}
          </div>
        </div>
      </header>
      <main>
        <p
          className="instructions"
          dangerouslySetInnerHTML={{ __html: meal.strInstructions }}
        ></p>
      </main>
    </div>
  );
}

export default RecipePage;
