import { useRouteError, useNavigate } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <section className="error-routing-section">
            <div>
                <h1>Whoops.</h1>
                <p>Looks like this page doesn't exist.</p>
            </div>

            <button className="button" onClick={() => navigate(-1)}>Go Back</button>
        </section>
    )
}

export default ErrorPage;