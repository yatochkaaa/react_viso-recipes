import { useQuery } from "@tanstack/react-query";
import { getMeals, getMealsCategories } from "../../api/meals";
import { useState, useEffect } from "react";
import RecipesHeader from "../../components/recipes/RecipesHeader";
import "./recipes-page.css";
import RecipesGrid from "../../components/recipes/RecipesGrid/RecipesGrid";
import RecipesPagination from "../../components/recipes/RecipesPagination/RecipesPagination";
import { Meal } from "../../types/meals";
import { ClipLoader } from "react-spinners";
import { useDebounce } from "../../hooks/useDebounce";

function RecipesPage() {
  const mealsCategoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getMealsCategories,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [currentMeals, setCurrentMeals] = useState<Meal[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(9);

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 1000);

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const totalPages = Math.ceil(currentMeals.length / mealsPerPage);

  const mealsQuery = useQuery({
    queryKey: ["meals", selectedCategory],
    queryFn: () => getMeals(selectedCategory!),
    enabled: !!selectedCategory,
  });

  useEffect(() => {
    if (mealsQuery.data) {
      setAllMeals(mealsQuery.data.meals || []);
    }
  }, [mealsQuery.data]);

  useEffect(() => {
    if (
      mealsCategoriesQuery.data?.meals &&
      mealsCategoriesQuery.data?.meals.length > 0
    ) {
      setSelectedCategory(mealsCategoriesQuery.data.meals[0].strCategory);
    }
  }, [mealsCategoriesQuery.data]);

  useEffect(() => {
    const filteredMeals = allMeals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    setCurrentMeals(filteredMeals);
  }, [debouncedSearch, allMeals]);

  if (mealsCategoriesQuery.isLoading) {
    return (
      <ClipLoader
        color="white"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        cssOverride={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 300,
        }}
      />
    );
  }

  if (mealsCategoriesQuery.isError) {
    return (
      <div>Error loading categories: {mealsCategoriesQuery.error.message}</div>
    );
  }

  function handlePageChange(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const handleCategoryChange = (category: string | null) => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
    setAllMeals([]);
    setCurrentMeals([]);
    setCurrentPage(1);
  };

  const changeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <main className="recipes-page">
      <RecipesHeader
        categories={mealsCategoriesQuery.data?.meals || []}
        selectedCategory={selectedCategory}
        selectCategory={handleCategoryChange}
      />

      <input
        className="search-input"
        type="text"
        value={searchInput}
        onChange={changeSearchInput}
      />

      {mealsQuery.isLoading ? (
        <ClipLoader
          color="white"
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          cssOverride={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      ) : mealsQuery.isError ? (
        <div>Error loading meals: {mealsQuery.error.message}</div>
      ) : (
        <RecipesGrid
          recipes={currentMeals.slice(indexOfFirstMeal, indexOfLastMeal) || []}
        />
      )}

      {!mealsQuery.isLoading && (
        <RecipesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}
    </main>
  );
}

export default RecipesPage;
