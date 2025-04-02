import {CategoryTypes} from "./categoryTypes.ts";
import '../../styles/categories/searchPanel.css';

const SearchPanel = ({ query, onQueryChange, handleTypeToggle, handleSearchKeyDown }) => {
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

            <label className="search-checkbox">
                <input
                    type="checkbox"
                    onChange={(e) => handleTypeToggle(CategoryTypes.default)}
                />
                Show only default categories
            </label>

            <label className="search-checkbox">
                <input
                    type="checkbox"
                    onChange={(e) => handleTypeToggle(CategoryTypes.custom)}
                />
                Show only custom categories
            </label>

            <label className="search-checkbox">
                <input
                    type="checkbox"
                    onChange={(e) => handleTypeToggle(CategoryTypes.edited)}
                />
                Show only edited categories
            </label>
        </div>
    );
};

export default SearchPanel;