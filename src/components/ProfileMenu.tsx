import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import '../styles/ProfileMenu.css';

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { handleLogout } = useLogout();

    return (
        <div className="profile-menu">
            {/* Иконка профиля */}
            <button className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
                🧑
            </button>

            {/* Боковая панель */}
            {isOpen && (
                <div className="profile-sidebar">
                    <button className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
                        ←
                    </button>

                    <h3>Profile</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
