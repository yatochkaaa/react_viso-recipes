import { Link, Route, Routes, useLocation } from "react-router";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import "./app.css";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <header className="layout-header">
        <Link
          to="/"
          className={pathname === "/" || pathname === "" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="wishlist"
          className={pathname.startsWith("/wishlist") ? "active" : ""}
        >
          Wishlist
        </Link>
      </header>
      <Routes>
        <Route index element={<RecipesPage />} />
        <Route path=":id" element={<RecipeDetailsPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
      </Routes>
    </>
  );
}

export default App;
