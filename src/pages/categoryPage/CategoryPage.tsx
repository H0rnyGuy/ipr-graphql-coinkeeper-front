import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsLogged } from "../../hooks/useIsLogged.ts";
import ProfileMenu from "../../components/ProfileMenu.tsx";
import {useCategory} from "../../hooks/categoryPage/useCategory.ts";
import {CategoryNames} from "../../components/categories/categoryIcons.ts";
import {CategoryTypes, CategoryTypeText} from "../../components/categories/categoryTypes.ts";
import '../../styles/category/categoryPage.css'

const CategoryPage = () => {
    const { id } = useParams();
    const numericId = Number(id);

    const location = useLocation();
    const isLogged = useIsLogged();

    const [category, setCategory] = useState(location.state?.category || null);

    const { category: fetchedCategory, loading, error, refetch } = useCategory({ id: numericId, skip: !!category });

    useEffect(() => {
        isLogged();
    }, []);

    useEffect(() => {
        console.log('fetchedCategory:', fetchedCategory)

        console.log('category:', category)
        if (fetchedCategory && !category) {
            setCategory(fetchedCategory);
        }
    }, [fetchedCategory, category]);

    const getCategoryTypeText = (type: CategoryTypes) => CategoryTypeText[type];

    const getDefaultCategoryName = (defaultCategoryId: number) => {
        return CategoryNames[defaultCategoryId] || "Unknown Category";
    };

    return (
        <div className="category-page">
            <ProfileMenu />
            <div className="category-page-header">
                <h1 className="category-page-title">Category Page</h1>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                category && (
                    <div className="category-page-content">
                        {/* Верхняя часть с данными категории */}
                        <div className="category-header">
                            <h2 className="category-name">{category.name}</h2>
                            <p className="category-description">{category.description}</p>
                            <p className="category-type">Type: {getCategoryTypeText(category.type)}</p>

                            {category.defaultCategoryId && (
                                <div className="default-category">
                                    <h3>Default Category: {getDefaultCategoryName(category.defaultCategoryId)}</h3>
                                </div>
                            )}
                        </div>

                        {/* Создание транзакций */}
                        <div className="add-transaction-button">
                            <button>Create Transaction</button>
                        </div>


                        {/* График или переключатель между графиком и списком транзакций */}
                        <div className="graph-toggle">
                            <button>Switch to Graph View</button>
                        </div>

                        {/* Список транзакций */}
                        <div className="transaction-list">
                            {/* транзакции */}
                        </div>
                    </div>
                )
            )}
        </div>
    );

};

export default CategoryPage;
