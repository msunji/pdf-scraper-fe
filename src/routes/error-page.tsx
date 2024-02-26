import { useRouteError } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();
    console.error(error)

    return (
        <div>
            <h1>Whoops.</h1>
            <p>Looks like this page doesn't exist.</p>
        </div>
    )
}

export default ErrorPage;