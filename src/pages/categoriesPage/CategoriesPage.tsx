import { useEffect, useState } from "react";
import { useIsLogged } from "../../hooks/useIsLogged.ts";
import ProfileMenu from "../../components/ProfileMenu.tsx";
import PaginationDots from "../../components/PaginationDots.tsx";
import { useCategories } from "../../hooks/categoriesPage/useCategories.ts";
import CategoryGrid from "../../components/categories/categoryGrid.tsx";

const CategoriesPage = () => {
    const isLogged = useIsLogged();
    const [offset, setOffset] = useState(0);
    const limit = 2;

    const { data: categories, pagination, loading } = useCategories({ offset, limit });

    const currentPage = offset / limit + 1;
    const totalPages = Math.ceil((pagination.totalCount || 0) / limit);

    useEffect(() => {
        isLogged();
    }, []);

    const handlePrevPage = () => {
        if (offset > 0) setOffset(offset - limit);
    };

    const handleNextPage = () => {
        console.log('totalPages:', totalPages)
        if (pagination.nextOffset !== null && pagination.nextOffset < pagination.totalCount) {
            setOffset(offset + limit);
        }
    };

    return (
        <div className="p-6">
            <ProfileMenu />
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <CategoryGrid categories={categories} />
                    <PaginationDots
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPrev={handlePrevPage}
                        onNext={handleNextPage}
                    />
                </>
            )}
        </div>
    );
};


export default CategoriesPage;
