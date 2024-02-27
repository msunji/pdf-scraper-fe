function Navbar() {
    return (
        <nav>
            <div className='nav-container'>
                <p className='nav-header'>PSE PDF Scraper</p>
                <ul className='nav-details'>
                    <li>Instructions</li>
                    <li className='nav-details__user'>
                        <p>email </p>
                        <button className='button'>Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;