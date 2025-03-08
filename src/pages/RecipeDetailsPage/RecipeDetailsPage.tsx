import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMeal } from "../../api/meals";
import "./recipe-details-page.css";

function RecipePage() {
  let { id } = useParams();

  const mealQuery = useQuery({
    queryKey: ["meal", id],
    queryFn: () => getMeal(+id!),
    enabled: !!id,
  });

  if (mealQuery.isLoading) {
    return <div>Loading recipe ...</div>;
  }

  if (mealQuery.isError) {
    return <div>Error: {mealQuery.error?.message}</div>;
  }

  const meal = mealQuery.data?.meals[0];

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
                <li key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}
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
