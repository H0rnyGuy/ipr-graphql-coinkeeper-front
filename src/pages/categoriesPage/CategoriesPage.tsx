import { useEffect, useState } from "react";
import { useIsLogged } from "../../hooks/useIsLogged.ts";
import ProfileMenu from "../../components/ProfileMenu.tsx";
import PaginationDots from "../../components/PaginationDots.tsx";
import { useCategories } from "../../hooks/categoriesPage/useCategories.ts";
import CategoryGrid from "../../components/categories/categoryGrid.tsx";
import SearchPanel from "../../components/categories/SearchPanel.tsx";
import { FiSearch } from "react-icons/fi";

import '../../styles/categories/categoriesPage.css';

const CategoriesPage = () => {
    const isLogged = useIsLogged();

    const [offset, setOffset] = useState(0);

    const [query, setQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [searchOpen, setSearchOpen] = useState(false);

    const limit = 12;

    const [type, setType] = useState(null)

    const { data: categories, pagination, loading } = useCategories({ offset, limit, q: searchQuery, byType: type });

    const currentPage = offset / limit + 1;
    const totalPages = Math.ceil((pagination.totalCount || 0) / limit);

    useEffect(() => {
        isLogged();
    }, []);

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

    return (
        <div>
            <ProfileMenu />

            <div className="categories-grid-wrapper">
                <div className="categories-header">
                    <div className="page-title">Categories</div>
                    <button className="search-toggle-button" onClick={() => setSearchOpen(prev => !prev)}>
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
                        <CategoryGrid categories={categories} />
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
        </div>
    );
};

export default CategoriesPage;
