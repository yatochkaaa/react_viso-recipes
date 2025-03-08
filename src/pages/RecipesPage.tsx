import { useQuery } from "@tanstack/react-query";
import { getMeals, getMealsCategories } from "../api/meals";
import { useState, useEffect } from "react";

function RecipesPage() {
  // Запрос категорий
  const mealsCategoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getMealsCategories,
  });

  // Состояние для выбранной категории
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Запрос для получения meals по выбранной категории
  const mealsQuery = useQuery({
    queryKey: ["meals", selectedCategory],
    queryFn: () => getMeals(selectedCategory!),
    enabled: !!selectedCategory, // Запрос выполняется только если категория выбрана
  });

  // После загрузки категорий, сразу выбрать первую категорию
  useEffect(() => {
    if (
      mealsCategoriesQuery.data?.meals &&
      mealsCategoriesQuery.data?.meals.length > 0
    ) {
      setSelectedCategory(mealsCategoriesQuery.data.meals[0].strCategory);
    }
  }, [mealsCategoriesQuery.data]); // Запускаем этот эффект, когда категории загружены

  if (mealsCategoriesQuery.isLoading) {
    return <div>Loading categories...</div>;
  }

  if (mealsCategoriesQuery.isError) {
    return (
      <div>Error loading categories: {mealsCategoriesQuery.error.message}</div>
    );
  }

  return (
    <main>
      <div>
        <h2>Categories:</h2>
        <nav>
          <ul>
            {mealsCategoriesQuery.data?.meals.map((category) => (
              <li
                key={category.strCategory}
                onClick={() => setSelectedCategory(category.strCategory)}
                style={{ cursor: "pointer" }}
              >
                {category.strCategory}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <h2>Meals:</h2>
        {mealsQuery.isLoading ? (
          <div>Loading meals...</div>
        ) : mealsQuery.isError ? (
          <div>Error loading meals: {mealsQuery.error.message}</div>
        ) : (
          <ul>
            {mealsQuery.data?.meals.map((meal) => (
              <li key={meal.idMeal}>{meal.strMeal}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export default RecipesPage;
