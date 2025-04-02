import CategoryCard from "./CategoryCard";
import '../../styles/categories/categoryGrid.css'

const CategoryGrid = ({categories}) => {
    return (
        <div className="categories-grid">
            {categories.map((cat) => (
                <CategoryCard
                    key={cat.id}
                    name={cat.name}
                    description={cat.description}
                    type={cat.type}
                    id={cat.id}
                    defaultCategoryId={cat.defaultCategoryId}
                />
            ))}
        </div>
    );
};

export default CategoryGrid;
