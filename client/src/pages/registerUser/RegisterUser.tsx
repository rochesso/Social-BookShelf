import {FormEvent, useRef} from 'react';
import useUsers from '../../hooks/useUsers';

const RegisterUser = () => {
//     const {addUser} = useUsers();

//     const firstNameRef = useRef<HTMLInputElement>(null);
//     const lastNameRef = useRef<HTMLInputElement>(null);
//     const emailRef = useRef<HTMLInputElement>(null);

//     const registerHandler = async (e: FormEvent) => {
//         e.preventDefault();

//         if (firstNameRef.current && lastNameRef.current && emailRef.current) {
//             const user: User = {
//                 firstName: firstNameRef.current.value,
//                 lastName: lastNameRef.current.value,
//                 email: emailRef.current.value
//             };
//             await addUser(user);
//         }
//     };
    return <div></div>
    // <form action="" onSubmit={registerHandler}>
    //     <label htmlFor="firstName">First Name</label>
    //     <input ref={firstNameRef} id="firstName" type="text"/>

    //     <label htmlFor="lastName">Last Name</label>
    //     <input ref={lastNameRef} id="lastName" type="text"/>

    //     <label htmlFor="email">Email</label>
    //     <input ref={emailRef} id="email" type="email"/>

    //     <button type="submit">Submit</button>
    // </form>;
};

export default RegisterUser;