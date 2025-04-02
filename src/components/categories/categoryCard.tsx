const CategoryCard = ({name, description}) => {
    return (
        <div className="p-4 border rounded shadow">
        <h2 className="font-bold text-lg">{name}</h2>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
);
};

export default CategoryCard;
