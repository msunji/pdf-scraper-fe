import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
                <p className='nav-header'><Link to="scrape">PSE PDF Scraper</Link></p>
                <ul className='nav-details'>
                    <li><Link to="instructions">Instructions</Link></li>
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