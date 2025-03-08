import { Route, Routes } from "react-router";
import RecipesPage from "./pages/RecipesPage/RecipesPage";
import RecipePage from "./pages/RecipePage";
import WishlistPage from "./pages/WishlistPage";
import "./app.css";

function App() {
  return (
    <Routes>
      <Route index element={<RecipesPage />} />
      <Route path=":id" element={<RecipePage />} />
      <Route path="wishlist" element={<WishlistPage />} />
    </Routes>
  );
}

export default App;
