import {useCallback} from 'react';
import {httpAddUser, httpLoginUser} from './requests';

// Can be used as following:
// import useBooks from '../../hooks/useBooks';
// const {addBook} = useBooks();

function useUsers() {
    const addUser = useCallback(
        async (user: User) => {

            const response = await httpAddUser(user);
            const success = response.ok;
            if (success) {
                console.log(response.message);
            } else {
                console.log(response.message);

            }
        },
        [httpAddUser]
    );

    const loginUser = useCallback(
        async (email: string) => {

            const response = await httpLoginUser(email);
            const success = response.ok;
            if (success) {
                sessionStorage.removeItem('user');
                sessionStorage.setItem('user', response.userId);
                console.log(sessionStorage.getItem('user'));

            } else {
                console.log(response.message);

            }
        },
        [httpLoginUser]
    );

    return {
        addUser, loginUser
    };
}

export default useUsers;