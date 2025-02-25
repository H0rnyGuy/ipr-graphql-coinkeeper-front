import { useParams } from "react-router-dom";

const CategoryPage = () => {
    const { id } = useParams();
    return <h1>Категория ID: {id}</h1>;
};

export default CategoryPage;
