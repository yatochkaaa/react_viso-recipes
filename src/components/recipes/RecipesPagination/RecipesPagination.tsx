import "./recipes-pagination.css";

interface Props {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

function RecipesPagination({
  currentPage,
  totalPages,
  handlePageChange,
}: Props) {
  const pagesToShow = () => {
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Показываем страницы 1-7 и последнюю
      for (let i = 1; i <= 7; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages); // Последняя страница
    }
    return pages;
  };
  return (
    <div className="recipes-pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>

      {pagesToShow().map((page, index) => {
        if (page === "...") {
          return <span key={index}>...</span>;
        } else {
          return (
            <button
              key={index}
              onClick={() => handlePageChange(page as number)}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </button>
          );
        }
      })}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
}

export default RecipesPagination;
