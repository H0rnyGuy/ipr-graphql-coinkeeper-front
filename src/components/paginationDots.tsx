import '../styles/categories/paginationDots.css'

const PaginationDots = ({ currentPage, totalPages, onPrev, onNext }) => {
    return (
        <div className="pagination-wrapper">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
            >
                ←
            </button>

            <span className="text-sm">
				Page {currentPage} / {totalPages}
			</span>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
            >
                →
            </button>
        </div>
    );
};

export default PaginationDots;
