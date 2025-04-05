import { useState } from "react";
import { useUpdateProfile } from "../../hooks/profileMenu/useUpdateProfile";
import "../../styles/categories/confirmDeletionModal.css";

const NAME_REGEX = /^[A-Za-zÀàÂâÄäÉéÈèÊêËëÎîÏïÔôŒœÙùÛûÜüÇç@#$%^&*()_\-+=\s]+$/;

const FIRST_NAME_MIN = 2;
const FIRST_NAME_MAX = 20;
const LAST_NAME_MIN = 2;
const LAST_NAME_MAX = 20;

const UpdateProfileModal = ({ profile, onClose, onUpdated }) => {
    const [firstName, setFirstName] = useState(profile.firstName || "");
    const [lastName, setLastName] = useState(profile.lastName || "");

    const [errors, setErrors] = useState({ firstName: "", lastName: "" });

    const { updateProfile, loading } = useUpdateProfile();

    const validate = () => {
        let isValid = true;
        const newErrors = { firstName: "", lastName: "" };

        if (firstName.length < FIRST_NAME_MIN || firstName.length > FIRST_NAME_MAX) {
            newErrors.firstName = `First name must be ${FIRST_NAME_MIN}-${FIRST_NAME_MAX} characters`;
            isValid = false;
        } else if (!NAME_REGEX.test(firstName)) {
            newErrors.firstName = "First name contains invalid characters";
            isValid = false;
        }

        if (lastName.length < LAST_NAME_MIN || lastName.length > LAST_NAME_MAX) {
            newErrors.lastName = `Last name must be ${LAST_NAME_MIN}-${LAST_NAME_MAX} characters`;
            isValid = false;
        } else if (!NAME_REGEX.test(lastName)) {
            newErrors.lastName = "Last name contains invalid characters";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

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
                            maxLength={FIRST_NAME_MAX}
                        />
                        {errors.firstName && <div className="input-error">{errors.firstName}</div>}
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            maxLength={LAST_NAME_MAX}
                        />
                        {errors.lastName && <div className="input-error">{errors.lastName}</div>}
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
