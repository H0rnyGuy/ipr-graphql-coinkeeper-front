import { useState } from "react";
import { useCreateCategory } from "../../hooks/categoriesPage/useCreateCategory";
import "../../styles/categories/createCategoryModal.css";
import {toast} from "react-toastify";

const CreateCategoryModal = ({ onClose, onCreated }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { createCategory, loading } = useCreateCategory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.info('Name of the category is required')
            return;
        }
        const newCategory = await createCategory({ name, description });
        if (newCategory) {
            onCreated(newCategory);
            onClose();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-title">Create New Category</div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Category name (required)"
                        value={name}
                        maxLength={125}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        maxLength={500}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="modal-actions">
                        <button type="submit" disabled={loading}>Create</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCategoryModal;
