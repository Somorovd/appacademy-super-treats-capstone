import "./CategorySidebar.css";

export default function CategorySidebar({ business }) {
  const categories = Object.values(business.categories);

  const getScrollFunction = (id) => {
    return () => {
      document.getElementById(id).scrollIntoView();
      window.scrollBy(0, 200);
    };
  };

  return (
    <div className="category-sidebar flex flex-c g10">
      {categories.map((c) => (
        <p
          className="category-sidebar__link"
          onClick={getScrollFunction(`category-${c.id}`)}
        >
          {c.name}
        </p>
      ))}
    </div>
  );
}
