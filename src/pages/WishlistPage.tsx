import RecipesGrid from "../components/recipes/RecipesGrid/RecipesGrid";

function WishlistPage() {
  const recipes = localStorage.getItem("wishlist");
  const parsedRecipes = recipes ? JSON.parse(recipes) : [];

  return <RecipesGrid recipes={parsedRecipes} />;
}

export default WishlistPage;
