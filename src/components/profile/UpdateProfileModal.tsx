import { useState } from "react";
import { useUpdateProfile } from "../../hooks/profileMenu/useUpdateProfile";
import "../../styles/categories/confirmDeletionModal.css";

const UpdateProfileModal = ({ profile, onClose, onUpdated }) => {
    const [firstName, setFirstName] = useState(profile.firstName || "");
    const [lastName, setLastName] = useState(profile.lastName || "");

    const { updateProfile, loading } = useUpdateProfile();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updated = await updateProfile({ firstName, lastName });
        if (updated) {
            onUpdated?.(updated);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-title">Edit Profile</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            maxLength={125}
                        />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            maxLength={125}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" disabled={loading}>Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
