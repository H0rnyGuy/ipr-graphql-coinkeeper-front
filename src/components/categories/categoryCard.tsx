import '../../styles/categories/categoryCard.css'
import {baseCategoryIcons, customIcon, editedOverlay} from "./categoryIcons.ts";
import {CategoryTypes} from "./categoryTypes.ts";
import {useState} from "react";
import {FiMoreVertical} from "react-icons/fi";
import { Link } from "react-router-dom";

const CategoryCard = ({ category, onEdit, onDelete, deleteLoading}) => {
    const { id, name, description, type, defaultCategoryId } = category;

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    const handleDelete = () => {
        onDelete(category);
    };

    let iconSrc = customIcon;
    let isEdited = false;

    if (type === CategoryTypes.default && baseCategoryIcons[id]) {
        iconSrc = baseCategoryIcons[id];
    } else if (type === CategoryTypes.edited && defaultCategoryId && baseCategoryIcons[defaultCategoryId]) {
        iconSrc = baseCategoryIcons[defaultCategoryId];
        isEdited = true;
    }

    return (
        <div className="category-card">

            <div className="category-icon">
                <img src={iconSrc} alt="icon" />
                {isEdited && (
                    <img src={editedOverlay} alt="edited" className="overlay" />
                )}
            </div>

            <div>
                <Link
                    to={`/categories/${id}`}
                    state={{ category }}
                    className="category-card-title"
                >
                    {name}
                </Link>

                <div className="category-card-dexcription">{description}</div>
            </div>

            <div className="menu-container">
                <button className="menu-button" onClick={toggleMenu}>
                    <FiMoreVertical />
                </button>

                {menuOpen && (
                    <div className="menu-dropdown">
                        <button onClick={() => onEdit(category)}>Edit</button>
                        {type !== CategoryTypes.default && (
                            <button onClick={handleDelete} disabled={deleteLoading}>
                                {deleteLoading ? "Deleting..." : "Delete"}
                            </button>
                        )}
                    </div>
                )}

            </div>

        </div>
);
};

export default CategoryCard;
