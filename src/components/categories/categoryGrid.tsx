import CategoryCard from "./CategoryCard";

const CategoryGrid = ({categories}) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {categories.map(cat => (
                <CategoryCard
                    key={cat.id}
                    name={cat.name}
                    description={cat.description}
                />
            ))}
        </div>
    );
};

export default CategoryGrid;
