import { useEffect, useState } from "react";
import { useIsLogged } from "../../hooks/useIsLogged.ts";
import PaginationDots from "../../components/PaginationDots.tsx";
import { useCategories } from "../../hooks/categoriesPage/useCategories.ts";
import CategoryGrid from "../../components/categories/categoryGrid.tsx";
import SearchPanel from "../../components/categories/SearchPanel.tsx";
import { FiSearch } from "react-icons/fi";

import '../../styles/categories/categoriesPage.css';
import CreateCategoryModal from "../../components/categories/createCategoryModal.tsx";
import {CategoryTypes} from "../../components/categories/categoryTypes.ts";
import UpdateCategoryModal from "../../components/categories/UpdateCategoryModal.tsx";
import ConfirmDeleteModal from "../../components/categories/ConfirmDeleteModal.tsx";

const CategoriesPage = () => {
    const isLogged = useIsLogged();

    const [offset, setOffset] = useState(0);

    const [query, setQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [searchOpen, setSearchOpen] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const limit = 12;

    const [type, setType] = useState(null)

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [localCategories, setLocalCategories] = useState([]);

    const { data: categories, pagination, loading, refetch } = useCategories({ offset, limit, q: searchQuery, byType: type });

    const [deletingCategory, setDeletingCategory] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const currentPage = offset / limit + 1;
    const totalPages = Math.ceil((pagination.totalCount || 0) / limit);

    useEffect(() => {
        isLogged();
    }, []);

    useEffect(() => {
        if (!loading && categories.length) {
            setLocalCategories(categories);
        }
    }, [categories, loading]);

    const handlePrevPage = () => {
        if (offset > 0) setOffset(offset - limit);
    };

    const handleNextPage = () => {
        if (pagination.nextOffset !== null && pagination.nextOffset < pagination.totalCount) {
            setOffset(offset + limit);
        }
    };

    const handleSearchChange = (value: string) => {
        setQuery(value);
    };

    const handleSearchKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearchQuery(query);
            setOffset(0);
        }
    };

    const handleTypeToggle = (value) => {
        if (type !== value) {
            setType(value);
        } else {
            setType(null)
        }
        setOffset(0);
    };

    const handleCreated = () => {
        refetch();
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setEditModalOpen(true);
    };

    const handleCategoryUpdated = (updated) => {
        if (updated.type === CategoryTypes.edited) {
            refetch();
        } else {
            setLocalCategories(prev =>
                prev.map(cat => cat.id === updated.id ? updated : cat)
            );
        }
    };

    const handleCancelUpdate = () => {
        setEditModalOpen(false)
    }

    const handleCategoryDeleted = (deleted) => {
        if (deleted.type === CategoryTypes.edited) {
            refetch();
        } else {
            setLocalCategories(prev => prev.filter(cat => cat.id !== deleted.id));
        }
    };

    const handleDeleteCategory = (category) => {
        setDeletingCategory(category);
        setDeleteModalOpen(true);
    };

    const handleCancelDelete = () => {
        setDeleteModalOpen(false);
    };

    return (
        <div>

            <div className="categories-grid-wrapper">
                <div className="categories-header">
                    <div className="page-title">Categories</div>
                    <button className={`search-toggle-button ${ searchOpen ? 'active' : ''}`} onClick={() => setSearchOpen(prev => !prev)}>
                        <FiSearch size={20} />
                    </button>
                </div>

                {searchOpen && (
                    <SearchPanel
                        query={query}
                        onQueryChange={handleSearchChange}
                        handleTypeToggle={handleTypeToggle}
                        handleSearchKeyDown={handleSearchKeyDown}
                        type = {type}
                    />
                )}

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <CategoryGrid
                            categories={localCategories}
                            onAddClick={() => setShowModal(true)}
                            onEdit={handleEditCategory}
                            onDelete={handleDeleteCategory}
                        />
                        <div className="pagination-wrapper">
                            <PaginationDots
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPrev={handlePrevPage}
                                onNext={handleNextPage}
                            />
                        </div>
                    </>
                )}
            </div>

            {showModal && (
                <CreateCategoryModal
                    onClose={() => setShowModal(false)}
                    onCreated={handleCreated}
                />
            )}

            {editModalOpen && editingCategory && (
                <UpdateCategoryModal
                    category={editingCategory}
                    onClose={handleCancelUpdate}
                    onUpdated={handleCategoryUpdated}
                />
            )}

            {deleteModalOpen && deletingCategory && (
                <ConfirmDeleteModal
                    category={deletingCategory}
                    onClose={handleCancelDelete}
                    onDeleted={handleCategoryDeleted}
                />
            )}

        </div>
    );
};

export default CategoriesPage;
