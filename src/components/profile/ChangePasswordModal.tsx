import { useState } from "react";
import { useChangePassword } from "../../hooks/profileMenu/useChangePassword";
import "../../styles/categories/confirmDeletionModal.css";

const PASSWORD_MIN = 8;
const PASSWORD_MAX = 50;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[^\s]*$/;

const ChangePasswordModal = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const { changerPassword, loading } = useChangePassword();

    const validate = () => {
        const newErrors = {};

        if (newPassword.length < PASSWORD_MIN || newPassword.length > PASSWORD_MAX) {
            newErrors.newPassword = `Password must be ${PASSWORD_MIN}-${PASSWORD_MAX} characters.`;
        } else if (!PASSWORD_REGEX.test(newPassword)) {
            newErrors.newPassword =
                "Password must include at least one uppercase, one lowercase letter and one number.";
        }

        if (confirmPassword !== newPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (!oldPassword) {
            newErrors.oldPassword = "Current password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        await changerPassword({ oldPassword, password: newPassword });
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-title">Change Password</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        {errors.oldPassword && <div className="input-error">{errors.oldPassword}</div>}
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {errors.newPassword && <div className="input-error">{errors.newPassword}</div>}
                    </div>

                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <div className="input-error">{errors.confirmPassword}</div>}
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

export default ChangePasswordModal;
