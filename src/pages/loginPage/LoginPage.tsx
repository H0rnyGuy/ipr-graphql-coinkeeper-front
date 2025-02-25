import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {LOGIN_MUTATION, REGISTER_MUTATION} from "../../api/auth";
import { setCredentials } from "../../store/authentification/authSlice.ts";
import {apolloSessionsClient, apolloUsersClient} from "../../api";

const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false); // Переключение между логином и регистрацией
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [username, setUserName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION, {
        client: apolloSessionsClient,
        onCompleted: (data) => {
            if (data.session_login) {
                dispatch(setCredentials(data.session_login));
                navigate("/categories"); // Редирект после логина
            }
        },
    });

    const [register, { loading: registerLoading, error: registerError }] = useMutation(REGISTER_MUTATION, {
        client: apolloUsersClient,
        onCompleted: (data) => {
            if (data.data) {
                dispatch(setCredentials(data.data));
                navigate("/categories");
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isRegistering) {
            if (password !== confirmPassword) {
                alert("Пароли не совпадают");
                return;
            }

            console.log(                 {
                registerData: {
                    username,
                        email,
                        password,
                },
            },)
            await register({
                variables: {
                    data: {
                        username,
                        email,
                        password,
                    },
                },
            });
        } else {
            await login({
                variables: {
                    loginData: {
                        email,
                        password,
                        lifeTime: 1000000000,
                    },
                },
            });
        }
    };

    return (
        <div>
            <h1>{isRegistering ? "Регистрация" : "Вход"}</h1>
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
            {loginError && <p style={{ color: "red" }}>Ошибка входа: {loginError.message}</p>}
            {registerError && <p style={{ color: "red" }}>Ошибка регистрации: {registerError.message}</p>}
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
            </button>
        </div>
    );
};

export default LoginPage;
