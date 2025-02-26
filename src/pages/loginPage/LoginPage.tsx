import { useState } from "react";
import {toast} from "react-toastify";
import {useLogin} from "../../hooks/LoginPage/useLogin.ts";
import {useRegister} from "../../hooks/LoginPage/useRegister.ts";

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false); // Переключение между логином и регистрацией
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [username, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { login, loading: loginLoading } = useLogin();

    const { register, loading: registerLoading } = useRegister();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isRegistering) {
            if (password !== confirmPassword) {
                toast.error("Passwords doesn't match");
                return;
            }

            await register(username, email, password);
        } else {
            await login(email, password);
        }
    };

    return (
        <div>
            <h1>{isRegistering ? "Registration" : "Login"}</h1>
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} required />
                    </>
                )}
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {isRegistering && (
                    <input type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                )}
                <button type="submit" disabled={loginLoading || registerLoading}>
                    {isRegistering ? "Зарегистрироваться" : "Войти"}
                </button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
            </button>
        </div>
    );
};

export default LoginPage;
