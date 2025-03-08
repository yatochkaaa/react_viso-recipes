import { useQuery } from "@tanstack/react-query";
import { getMeals, getMealsCategories } from "../../api/meals";
import { useState, useEffect } from "react";
import RecipesHeader from "../../components/recipes/RecipesHeader";
import "./recipes-page.css";
import RecipesGrid from "../../components/recipes/RecipesGrid/RecipesGrid";

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
      <RecipesHeader
        categories={mealsCategoriesQuery.data?.meals || []}
        selectedCategory={selectedCategory}
        selectCategory={setSelectedCategory}
      />

      {mealsQuery.isLoading ? (
        <div>Loading meals...</div>
      ) : mealsQuery.isError ? (
        <div>Error loading meals: {mealsQuery.error.message}</div>
      ) : (
        <RecipesGrid recipes={mealsQuery.data?.meals || []} />
      )}
    </main>
  );
}

export default RecipesPage;
