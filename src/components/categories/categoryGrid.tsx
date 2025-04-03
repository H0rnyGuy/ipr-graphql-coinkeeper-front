import CategoryCard from "./CategoryCard";
import '../../styles/categories/categoryGrid.css'

const CategoryGrid = ({categories, onAddClick, onEdit, onDelete, deleteLoading }) => {
    return (
        <div className="categories-grid">
            {categories.map((cat) => (
                <CategoryCard
                    key={cat.id}
                    category={cat}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    deleteLoading={deleteLoading}
                />
            ))}

            <div className="category-card empty-card" onClick={onAddClick}>
                +
            </div>
        </div>
    );
};

export default CategoryGrid;
