import { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import "../styles/ProfileMenu.css";
import { useProfile } from "../hooks/profileMenu/useProfile.ts";

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
            <button className="profile-icon" onClick={() => setIsOpen(!isOpen)}>
                🧑
            </button>

            {isOpen && (
                <div className="profile-sidebar">
                    <button className="profile-icon" onClick={() => setIsOpen(false)}>
                        ←
                    </button>

                    <div className="profile-title">Profile</div>

                    {profileLoading && (
                        <div className="profile-loading">Loading profile...</div>
                    )}

                    {error && (
                        <div className="profile-error">Failed to load profile</div>
                    )}

                    {cachedProfile && (
                        <div className="profile-info">

                            <div className="profile-field">
                                <span className="field-label">Name:</span>
                                <span className="field-value">
									{cachedProfile.firstName || cachedProfile.lastName
                                        ? `${cachedProfile.firstName || ""} ${cachedProfile.lastName || ""}`
                                        : "Not provided"}
								</span>
                            </div>

                            <div className="profile-field">
                                <span className="field-label">Username:</span>
                                <span className="field-value">{cachedProfile.username}</span>
                            </div>

                            <div className="profile-field">
                                <span className="field-label">Email:</span>
                                <span className="field-value">{cachedProfile.email}</span>
                            </div>

                        </div>
                    )}

                    <button
                        className="logout-button"
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
