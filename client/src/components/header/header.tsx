import{FormEvent, Fragment, useRef} from 'react';

import { useAppSelector } from '../../hooks/useStore';
import styles from './header.module.css';

const API_URL = process.env.REACT_APP_API_URL;

// type AppProps = {
//
// };

const Header = () => {
    const userStore = useAppSelector((state) => state.userStore)
    const user: User | null = userStore.user;

    return <Fragment>
      <h1>Welcome {user ? user.firstName : 'Guest'}!</h1>
     { user ? <a href={API_URL + '/user/logout'}>Logout</a> : <a href={API_URL + '/auth/google'}>Login</a>}
    </Fragment>;


};

export default Header;