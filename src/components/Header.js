import axios from 'axios'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

const Header = () => {
    const location = useLocation()
    const logout = () => {
        axios.get('/auth/logout')
        .then(() => 'User has been logged out')
    }
    return location.pathname !== '/' && (
        <header>
            <Link to='/home'>Home</Link>
            <Link to='/'>Auth</Link>
            <Link to='/create'>Create</Link>
            <Link to='/' onClick={logout}>Logout</Link>
        </header>
    )
}


export default Header