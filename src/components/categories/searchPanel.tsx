import { CategoryTypes } from "./categoryTypes.ts";
import '../../styles/categories/searchPanel.css';

const SearchPanel = ({ query, type, onQueryChange, handleTypeToggle, handleSearchKeyDown }) => {
    return (
        <div className="search-panel">
            <input
                type="text"
                placeholder="Search by name..."
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="search-input"
            />

            <div className="filter-buttons">
                <button
                    className={`filter-button ${type === CategoryTypes.default ? 'active' : ''}`}
                    onClick={() => handleTypeToggle(CategoryTypes.default)}
                >
                    Default
                </button>

                <button
                    className={`filter-button ${type === CategoryTypes.custom ? 'active' : ''}`}
                    onClick={() => handleTypeToggle(CategoryTypes.custom)}
                >
                    Custom
                </button>

                <button
                    className={`filter-button ${type === CategoryTypes.edited ? 'active' : ''}`}
                    onClick={() => handleTypeToggle(CategoryTypes.edited)}
                >
                    Edited
                </button>

                <button
                    className={`filter-button ${type === null ? 'active' : ''}`}
                    onClick={() => handleTypeToggle(null)}
                >
                    All
                </button>
            </div>
        </div>
    );
};

export default SearchPanel;