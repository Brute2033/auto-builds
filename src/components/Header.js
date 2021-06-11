import axios from 'axios'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import './Header.css'

const Header = () => {
    const location = useLocation()
    const logout = () => {
        axios.get('/auth/logout')
        .then(() => 'User has been logged out')
    }
    return location.pathname !== '/' && (
        <header className='header'>
            <div className='header-related'></div>
                <div className='header-nav'>
                    <div className='header-home'>
                        <Link to='/home'><button className='header-home-button'>Home</button></Link>
                    </div>
                    {/* <Link to='/'><button>Auth</button></Link> */}
                    <div className='header-create'>
                        <Link to='/create'><button className='header-create-button'>Create</button></Link>
                    </div>
                    <div className='header-logout'>
                        <Link to='/' onClick={logout}><button className='header-logout-button'>Logout</button></Link>
                    </div>
                </div>
            
        </header>
    )
}


export default Header