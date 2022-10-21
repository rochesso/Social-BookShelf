import {FormEvent, useRef} from 'react';

const RegisterUser = () => {
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const registerHandler = (e: FormEvent) => {
        e.preventDefault();

        if (firstNameRef.current && lastNameRef.current && emailRef.current) {
            const user: User = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value
            };
            console.log(user);
        }
    };
    return <form action="" onSubmit={registerHandler}>
        <label htmlFor="firstName">First Name</label>
        <input ref={firstNameRef} id="firstName" type="text"/>

        <label htmlFor="lastName">Last Name</label>
        <input ref={lastNameRef} id="lastName" type="text"/>

        <label htmlFor="email">Email</label>
        <input ref={emailRef} id="email" type="email"/>

        <button type="submit">Submit</button>
    </form>;
};

export default RegisterUser;