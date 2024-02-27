import LoginForm from '../components/LoginForm';
import { useState } from 'react';


function Login() {
    return (
        <main className="login-container">
            <section className="login-form">
                <h1>Login</h1>
                <LoginForm />
            </section>
        </main>
    )
}

export default Login;