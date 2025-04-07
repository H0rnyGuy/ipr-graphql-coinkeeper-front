import { useState, useRef, useEffect } from 'react';
import '../../styles/graph/AutocompleteSelect.css';
import { useCategories } from "../../hooks/categoriesPage/useCategories.ts";

export const AutocompleteSelect = ({
                                       value,
                                       onChange,
                                       placeholder = "Search...",
                                       renderLabel = (item) => item.name,
                                   }) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const wrapperRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery, 300);

    const {
        data: categories,
        loading,
        pagination,
    } = useCategories({
        offset,
        limit,
        q: debouncedQuery,
        byType: null,
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInputValue(val);
        setSearchQuery(val);
        setOffset(0);
        setIsOpen(true);
    };

    const handleSelect = (item) => {
        onChange(item.id);
        setInputValue(renderLabel(item));
        setIsOpen(false);
    };

    return (
        <div className="autocomplete-wrapper" ref={wrapperRef}>
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <ul className="autocomplete-dropdown">
                    {loading ? (
                        <li className="loading">Searching...</li>
                    ) : categories.length > 0 ? (
                        categories.map(opt => (
                            <li key={opt.id} onClick={() => handleSelect(opt)}>
                                {renderLabel(opt)}
                            </li>
                        ))
                    ) : (
                        <li className="no-result">No categories found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

// 🔁 хелпер-дебаунс
function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}
