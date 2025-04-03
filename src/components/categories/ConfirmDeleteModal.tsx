import {useDeleteCategory} from "../../hooks/categoriesPage/useDeleteCategory.ts";
import "../../styles/categories/confirmDeletionModal.css";

const ConfirmDeleteModal = ({ category, onClose, onDeleted }) => {
    const { deleteCategory, loading } = useDeleteCategory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isDeleted = await deleteCategory(category.id);
        if (isDeleted) {
            onDeleted(category);
            onClose();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-title">Confirm category deletion</div>
                <div className="category-info">
                    <div className="category-card-title">{category.name}</div>
                    <div className="category-card-dexcription">{category.description}</div>
                </div>
                <div className="modal-actions">
                    <button type="submit" onClick={handleSubmit} disabled={loading}>Yes, Delete</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
