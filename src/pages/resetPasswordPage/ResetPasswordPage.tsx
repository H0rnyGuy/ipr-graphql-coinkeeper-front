import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useResetPassword } from '../../hooks/resetPasswordPage/useResetPassword.ts';

const ResetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { resetPassword, loading } = useResetPassword();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const resetToken = queryParams.get("token");
        if (resetToken) {
            setToken(resetToken);
        } else {
            navigate("/login");
        }
    }, [location.search, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords does not ,atch!");
            return;
        }

        await resetPassword(password, token);
    };

    return (
        <div className="reset-password-page">
            <h2>Password reset</h2>
            {token ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Resetting..." : "Reset password"}
                    </button>
                </form>
            ) : (
                <p>Error: token is missing.</p>
            )}
        </div>
    );
};

export default ResetPasswordPage;
