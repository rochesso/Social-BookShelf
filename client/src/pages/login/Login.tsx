import {FormEvent, useRef} from 'react';
import useUsers from '../../hooks/useUsers';

const Login = () => {
    const {loginUser} = useUsers();
    const emailRef = useRef<HTMLInputElement>(null);

    const loginHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (emailRef.current) {
            const email = emailRef.current.value;
            await loginUser(email);
            
        }
    };

    return <form action="" onSubmit={loginHandler}>

        <label htmlFor="email">Email</label>
        <input ref={emailRef} id="email" type="email"/>

        <button type="submit">Submit</button>
    </form>;
};

export default Login;