import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_MUTATION } from "../../api/auth";
import { setCredentials } from "../../store/authentification/authSlice.ts";
import {apolloSessionsClient} from "../../api";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
        client: apolloSessionsClient,
        onCompleted: (data) => {
            if (data.session_login) {
                dispatch(setCredentials(data.session_login));
                navigate("/categories"); // Редирект после логина
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login({
            variables: {
                loginData: {
                    email,
                    password,
                    lifeTime: 1000000000, // Время жизни сессии
                },
            },
        });
    };

    return (
        <div>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>Войти</button>
            </form>
            {error && <p style={{ color: "red" }}>Ошибка: {error.message}</p>}
        </div>
    );
};

export default LoginPage;
