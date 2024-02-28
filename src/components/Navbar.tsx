import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Navbar() {
    const { logout } = useAuth();

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
                <ul className='nav-details'>
                    <li><Link to="/">Scrape</Link></li>
                    <li><Link to="instructions">Instructions</Link></li>
                    <li className='nav-details__user'>
                        <button className='button' onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;