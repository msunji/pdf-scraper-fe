import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { currentUserSession, logout } = useAuth();
    console.log('nav session', currentUserSession);

    const handleLogout = async () => {
        try {
            await logout();
        } catch(error) {
            console.error(error)
        }
    }
    
    return (
        <nav>
            <div className='nav-container'>
                <p className='nav-header'>PSE PDF Scraper</p>
                <ul className='nav-details'>
                    <li>Instructions</li>
                    <li className='nav-details__user'>
                        <p>{ currentUserSession ? currentUserSession.email : 'Not Logged In'}</p>
                        <button className='button' onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;