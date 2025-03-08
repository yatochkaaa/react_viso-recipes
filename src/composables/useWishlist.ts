import { Meal } from "../types/meals";

export function useWishlist() {
  const addToWishlist = (meal: Meal) => {
    const wishlist = localStorage.getItem("wishlist");
    if (wishlist) {
      let parsedWishlist = JSON.parse(wishlist);

      if (wishlist.includes(meal.idMeal)) {
        parsedWishlist = parsedWishlist.filter(
          (mealItem: Meal) => mealItem.idMeal !== meal.idMeal
        );
      } else {
        parsedWishlist.push(meal);
      }
      localStorage.setItem("wishlist", JSON.stringify(parsedWishlist));
    } else {
      localStorage.setItem("wishlist", JSON.stringify([meal]));
    }
  };

  const isAddedToWishlist = (id: string) => {
    const wishlist = localStorage.getItem("wishlist");

    if (wishlist) {
      let parsedWishlist = JSON.parse(wishlist);
      return parsedWishlist && parsedWishlist.some((meal: Meal) => meal.idMeal === id);
    }

    return false;
  };

  return { addToWishlist, isAddedToWishlist };
}
