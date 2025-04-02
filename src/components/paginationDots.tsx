const PaginationDots = ({ currentPage, totalPages, onPrev, onNext }) => {
    return (
        <div className="flex items-center justify-center mt-6 gap-4 text-sm text-gray-700">
            <button
                onClick={onPrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ←
            </button>

            <span className="text-sm">
				Page {currentPage} / {totalPages}
			</span>

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                →
            </button>
        </div>
    );
};

export default PaginationDots;
