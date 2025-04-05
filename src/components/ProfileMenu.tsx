import {useState, useEffect, useRef} from "react";
import { useLogout } from "../hooks/useLogout";
import "../styles/ProfileMenu.css";
import { useProfile } from "../hooks/profileMenu/useProfile.ts";
import {CategoryBalance, CategoryBalanceHandle} from "./transactions/CategoryBalance";
import UpdateProfileModal from "./profile/UpdateProfileModal.tsx";
import ChangePasswordModal from "./profile/ChangePasswordModal.tsx";

const ProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileLoaded, setProfileLoaded] = useState(false);

    const { handleLogout, loading: logoutLoading } = useLogout();
    const { profile, loading: profileLoading, error } = useProfile();

    const [cachedProfile, setCachedProfile] = useState(null);

    const [lastBalanceFetchedAt, setBalanceLastFetchedAt] = useState<Date | null>(null);
    const balanceRef = useRef<CategoryBalanceHandle>(null);

    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    const formatLastFetched = () => {
        if (!lastBalanceFetchedAt) return "Never";
        const diffMs = Date.now() - lastBalanceFetchedAt.getTime();
        const diffMin = Math.floor(diffMs / 1000 / 60);
        if (diffMin < 1) return "Just now";
        if (diffMin === 1) return "1 minute ago";
        if (diffMin < 60) return `${diffMin} minutes ago`;
        return lastBalanceFetchedAt.toLocaleString();
    };

    useEffect(() => {
        if (isOpen && !profileLoaded && profile && !profileLoading) {
            setCachedProfile(profile);
            setProfileLoaded(true);
        }
    }, [isOpen, profile, profileLoading]);

    const handleRefreshBalance = () => {
        balanceRef.current?.refetch();
        setBalanceLastFetchedAt(new Date());
    };

    const handleEditProfile = () => setUpdateModalOpen(true);
    const closeEditProfile = () => setUpdateModalOpen(false);

    const handleProfileUpdated = (updated) => {
        setCachedProfile(updated);
        closeEditProfile();
    };

    const handleOpenPasswordModal = () => setPasswordModalOpen(true);
    const closePasswordModal = () => setPasswordModalOpen(false);


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

                    {profileLoading && <div className="profile-loading">Loading profile...</div>}
                    {error && <div className="profile-error">Failed to load profile</div>}

                    {cachedProfile && (
                        <div className="profile-info">
                            <div className="profile-field">
                                <span className="field-label">Username:</span>
                                <span className="field-value">{cachedProfile.username}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">Email:</span>
                                <span className="field-value">{cachedProfile.email}</span>
                            </div>
                            <div className="profile-field">
                                <span className="field-label">Name:</span>
                                <span className="field-value">
									{cachedProfile.firstName || cachedProfile.lastName
                                        ? `${cachedProfile.firstName || ""} ${cachedProfile.lastName || ""}`
                                        : "Not provided"}
								</span>
                            </div>
                        </div>
                    )}

                    <div className="profile-balance-section">
                        <div className="section-title">
                            Total Balance
                            <button onClick={handleRefreshBalance} className="refresh-button" title="Refresh balance">
                                ↻
                            </button>
                        </div>

                        <CategoryBalance
                            ref={balanceRef}
                            categoryId={undefined}
                            filters={{}}
                        />

                        <div className="balance-updated-at">
                            Last updated: {formatLastFetched()}
                        </div>
                    </div>

                    {cachedProfile && (
                        <>
                            <button className="edit-profile-button" onClick={handleEditProfile}>
                                Edit Profile
                            </button>

                            <button className="edit-profile-button" onClick={handleOpenPasswordModal}>
                                Change Password
                            </button>
                        </>
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

            {updateModalOpen && cachedProfile && (
                <UpdateProfileModal
                    profile={cachedProfile}
                    onClose={closeEditProfile}
                    onUpdated={handleProfileUpdated}
                />
            )}

            {passwordModalOpen && (
                <ChangePasswordModal onClose={closePasswordModal} />
            )}

        </div>
    );
};

export default ProfileMenu;
