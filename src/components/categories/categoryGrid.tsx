import CategoryCard from "./CategoryCard";
import '../../styles/categories/categoryGrid.css'

const CategoryGrid = ({categories}) => {
    return (
        <div className="categories-grid">
            {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
            ))}
        </div>
    );
};

export default CategoryGrid;
