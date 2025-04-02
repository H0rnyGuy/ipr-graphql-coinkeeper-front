import '../../styles/categories/categoryCard.css'
import {baseCategoryIcons, customIcon, editedOverlay} from "./categoryIcons.ts";

const CategoryCard = ({ name, description, type, id, defaultCategoryId }) => {
    let iconSrc = customIcon;
    let isEdited = false;

    if (type === 1) {
        iconSrc = baseCategoryIcons[id];
    } else if (type === 3 && defaultCategoryId) {
        iconSrc = baseCategoryIcons[defaultCategoryId] || customIcon;
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
                <div className="category-card-title">{name}</div>
                <div className="category-card-dexcription">{description}</div>
            </div>

        </div>
);
};

export default CategoryCard;
