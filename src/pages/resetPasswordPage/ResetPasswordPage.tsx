import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { useResetPassword } from '../../hooks/resetPasswordPage/useResetPassword.ts';

let isVerifying = false;

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
            navigate("/login"); // Если токена нет, отправляем на логин
        }
    }, [location.search, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            return;
        }

        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        await resetPassword(password, token);
    };

    return (
        <div className="reset-password-page">
            <h2>Сброс пароля</h2>
            {token ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Введите новый пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Подтвердите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Сбрасываем..." : "Сбросить пароль"}
                    </button>
                </form>
            ) : (
                <p>Ошибка: отсутствует токен.</p>
            )}
        </div>
    );
};

export default ResetPasswordPage;
