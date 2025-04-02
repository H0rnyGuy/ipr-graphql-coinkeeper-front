import '../../styles/categories/categoryCard.css'
import {baseCategoryIcons, customIcon, editedOverlay} from "./categoryIcons.ts";
import {CategoryTypes} from "./categoryTypes.ts";

const CategoryCard = ({ category }) => {
    const { id, name, description, type, defaultCategoryId } = category;

    let iconSrc = customIcon;
    let isEdited = false;


    if (type === CategoryTypes.default && baseCategoryIcons[id]) {
        iconSrc = baseCategoryIcons[id];
    } else if (type === CategoryTypes.custom && defaultCategoryId && baseCategoryIcons[defaultCategoryId]) {
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
                <div className="category-card-title">{name}</div>
                <div className="category-card-dexcription">{description}</div>
            </div>

        </div>
);
};

export default CategoryCard;
