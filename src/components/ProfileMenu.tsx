import { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import "../styles/ProfileMenu.css";
import {useProfile} from "../hooks/profileMenu/useProfile.ts";

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileLoaded, setProfileLoaded] = useState(false);

    const { handleLogout, loading: logoutLoading } = useLogout();
    const { profile, loading: profileLoading, error } = useProfile();

    const [cachedProfile, setCachedProfile] = useState(null);

    useEffect(() => {
        if (isOpen && !profileLoaded && profile && !profileLoading) {
            setCachedProfile(profile);
            setProfileLoaded(true);
        }
    }, [isOpen, profile, profileLoading]);

    return (
        <div className="profile-menu">
            {/* Иконка профиля */}
            <button className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
                🧑
            </button>

            {/* Боковая панель */}
            {isOpen && (
                <div className="profile-sidebar">
                    <button className="profile-icon" onClick={() => setIsOpen(false)}>
                        ←
                    </button>

                    <h3>Profile</h3>

                    {profileLoading && <p>Loading profile...</p>}
                    {error && <p className="error">Failed to load profile</p>}

                    {cachedProfile && (
                        <div className="profile-info">
                            <p><strong>Username:</strong> {cachedProfile.username}</p>
                            <p><strong>Email:</strong> {cachedProfile.email}</p>
                            {cachedProfile.firstName && <p><strong>Name:</strong> {cachedProfile.firstName} {cachedProfile.lastName || ""}</p>}
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
