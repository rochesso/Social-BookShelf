import {NavLink} from 'react-router-dom';

const Navbar = () => {
    return <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/register">Register</NavLink></li>
        <li><a href="http://localhost:8000/api/v1/auth/google">Google</a></li>
        <li><a href="http://localhost:8000/api/v1/user">User</a></li>
        <li><a href="http://localhost:8000/api/v1/user/logout">logout</a></li>

    </ul>;
};

export default Navbar;