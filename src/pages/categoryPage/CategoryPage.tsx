import { useParams, useLocation } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import { useIsLogged } from "../../hooks/useIsLogged.ts";
import ProfileMenu from "../../components/ProfileMenu.tsx";
import {useCategory} from "../../hooks/categoryPage/useCategory.ts";
import {CategoryNames} from "../../components/categories/categoryIcons.ts";
import {CategoryTypes, CategoryTypeText} from "../../components/categories/categoryTypes.ts";
import '../../styles/category/categoryPage.css'
import {TransactionList, TransactionListHandle} from '../../components/transactions/TransactionList.tsx'
import {TransactionFilters} from '../../components/transactions/TransactionFilters.tsx'
import {CategoryBalance, CategoryBalanceHandle} from "../../components/transactions/CategoryBalance.tsx";
import {CreateTransactionModal} from "../../components/transactions/CreateTransactionModal.tsx";

const CategoryPage = () => {
    const { id } = useParams();
    const numericId = Number(id);

    const location = useLocation();
    const isLogged = useIsLogged();

    const [category, setCategory] = useState(location.state?.category || null);

    const { category: fetchedCategory, loading, refetch } = useCategory({ id: numericId, skip: !!category });

    const [filters, setFilters] = useState({});

    const [isGraphView, setIsGraphView] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const transactionsRef = useRef<TransactionListHandle>(null);
    const balanceRef = useRef<CategoryBalanceHandle>(null);


    useEffect(() => {
        isLogged();
    }, []);

    useEffect(() => {

        if (fetchedCategory && !category) {
            setCategory(fetchedCategory);
        }

    }, [fetchedCategory, category]);

    const getCategoryTypeText = (type: CategoryTypes) => CategoryTypeText[type];

    const getDefaultCategoryName = (defaultCategoryId: number) => {
        return CategoryNames[defaultCategoryId] || "Unknown Category";
    };

    const toggleGraphView = () => {
        setIsGraphView((prev) => !prev);
    };

    const forceRefetch = () => {
        transactionsRef.current?.refetch();
        balanceRef.current?.refetch();
    };

    return (
        <div className="category-page">
            <ProfileMenu />
            <div className="category-page-header">
                <h1 className="category-page-title">Category Page</h1>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) :  (
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

                            <CategoryBalance
                                ref={balanceRef}
                                categoryId={category.id}
                                filters={filters}
                            />
                        </div>

                        {/* Создание транзакций */}
                        {!isGraphView && (
                            <div className="add-transaction-button">
                                <button onClick={() => setShowModal(true)}>Create Transaction</button>
                            </div>
                        )}

                        {/* График или переключатель между графиком и списком транзакций */}
                        <div className="graph-toggle">
                            <button onClick={toggleGraphView}>
                                {isGraphView ? "Switch to Transaction List" : "Switch to Graph View"}
                            </button>
                        </div>

                        {/* Список транзакций */}
                        {isGraphView ? (
                            <div className="graph-placeholder">
                                <p>📊 Graph View coming soon...</p>
                            </div>
                        ) : (
                            <>
                                <TransactionFilters onChange={setFilters} />
                                <TransactionList
                                    ref={transactionsRef}
                                    categoryId={category.id}
                                    filters={filters}
                                />
                            </>
                        )}
                    </div>
                )
            )}

            {showModal && (
                <CreateTransactionModal
                    categoryId={category.id}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        forceRefetch();
                    }}
                />
            )}

        </div>
    );

};

export default CategoryPage;
