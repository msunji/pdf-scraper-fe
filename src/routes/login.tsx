import LoginForm from '../components/LoginForm';

function Login() {
    return (
        <main className="login-container">
            <section className="login-form">
                <h1>Login to Scraper</h1>
                <LoginForm />
            </section>
        </main>
    )
}

export default Login;