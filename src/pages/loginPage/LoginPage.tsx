import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks/LoginPage/useLogin.ts';
import { useRegister } from '../../hooks/LoginPage/useRegister.ts';
import { useForgotPassword } from '../../hooks/LoginPage/useForgetPassword.ts';

const LoginPage = () => {
    const [view, setView] = useState('login');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [username, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { login, loading: loginLoading } = useLogin();

    const { register, loading: registerLoading } = useRegister();

    const { sendResetEmail, loading: resetLoading } = useForgotPassword();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (view === "register") {
            if (password !== confirmPassword) {
                toast.error("Passwords don't match!");
                return;
            }
            await register(username, email, password);
        } else if (view === "login") {
            await login(email, password);
        } else if (view === "resetPassword") {
            await sendResetEmail(email);
        }
    };

    return (
        <div>
            <h2 className="login-header">
                {view === 'login' && 'Login'}
                {view === 'register' && 'Register'}
                {view === 'resetPassword' && 'Reset Password'}
            </h2>

            <form onSubmit={handleSubmit}>
                {/* Форма для логина */}
                {view === "login" && (
                    <>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </>
                )}

                {/* Форма для регистрации */}
                {view === "register" && (
                    <>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} required />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </>
                )}


                {/* Поле для сброса пароля */}
                {view === "resetPassword" && (
                    <>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </>
                )}

                <button type="submit" disabled={loginLoading || registerLoading || resetLoading}>
                    {view === "login" && "Login"}
                    {view === "register" && "Register"}
                    {view === "resetPassword" && "Send Reset Email"}
                </button>
            </form>

            {/* Ссылки для переключения между формами */}
            <div className="toggle-view text-center mt-3">


                {view === 'login' && (
                    <>
                        <a href="#0" onClick={() => setView('register')}>Need an account? Register</a>
                        <br />
                        <a href="#0" onClick={() => setView('resetPassword')}>Forgot password? Reset</a>
                    </>
                )}


                {view === 'register' && (
                    <a href="#0" onClick={() => setView('login')}>Have an account? Login</a>
                )}

                {view === 'resetPassword' && (
                    <a href="#0" onClick={() => setView('login')}>Back to Login</a>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
