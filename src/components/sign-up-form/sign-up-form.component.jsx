import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwrods do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);            
            await createUserDocumentFromAuth(user, { displayName });
            
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create account, email already in use')
            } else {
                console.log('user creation encountered an error ' + error.message);
            }
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className="sign-up-container">
            <h2>Don't Have an Account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={ handleSubmit }>
                <FormInput label='Display Name' type="text" onChange={ handleChange } name="displayName" value={displayName} required />
                <FormInput label='Email' type="email" onChange={ handleChange } name="email" value={email} required />
                <FormInput label='Password' type="password" onChange={ handleChange } name="password" minLength={6} value={password} required />
                <FormInput label='Confirm Password' type="passowrd" onChange={ handleChange } name="confirmPassword" minLength={6} value={confirmPassword} required />

                <Button type="submit">Create Account</Button>
            </form>
        </div>
    );
}

export default SignUpForm;