import {useState} from "react";
import {useUpdateCategory} from "../../hooks/categoriesPage/useUpdateCategory.ts";

const UpdateCategoryModal = ({ category, onClose, onUpdated }) => {
    const [name, setName] = useState(category.name);
    const [description, setDescription] = useState(category.description || "");

    const { updateCategory, loading } = useUpdateCategory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updated = await updateCategory({
            categoryId: category.id,
            name,
            description,
        });
        if (updated) {
            onUpdated(updated);
            onClose();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-title">Edit Category</div>
                <form onSubmit={handleSubmit}>
                    <input value={name} onChange={(e) => setName(e.target.value)} maxLength={125} />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={500} />
                    <div className="modal-actions">
                        <button type="submit" disabled={loading}>Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategoryModal;