function Navbar() {
    return (
        <nav>
            <ul className='nav-details'>
                <li>Instructions</li>
                <li>History</li>
                <li>
                    <p>Logged in as: </p>
                <button className='button'>Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;