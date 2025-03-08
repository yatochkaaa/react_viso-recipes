import { MealCategory } from "../../types/meals";

interface Props {
  categories: MealCategory[];
  selectedCategory: string | null;
  selectCategory: (category: string) => void;
}

function RecipesHeader({
  categories,
  selectedCategory,
  selectCategory,
}: Props) {
  return (
    <header className="header">
      <h1>Categories</h1>
      <nav className="nav">
        <ul>
          {categories.map((category) => (
            <li
              key={category.strCategory}
              className={
                selectedCategory === category.strCategory
                  ? "highlight"
                  : undefined
              }
              onClick={() => selectCategory(category.strCategory)}
              style={{ cursor: "pointer" }}
            >
              {category.strCategory}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default RecipesHeader;
